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
  const image2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax text movement
      gsap.to(text1Ref.current, {
        x: -300,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      gsap.to(text2Ref.current, {
        x: 300,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Image reveal/scale
      gsap.fromTo(imageRef.current, 
        { scale: 0.9, clipPath: 'inset(15% 15% 15% 15%)' },
        { 
          scale: 1, 
          clipPath: 'inset(0% 0% 0% 0%)',
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          }
        }
      );

      // Image 2 reveal/scale
      gsap.fromTo(image2Ref.current, 
        { scale: 0.9, clipPath: 'inset(15% 15% 15% 15%)' },
        { 
          scale: 1, 
          clipPath: 'inset(0% 0% 0% 0%)',
          scrollTrigger: {
            trigger: image2Ref.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[150vh] md:min-h-[200vh] bg-[#F8F8F8] flex flex-col items-center justify-center py-32 md:py-48 overflow-hidden">
      {/* Background Parallax Text */}
      <div className="absolute inset-0 flex flex-col justify-between py-32 md:py-64 pointer-events-none opacity-[0.04] select-none">
        <div ref={text1Ref} className="font-syncopate text-[35vw] md:text-[30vw] whitespace-nowrap leading-none text-[#1A1816] font-bold">PRECISION</div>
        <div ref={text2Ref} className="font-syncopate text-[35vw] md:text-[30vw] whitespace-nowrap leading-none text-[#1A1816] self-end font-bold">ELEGANCE</div>
      </div>

      {/* Main Content - Section 1 */}
      <div className="relative z-10 w-full max-w-screen-2xl px-12 md:px-32 grid grid-cols-1 lg:grid-cols-2 gap-24 md:gap-32 items-center mb-48 md:mb-80">
        <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-white group">
          <Image 
            src="/img2.jpg" 
            alt="Interior Detail View" 
            fill 
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover transition-transform duration-[4s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#1A1816]/5 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"></div>
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          <div className="flex items-center gap-6">
            <div className="w-16 h-[1px] bg-[#B8860B]"></div>
            <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">Uncompromising Quality</span>
          </div>
          <h2 className="font-syncopate text-5xl md:text-8xl text-[#1A1816] leading-[0.8] md:leading-[0.75] uppercase font-bold tracking-tighter">
            Every Detail<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1816] to-[#B8860B]">Matters.</span>
          </h2>
          <p className="font-outfit text-lg md:text-2xl text-[#1A1816]/60 leading-relaxed max-w-lg border-l-2 border-[#B8860B]/20 pl-10">
            From the tactile grain of hand-selected walnut to the precise junction of stone and steel, our details are where architecture becomes art.
          </p>
          <button 
            data-cursor="Specs"
            className="w-fit px-12 py-6 border border-[#1A1816]/10 text-[#1A1816] font-outfit uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold hover:bg-[#1A1816] hover:text-white transition-all duration-700 ease-expo"
          >
            View Our Specifications
          </button>
        </div>
      </div>

      {/* Main Content - Section 2 (Materiality) */}
      <div className="relative z-10 w-full max-w-screen-2xl px-12 md:px-32 grid grid-cols-1 lg:grid-cols-2 gap-24 md:gap-32 items-center">
        <div className="flex flex-col gap-10 md:gap-14 order-2 lg:order-1">
          <div className="flex items-center gap-6">
            <div className="w-16 h-[1px] bg-[#B8860B]"></div>
            <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">The Materiality</span>
          </div>
          <h2 className="font-syncopate text-5xl md:text-8xl text-[#1A1816] leading-[0.8] md:leading-[0.75] uppercase font-bold tracking-tighter">
            Curation of<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A1816] to-[#B8860B]">Senses.</span>
          </h2>
          <p className="font-outfit text-lg md:text-2xl text-[#1A1816]/60 leading-relaxed max-w-lg border-l-2 border-[#B8860B]/20 pl-10">
            We believe that materials should be felt, not just seen. Our palette is a dialogue between the raw and the refined, the cold and the warm.
          </p>
          
          <div className="grid grid-cols-2 gap-8 md:gap-12 mt-4">
            <div className="flex flex-col gap-3 group">
              <span className="font-syncopate text-xl text-[#1A1816] uppercase tracking-wider group-hover:text-[#B8860B] transition-colors">Stone</span>
              <div className="w-8 h-[1px] bg-[#B8860B] transition-all duration-500 group-hover:w-16"></div>
              <p className="font-outfit text-[11px] md:text-xs text-[#1A1816]/50 leading-relaxed tracking-widest uppercase">Honed Arabescato marble sourced from Carrara.</p>
            </div>
            <div className="flex flex-col gap-3 group">
              <span className="font-syncopate text-xl text-[#1A1816] uppercase tracking-wider group-hover:text-[#B8860B] transition-colors">Metal</span>
              <div className="w-8 h-[1px] bg-[#B8860B] transition-all duration-500 group-hover:w-16"></div>
              <p className="font-outfit text-[11px] md:text-xs text-[#1A1816]/50 leading-relaxed tracking-widest uppercase">Hand-patinated solid bronze accents.</p>
            </div>
            <div className="flex flex-col gap-3 group">
              <span className="font-syncopate text-xl text-[#1A1816] uppercase tracking-wider group-hover:text-[#B8860B] transition-colors">Timber</span>
              <div className="w-8 h-[1px] bg-[#B8860B] transition-all duration-500 group-hover:w-16"></div>
              <p className="font-outfit text-[11px] md:text-xs text-[#1A1816]/50 leading-relaxed tracking-widest uppercase">FSC-certified smoked European oak.</p>
            </div>
            <div className="flex flex-col gap-3 group">
              <span className="font-syncopate text-xl text-[#1A1816] uppercase tracking-wider group-hover:text-[#B8860B] transition-colors">Fabric</span>
              <div className="w-8 h-[1px] bg-[#B8860B] transition-all duration-500 group-hover:w-16"></div>
              <p className="font-outfit text-[11px] md:text-xs text-[#1A1816]/50 leading-relaxed tracking-widest uppercase">Bespoke Italian linens and silk blends.</p>
            </div>
          </div>
        </div>

        <div ref={image2Ref} className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.15)] bg-white order-1 lg:order-2 group">
          <Image 
            src="/luxury_material_palette_1778055122403.png" 
            alt="Material Palette" 
            fill 
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover transition-transform duration-[4s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#1A1816]/5 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"></div>
        </div>
      </div>
    </section>
  );
}
