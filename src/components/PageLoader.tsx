'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const loader = loaderRef.current;
    const bar = barRef.current;
    const logo = logoRef.current;
    if (!loader || !bar || !logo) return;

    // Quick logo reveal
    gsap.fromTo(logo,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );

    // Fast progress bar — completes in 0.8s
    gsap.to(bar, {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      transformOrigin: 'left center'
    });

    const dismiss = () => {
      const tl = gsap.timeline();
      tl.to(logo, { y: -20, opacity: 0, duration: 0.3, ease: 'power3.in' })
        .to(loader, {
          yPercent: -100,
          duration: 0.6,
          ease: 'power4.inOut',
          onComplete: () => setDone(true),
        }, '-=0.1');
    };

    // Dismiss after 1s OR on window load — whichever is first
    const timeout = setTimeout(dismiss, 1000);

    const onLoad = () => {
      clearTimeout(timeout);
      // Small delay so bar animation finishes
      setTimeout(dismiss, 200);
    };

    if (document.readyState === 'complete') {
      clearTimeout(timeout);
      setTimeout(dismiss, 300);
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => {
      window.removeEventListener('load', onLoad);
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
        <div className="w-full h-[1px] bg-white/10 overflow-hidden">
          <div ref={barRef} className="h-full bg-[#B8860B] w-full scale-x-0" style={{ transformOrigin: 'left' }} />
        </div>
      </div>
    </div>
  );
}
