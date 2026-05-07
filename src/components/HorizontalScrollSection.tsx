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
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // Row Parallax Effects
      const rows = gsap.utils.toArray('.parallax-row');
      rows.forEach((row: any, i: number) => {
        const isMobile = window.innerWidth < 768;
        const baseSpeed = isMobile ? 120 : 350;
        const speed = i % 2 === 0 ? baseSpeed : -baseSpeed;

        gsap.to(row, {
          x: speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollWrapperRef.current!.scrollWidth}`,
            scrub: 2,
          }
        });
      });

      // Image reveal within the horizontal scroll
      gsap.utils.toArray('.reveal-img').forEach((img: any) => {
        gsap.fromTo(img, 
          { clipPath: 'inset(10% 10% 10% 10%)', scale: 1.2 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "left center+=200",
              containerAnimation: gsap.to(scrollWrapperRef.current, { x: () => -(scrollWrapperRef.current!.scrollWidth - window.innerWidth), ease: "none" }), // This is complex, better use direct triggers
              // Simplified: just use scrub with the main trigger
            }
          }
        );
      });

    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F8F8F8] overflow-hidden">
      {/* Background Subtle Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <span className="font-syncopate text-[60vw] text-[#1A1816] whitespace-nowrap">COLLECTION</span>
      </div>

      <div
        ref={scrollWrapperRef}
        className="flex h-full items-center w-max px-16 md:px-48 gap-[25vw] md:gap-[20vw]"
      >
        {/* Intro Panel */}
        <div className="w-[85vw] md:w-[40vw] flex flex-col justify-center shrink-0">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-10 h-[1px] bg-[#B8860B]"></span>
            <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">Philosophy 01</span>
          </div>
          <h2 className="font-syncopate text-5xl md:text-9xl text-[#1A1816] mb-12 leading-[0.8] tracking-tighter uppercase font-bold">
            The Art of<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1816] to-[#B8860B]">Restraint.</span>
          </h2>
          <p className="font-outfit text-base md:text-xl text-[#1A1816]/50 max-w-sm md:max-w-md leading-relaxed pl-12 relative">
            <span className="absolute left-0 top-0 text-[#B8860B] font-syncopate text-4xl">“</span>
            True luxury isn't about excess. It's about the perfect balance of space, light, and silence.
          </p>
        </div>

        {/* Dynamic Parallax Gallery */}
        <div className="w-fit h-screen flex flex-col justify-center gap-16 md:gap-24 shrink-0 py-16 pr-[20vw]">
          {/* Row 1 */}
          <div className="parallax-row flex gap-12 md:gap-32 items-end h-[30vh] md:h-[35vh] -translate-x-32">
            <div className="relative w-[40vw] md:w-[18vw] h-[80%] overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] shrink-0 translate-y-12">
              <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop" alt="Gallery 1" fill sizes="(max-width: 768px) 40vw, 18vw" className="object-cover" />
            </div>
            <div className="relative w-[90vw] md:w-[55vw] h-full overflow-hidden rounded-sm bg-white shadow-[0_30px_70px_rgba(0,0,0,0.15)] shrink-0">
              <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" alt="Gallery 2" fill sizes="(max-width: 768px) 90vw, 55vw" className="object-cover" />
            </div>
            <div className="relative w-[60vw] md:w-[30vw] h-[90%] overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] shrink-0 -translate-y-12">
              <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" alt="Gallery 3" fill sizes="(max-width: 768px) 60vw, 30vw" className="object-cover" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="parallax-row flex gap-12 md:gap-32 items-center h-[40vh] md:h-[50vh] translate-x-32">
            <div className="relative w-[75vw] md:w-[35vw] h-full overflow-hidden rounded-sm bg-white shadow-[0_40px_80px_rgba(0,0,0,0.15)] shrink-0 -translate-y-16">
              <Image src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1200&auto=format&fit=crop" alt="Gallery 4" fill sizes="(max-width: 768px) 75vw, 35vw" className="object-cover" />
            </div>
            <div className="relative w-[100vw] md:w-[60vw] h-[85%] overflow-hidden rounded-sm bg-white shadow-[0_30px_60px_rgba(0,0,0,0.1)] shrink-0">
              <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop" alt="Gallery 5" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
            </div>
            <div className="relative w-[50vw] md:w-[25vw] h-[70%] overflow-hidden rounded-sm bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-center p-12 bg-[#1A1816] shrink-0 translate-y-20">
              <h3 className="font-syncopate text-lg md:text-3xl text-white text-center uppercase tracking-widest leading-none">Essence<br /><span className="text-[#B8860B]">of Light</span></h3>
            </div>
          </div>
        </div>

        {/* Panel 3: The Process */}
        <div className="w-[85vw] md:w-[65vw] h-screen flex items-center shrink-0">
          <div className="relative w-full h-[65vh] md:h-[75vh] flex flex-col md:flex-row gap-16 items-center">
            <div className="relative w-full md:w-1/2 h-full overflow-hidden rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
              <Image 
                src="/img2.jpg" 
                alt="Architectural Process" 
                fill 
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816]/40 to-transparent"></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-8 md:gap-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#B8860B]"></span>
                <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">Process 02</span>
              </div>
              <h2 className="font-syncopate text-4xl md:text-7xl text-[#1A1816] leading-none uppercase font-bold">Vision to<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1816] to-[#B8860B]">Reality.</span></h2>
              <p className="font-outfit text-base md:text-xl text-[#1A1816]/60 leading-relaxed max-w-md">
                Every project begins with a single line. We navigate the complexities of form and function to distill your aspirations into a cohesive spatial narrative.
              </p>
              <div className="flex gap-16 mt-6">
                <div>
                  <div className="font-syncopate text-3xl md:text-5xl text-[#1A1816] mb-2">120+</div>
                  <div className="font-outfit text-[10px] uppercase tracking-[0.4em] text-[#B8860B] font-bold">Sketches</div>
                </div>
                <div>
                  <div className="font-syncopate text-3xl md:text-5xl text-[#1A1816] mb-2">45</div>
                  <div className="font-outfit text-[10px] uppercase tracking-[0.4em] text-[#B8860B] font-bold">Artisans</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4: Final Reveal */}
        <div className="w-[100vw] h-screen flex items-center justify-center shrink-0 px-12 md:px-32">
          <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden rounded-sm group shadow-[0_50px_150px_rgba(0,0,0,0.3)]">
            <Image 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop" 
              alt="Luxury Masterpiece" 
              fill 
              className="object-cover transition-transform duration-[5s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-[#1A1816]/20 to-transparent"></div>
            <div className="absolute bottom-16 md:bottom-32 left-12 md:left-32 max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-[#B8860B]"></span>
                <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#F5F5F5] font-bold">The Outcome</span>
              </div>
              <h2 className="font-syncopate text-6xl md:text-[10vw] text-[#F5F5F5] leading-[0.8] mb-12 uppercase font-bold tracking-tighter">SILENT<br /><span className="text-[#B8860B]">LUXURY.</span></h2>
              <button 
                data-cursor="Discover"
                className="group relative px-12 py-6 overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-[#B8860B] transition-transform duration-700 ease-expo -translate-x-full group-hover:translate-x-0" />
                <span className="relative z-10 text-white font-outfit uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold transition-colors duration-500">
                  Explore the Portfolio
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
