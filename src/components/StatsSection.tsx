'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 12, suffix: '+', label: 'Years of Practice', sub: 'Since 2012' },
  { value: 87, suffix: '', label: 'Projects Delivered', sub: 'Across 9 countries' },
  { value: 45, suffix: '', label: 'Master Artisans', sub: 'In our network' },
  { value: 100, suffix: '%', label: 'Client Satisfaction', sub: 'Zero compromises' },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal section
      gsap.fromTo(
        '.stat-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Counter animation
      stats.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
          },
          onUpdate: () => {
            if (el) el.textContent = Math.round(obj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-24 md:py-36 px-6 md:px-16 relative overflow-hidden"
    >
      {/* Subtle diagonal pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            #1A1816 0,
            #1A1816 1px,
            transparent 0,
            transparent 50%
          )`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <div className="w-10 h-[1px] bg-[#B8860B]" />
          <span className="font-outfit text-[10px] uppercase tracking-[0.5em] text-[#B8860B] font-bold">
            By the Numbers
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card flex flex-col gap-3 group"
            >
              {/* Number */}
              <div className="font-syncopate text-5xl md:text-7xl text-[#1A1816] leading-none">
                <span ref={el => { numRefs.current[i] = el; }}>0</span>
                <span className="text-[#B8860B]">{stat.suffix}</span>
              </div>
              {/* Divider */}
              <div className="w-8 h-[2px] bg-[#B8860B] transition-all duration-500 group-hover:w-16" />
              {/* Label */}
              <p className="font-syncopate text-xs md:text-sm text-[#1A1816] uppercase tracking-wider leading-tight">
                {stat.label}
              </p>
              <p className="font-outfit text-[10px] md:text-xs text-[#1A1816]/40 uppercase tracking-widest">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
