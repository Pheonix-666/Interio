'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    // Wait for images to load or a short delay to ensure correct scrollWidth
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    const ctx = gsap.context(() => {
      // Main Horizontal Scroll
      gsap.to(scrollWrapperRef.current, {
        x: () => -(scrollWrapperRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWrapperRef.current!.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // Row Parallax Effects
      const rows = gsap.utils.toArray('.parallax-row');
      rows.forEach((row: any, i: number) => {
        const isMobile = window.innerWidth < 768;
        const baseSpeed = isMobile ? 150 : 400;
        const speed = i % 2 === 0 ? baseSpeed : -baseSpeed;

        gsap.to(row, {
          x: speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollWrapperRef.current!.scrollWidth}`,
            scrub: 1,
          }
        });
      });

    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F0F0F0] overflow-hidden">
      <div
        ref={scrollWrapperRef}
        className="flex h-full items-center w-max px-8 md:px-32 gap-[20vw] md:gap-[15vw]"
      >
        {/* Intro Panel - Simplified */}
        <div className="w-[85vw] md:w-[45vw] flex flex-col justify-center shrink-0">
          <span className="font-outfit text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#B8860B] font-bold mb-6">Philosophy 01</span>
          <h2 className="font-syncopate text-5xl md:text-8xl text-[#1A1816] mb-8 leading-[0.85] tracking-tighter">THE ART OF<br />RESTRAINT</h2>
          <p className="font-outfit text-base md:text-xl text-[#1A1816]/60 max-w-sm md:max-w-md leading-relaxed border-l-2 border-[#B8860B] pl-6 md:pl-8">
            True luxury isn't about excess. It's about the perfect balance of space, light, and silence.
          </p>
        </div>

        {/* Dynamic Parallax Gallery - Removed fixed huge width */}
        <div className="w-fit h-screen flex flex-col justify-center gap-12 md:gap-16 shrink-0 py-12 pr-[15vw]">
          {/* Row 1 - Faster Parallax */}
          <div className="parallax-row flex gap-8 md:gap-20 items-end h-[25vh] md:h-[30vh] -translate-x-20">
            <div className="relative w-[35vw] md:w-[15vw] h-[70%] overflow-hidden rounded-sm bg-white shadow-2xl shrink-0 translate-y-10">
              <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" alt="Gallery 1" fill sizes="(max-width: 768px) 35vw, 15vw" className="object-cover" />
            </div>
            <div className="relative w-[85vw] md:w-[45vw] h-full overflow-hidden rounded-sm bg-white shadow-2xl shrink-0">
              <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" alt="Gallery 2" fill sizes="(max-width: 768px) 85vw, 45vw" className="object-cover" />
            </div>
            <div className="relative w-[50vw] md:w-[25vw] h-[80%] overflow-hidden rounded-sm bg-white shadow-2xl shrink-0 -translate-y-8">
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" alt="Gallery 3" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </div>
          </div>

          {/* Row 2 - Reversed Fast Parallax */}
          <div className="parallax-row flex gap-8 md:gap-20 items-center h-[35vh] md:h-[45vh] translate-x-20">
            <div className="relative w-[70vw] md:w-[30vw] h-full overflow-hidden rounded-sm bg-white shadow-2xl shrink-0 -translate-y-12">
              <Image src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop" alt="Gallery 4" fill sizes="(max-width: 768px) 70vw, 30vw" className="object-cover" />
            </div>
            <div className="relative w-[95vw] md:w-[50vw] h-[85%] overflow-hidden rounded-sm bg-white shadow-2xl shrink-0">
              <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop" alt="Gallery 5" fill sizes="(max-width: 768px) 95vw, 50vw" className="object-cover" />
            </div>
            <div className="relative w-[40vw] md:w-[20vw] h-[60%] overflow-hidden rounded-sm bg-white shadow-2xl flex items-center justify-center p-6 bg-[#1A1816] shrink-0 translate-y-16">
              <h3 className="font-syncopate text-sm md:text-2xl text-[#F5F5F5] text-center uppercase tracking-widest leading-tight">Essence<br />of Light</h3>
            </div>
          </div>

          {/* Row 3 - Moderate Parallax */}
          <div className="parallax-row flex gap-8 md:gap-20 items-start h-[25vh] md:h-[30vh] -translate-x-40">
            <div className="relative w-[60vw] md:w-[25vw] h-full overflow-hidden rounded-sm bg-white shadow-2xl shrink-0 translate-y-4">
              <Image src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1200&auto=format&fit=crop" alt="Gallery 6" fill sizes="(max-width: 768px) 60vw, 25vw" className="object-cover" />
            </div>
            <div className="relative w-[40vw] md:w-[15vw] h-[75%] overflow-hidden rounded-sm bg-white shadow-2xl shrink-0 -translate-y-10">
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" alt="Gallery 7" fill sizes="(max-width: 768px) 40vw, 15vw" className="object-cover" />
            </div>
            <div className="relative w-[80vw] md:w-[40vw] h-[90%] overflow-hidden rounded-sm bg-white shadow-2xl shrink-0 translate-y-6">
              <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" alt="Gallery 8" fill sizes="(max-width: 768px) 80vw, 40vw" className="object-cover" />
            </div>
          </div>
        </div>

        {/* Panel 3: The Process */}
        <div className="w-[85vw] md:w-[60vw] h-screen flex items-center shrink-0">
          <div className="relative w-full h-[60vh] md:h-[70vh] flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-full md:w-1/2 h-full overflow-hidden rounded-sm bg-white shadow-3xl">
              <Image 
                src="/img2.jpg" 
                alt="Architectural Process" 
                fill 
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-[#1A1816]/10 mix-blend-multiply"></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
              <span className="font-outfit text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#B8860B] font-bold">Process 02</span>
              <h2 className="font-syncopate text-4xl md:text-6xl text-[#1A1816] leading-none">Vision to<br />Reality.</h2>
              <p className="font-outfit text-base md:text-lg text-[#1A1816]/60 leading-relaxed">
                Every project begins with a single line. We navigate the complexities of form and function to distill your aspirations into a cohesive spatial narrative.
              </p>
              <div className="flex gap-12 mt-4">
                <div>
                  <div className="font-syncopate text-2xl md:text-4xl text-[#1A1816]">120+</div>
                  <div className="font-outfit text-[10px] uppercase tracking-widest text-[#B8860B]">Sketches</div>
                </div>
                <div>
                  <div className="font-syncopate text-2xl md:text-4xl text-[#1A1816]">45</div>
                  <div className="font-outfit text-[10px] uppercase tracking-widest text-[#B8860B]">Artisans</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4: The Masterpiece */}
        <div className="w-[100vw] h-screen flex items-center justify-center shrink-0 px-8 md:px-20">
          <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-sm group">
            <Image 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury Masterpiece" 
              fill 
              className="object-cover transition-transform duration-[3s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/60 to-transparent"></div>
            <div className="absolute bottom-12 md:bottom-20 left-8 md:left-20 max-w-2xl">
              <span className="font-outfit text-[10px] md:text-xs tracking-[0.5em] uppercase text-[#F5F5F5] font-bold mb-4 block">The Outcome</span>
              <h2 className="font-syncopate text-5xl md:text-9xl text-[#F5F5F5] leading-[0.85] mb-8">SILENT<br />LUXURY.</h2>
              <button className="px-10 py-5 bg-[#F5F5F5] text-[#1A1816] font-outfit uppercase tracking-widest text-xs hover:bg-[#B8860B] hover:text-white transition-all duration-500">
                Explore the Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
