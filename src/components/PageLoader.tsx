'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;
    const bar = barRef.current;
    const logo = logoRef.current;
    if (!loader || !bar || !logo) return;

    let isLoaded = false;
    const obj = { val: 0 };

    // Animate counter gradually up to 90%
    const counterAnim = gsap.to(obj, {
      val: 90,
      duration: 4,
      ease: 'power1.out',
      onUpdate: () => setCount(Math.round(obj.val)),
    });

    // Progress bar up to 90%
    const barAnim = gsap.to(bar, { 
      scaleX: 0.9, 
      duration: 4, 
      ease: 'power1.out', 
      transformOrigin: 'left center' 
    });

    // Logo reveal
    gsap.fromTo(logo,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    );

    const finishLoading = () => {
      if (isLoaded) return;
      isLoaded = true;
      
      counterAnim.kill();
      barAnim.kill();
      
      const tl = gsap.timeline();
      
      // Fast finish to 100%
      tl.to(obj, {
        val: 100,
        duration: 0.4,
        onUpdate: () => setCount(Math.round(obj.val))
      })
      .to(bar, { scaleX: 1, duration: 0.4 }, "-=0.4")
      .to(logo, { y: -30, opacity: 0, duration: 0.6, ease: 'power3.in', delay: 0.1 })
      .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => setDone(true),
      });
    };

    // Wait for window load or max 6 seconds
    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading);
    }
    
    const timeout = setTimeout(finishLoading, 6000);

    return () => {
      window.removeEventListener('load', finishLoading);
      clearTimeout(timeout);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] bg-[#1A1816] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Horizontal dividers */}
      <div className="absolute inset-x-0 top-1/3 h-[1px] bg-white/5" />
      <div className="absolute inset-x-0 bottom-1/3 h-[1px] bg-white/5" />

      {/* Logo */}
      <div ref={logoRef} className="relative flex flex-col items-center gap-4">
        <span
          className="font-syncopate text-[14vw] md:text-[10vw] text-white tracking-[0.2em] uppercase leading-none select-none"
        >
          INTERIO
        </span>
        <div className="flex items-center gap-3">
          <span className="w-10 h-[1px] bg-[#B8860B]" />
          <span className="font-outfit text-[#B8860B] text-[10px] uppercase tracking-[0.5em]">Luxury Interior Studio</span>
          <span className="w-10 h-[1px] bg-[#B8860B]" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-16 left-12 right-12">
        <div className="flex justify-between mb-3">
          <span className="font-outfit text-[10px] uppercase tracking-[0.3em] text-white/30">Loading</span>
          <span className="font-syncopate text-[10px] text-white/30">{count}%</span>
        </div>
        <div className="w-full h-[1px] bg-white/10 overflow-hidden">
          <div ref={barRef} className="h-full bg-[#B8860B] w-full" style={{ transformOrigin: 'left' }} />
        </div>
      </div>
    </div>
  );
}
