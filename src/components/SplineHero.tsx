'use client';

import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import gsap from 'gsap';
import Image from 'next/image';

export default function SplineHero() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      const tl = gsap.timeline();
      
      tl.fromTo(heroTextRef.current, 
        { y: 100, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, ease: "power4.out", delay: 0.5 }
      )
      .fromTo(subTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1"
      );

      // Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(containerRef.current, {
          rotateY: xPos / 4,
          rotateX: -yPos / 4,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#F5F5F5]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-10 scale-105"
        >
          <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=7b03681404e138a49c69345229615a1f280a9696&profile_id=165" type="video/mp4" />
        </video>
      </div>

      {/* High-Quality Interior Image (3D Fallback) */}
      <div className="absolute inset-0 z-10 opacity-60">
        <Image 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Interior Hero" 
          fill 
          priority
          className="object-cover"
        />
      </div>

      {/* Refined Hero Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 w-full pointer-events-none">
        <div className="overflow-hidden">
          <h1 
            ref={heroTextRef}
            className="font-syne text-[18vw] md:text-[10vw] leading-[0.85] text-[#1A1816] tracking-tighter uppercase"
          >
            INTERIO
          </h1>
        </div>
        <p 
          ref={subTextRef}
          className="font-manrope text-[#B8860B] tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm mt-8 md:mt-6 font-bold flex items-center gap-3 md:gap-4"
        >
          <span className="w-6 md:w-10 h-[1px] bg-[#B8860B]"></span>
          The Curated Space
          <span className="w-6 md:w-10 h-[1px] bg-[#B8860B]"></span>
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-30 select-none">
        <span className="text-[#1A1816] text-[10px] uppercase tracking-[0.4em] mb-3 font-manrope font-bold">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#1A1816] to-transparent"></div>
      </div>
    </section>
  );
}
