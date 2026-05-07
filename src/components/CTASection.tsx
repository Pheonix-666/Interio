'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line grows on scroll-in
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      // Title word-by-word reveal
      gsap.fromTo(
        '.cta-word',
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      // Subtext fade
      gsap.fromTo(
        '.cta-sub',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        }
      );
    }, sectionRef);

    // Magnetic button
    const btn = btnRef.current;
    if (btn) {
      const handleMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
      };
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      };
      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      return () => {
        ctx.revert();
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
      };
    }

    return () => ctx.revert();
  }, []);

  const words = ['Begin', 'Your', 'Story.'];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#1A1816] flex flex-col items-center justify-center overflow-hidden px-6 md:px-16 py-32"
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url(/noise.svg)' }}
      />

      {/* Corner decorations */}
      <div className="absolute top-12 left-12 w-12 h-12 border-l border-t border-[#B8860B]/40" />
      <div className="absolute top-12 right-12 w-12 h-12 border-r border-t border-[#B8860B]/40" />
      <div className="absolute bottom-12 left-12 w-12 h-12 border-l border-b border-[#B8860B]/40" />
      <div className="absolute bottom-12 right-12 w-12 h-12 border-r border-b border-[#B8860B]/40" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto gap-10 md:gap-14">
        {/* Eyebrow line */}
        <div
          ref={lineRef}
          className="h-[1px] bg-[#B8860B] w-24"
          style={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
        />

        {/* Title */}
        <h2 className="font-syncopate text-[14vw] md:text-[9vw] text-white leading-[0.85] tracking-tighter overflow-hidden">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0">
              <span className="cta-word inline-block">{w}</span>
            </span>
          ))}
        </h2>

        {/* Subtext */}
        <p className="cta-sub font-outfit text-white/50 text-base md:text-xl max-w-lg leading-relaxed">
          Every great space begins with a conversation. Tell us your vision — we will bring it to life with uncompromising precision.
        </p>

        {/* Magnetic CTA Button */}
        <div className="cta-sub mt-4">
          <button
            ref={btnRef}
            data-cursor="Let's Talk"
            className="relative group px-12 py-6 border border-[#B8860B] text-[#B8860B] font-outfit text-xs uppercase tracking-[0.4em] overflow-hidden transition-colors duration-500 hover:text-[#1A1816]"
          >
            <span className="absolute inset-0 bg-[#B8860B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="relative z-10">Begin Your Project</span>
          </button>
        </div>

        {/* Contact line */}
        <div className="cta-sub flex items-center gap-6 mt-2">
          <span className="w-6 h-[1px] bg-white/20" />
          <a
            href="mailto:hello@interio.studio"
            className="font-outfit text-white/30 text-xs uppercase tracking-[0.4em] hover:text-[#B8860B] transition-colors duration-300"
          >
            hello@interio.studio
          </a>
          <span className="w-6 h-[1px] bg-white/20" />
        </div>
      </div>
    </section>
  );
}
