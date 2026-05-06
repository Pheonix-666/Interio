'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplineHero() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      const tl = gsap.timeline();

      tl.fromTo(heroTextRef.current,
        { y: 100, opacity: 0, skewY: 10, letterSpacing: "1em" },
        { y: 0, opacity: 1, skewY: 0, letterSpacing: "-0.05em", duration: 1.5, ease: "power4.out", delay: 0.5 }
      )
        .fromTo(subTextRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=1"
        );

      // Continuous floating animation
      gsap.to(".hero-overlay", {
        y: "+=15",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Mouse Parallax for the content overlay
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(".hero-overlay-inner", {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1A1816]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/80 via-transparent to-[#1A1816]/30"></div>
      </div>

      {/* Dynamic Content Overlay */}
      <div className="hero-overlay relative z-30 flex flex-col items-center justify-center text-center px-6 w-full pointer-events-none">
        <div className="hero-overlay-inner backdrop-blur-md bg-white/10 p-12 md:p-20 rounded-full border border-white/20 shadow-2xl overflow-hidden">
          <div className="overflow-hidden">
            <h1
              ref={heroTextRef}
              className="font-syncopate text-[12vw] md:text-[10vw] leading-[0.85] text-white tracking-tighter uppercase"
            >
              INTERIO
            </h1>
          </div>
          <div
            ref={subTextRef}
            className="mt-8 md:mt-10 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#B8860B]"></span>
              <p className="font-outfit text-[#B8860B] tracking-[0.4em] md:tracking-[0.6em] uppercase text-[10px] md:text-sm font-bold">
                The Curated Space
              </p>
              <span className="w-12 h-[1px] bg-[#B8860B]"></span>
            </div>
            <p className="font-outfit text-white/70 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-xs leading-relaxed">
              Where architectural precision meets quiet luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute bottom-10 right-10 z-30 hidden md:flex flex-col gap-4 text-right">
        <span className="font-syncopate text-[8px] tracking-[0.4em] text-white/50 uppercase">Coordinates: 34.0522° N, 118.2437° W</span>
        <span className="font-syncopate text-[8px] tracking-[0.4em] text-white/50 uppercase">Est. 2024</span>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-50 select-none">
        <span className="text-white text-[10px] uppercase tracking-[0.4em] mb-3 font-outfit font-bold">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}
