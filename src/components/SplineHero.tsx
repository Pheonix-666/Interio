'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplineHero() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      const tl = gsap.timeline();

      // Video reveal
      tl.fromTo(videoRef.current,
        { scale: 1.2, filter: "brightness(0) blur(20px)" },
        { scale: 1, filter: "brightness(0.6) blur(0px)", duration: 2.5, ease: "expo.out" }
      );

      // Text reveal
      tl.fromTo(".hero-char",
        { y: "100%", opacity: 0, rotateX: -90 },
        { 
          y: "0%", 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.5, 
          stagger: 0.1, 
          ease: "power4.out" 
        },
        "-=1.8"
      )
      .fromTo(subTextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1.2"
      );

      // Continuous floating animation
      gsap.to(".hero-overlay", {
        y: "-=20",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Throttled Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      
      const updateParallax = () => {
        const xPos = (mouseX / window.innerWidth - 0.5) * 40;
        const yPos = (mouseY / window.innerHeight - 0.5) * 40;

        gsap.to(".hero-overlay-inner", {
          x: xPos,
          y: yPos,
          duration: 1.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
        
        gsap.to(videoRef.current, {
          x: -xPos * 0.5,
          y: -yPos * 0.5,
          duration: 1.5,
          ease: "power2.out",
          overwrite: 'auto'
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };

      // Use gsap ticker for throttled updates
      gsap.ticker.add(updateParallax);

      // Scroll-based parallax
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: "20%",
        scale: 1.1
      });

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        gsap.ticker.remove(updateParallax);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-[#1A1816]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 scale-[1.1]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1280&auto=format&fit=crop"
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-[#1A1816]/20 to-[#1A1816]/60"></div>
      </div>

      {/* Dynamic Content Overlay */}
      <div className="hero-overlay relative z-30 flex flex-col items-center justify-center text-center px-6 w-full pointer-events-none">
        <div className="hero-overlay-inner backdrop-blur-xl bg-white/5 p-16 md:p-24 rounded-[4rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="overflow-hidden mb-4">
            <span className="font-outfit text-[10px] md:text-xs text-[#B8860B] tracking-[0.8em] uppercase font-bold block mb-6 opacity-80">
              Est. 2024 — London / Dubai
            </span>
          </div>
          <div className="overflow-hidden">
            <h1
              ref={heroTextRef}
              className="font-syncopate text-[14vw] md:text-[11vw] leading-[0.8] text-white tracking-tighter uppercase font-bold flex flex-wrap justify-center"
            >
              {"INTERIO".split("").map((char, i) => (
                <span key={i} className="hero-char inline-block">
                  {char}
                </span>
              ))}
            </h1>
          </div>
          <div
            ref={subTextRef}
            className="mt-12 flex flex-col items-center gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#B8860B]"></div>
              <p className="font-outfit text-[#B8860B] tracking-[0.5em] md:tracking-[0.7em] uppercase text-[10px] md:text-sm font-bold">
                The Curated Space
              </p>
              <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#B8860B]"></div>
            </div>
            <p className="font-outfit text-white/50 text-[10px] md:text-xs uppercase tracking-[0.4em] max-w-sm leading-loose">
              Architectural precision meets <br className="hidden md:block" /> the art of quiet luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute bottom-12 right-12 z-30 hidden lg:flex flex-col gap-6 text-right mix-blend-difference">
        <div className="flex flex-col gap-1">
          <span className="font-syncopate text-[8px] tracking-[0.5em] text-white/40 uppercase">Coordinates</span>
          <span className="font-outfit text-[10px] tracking-[0.2em] text-white/80 uppercase">34.0522° N, 118.2437° W</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-syncopate text-[8px] tracking-[0.5em] text-white/40 uppercase">Current Status</span>
          <span className="font-outfit text-[10px] tracking-[0.2em] text-[#B8860B] uppercase font-bold">Open for Commissions</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-12 z-20 flex items-center gap-6 select-none mix-blend-difference">
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent overflow-hidden">
            <div className="w-full h-1/2 bg-[#B8860B] animate-scroll-line"></div>
          </div>
          <span className="text-white/40 text-[9px] uppercase tracking-[0.5em] [writing-mode:vertical-lr] font-outfit font-bold">Scroll</span>
        </div>
      </div>
    </section>
  );
}
