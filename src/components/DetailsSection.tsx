'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function DetailsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax text movement
      gsap.to(text1Ref.current, {
        x: -200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      gsap.to(text2Ref.current, {
        x: 200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Image reveal/scale
      gsap.fromTo(imageRef.current, 
        { scale: 0.8, clipPath: 'inset(10% 10% 10% 10%)' },
        { 
          scale: 1, 
          clipPath: 'inset(0% 0% 0% 0%)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "center center",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] md:min-h-[150vh] bg-[#F5F5F5] flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden">
      {/* Background Parallax Text */}
      <div className="absolute inset-0 flex flex-col justify-between py-20 md:py-40 pointer-events-none opacity-[0.03] select-none">
        <div ref={text1Ref} className="font-syne text-[40vw] md:text-[30vw] whitespace-nowrap leading-none text-[#1A1816]">PRECISION</div>
        <div ref={text2Ref} className="font-syne text-[40vw] md:text-[30vw] whitespace-nowrap leading-none text-[#1A1816] self-end">ELEGANCE</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-screen-xl px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-3xl bg-white">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop" 
            alt="Interior Detail View" 
            fill 
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          <span className="font-manrope text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] uppercase text-[#B8860B] font-bold">Uncompromising Quality</span>
          <h2 className="font-syne text-4xl md:text-7xl text-[#1A1816] leading-[0.95] md:leading-[0.9]">Every Detail<br/>Matters.</h2>
          <div className="w-16 md:w-20 h-[2px] bg-[#B8860B]"></div>
          <p className="font-manrope text-base md:text-xl text-[#1A1816]/70 leading-relaxed max-w-md">
            From the tactile grain of hand-selected walnut to the precise junction of stone and steel, our details are where architecture becomes art.
          </p>
          <button className="w-fit px-8 md:px-10 py-4 md:py-5 border border-[#1A1816] text-[#1A1816] font-manrope uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#1A1816] hover:text-white transition-all duration-500">
            View Our Specifications
          </button>
        </div>
      </div>
    </section>
  );
}
