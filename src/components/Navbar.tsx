'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll detection + progress bar
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Studio', href: '#studio' },
    { name: 'Inquiry', href: '#inquiry' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 z-[9995] h-[2px] bg-[#B8860B] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 md:px-16 flex justify-between items-center',
          isScrolled
            ? 'py-4 md:py-5 bg-white/85 backdrop-blur-2xl border-b border-[#1A1816]/6 shadow-[0_1px_0_rgba(26,24,22,0.05)]'
            : 'py-6 md:py-9 bg-transparent'
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-syncopate font-bold tracking-[0.22em] text-[#1A1816] relative group"
        >
          INTERIO
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B8860B] transition-all duration-500 group-hover:w-full" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-16 items-center">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[#1A1816] text-[10px] uppercase tracking-[0.4em] hover:text-[#B8860B] transition-colors duration-500 relative group font-bold"
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B8860B] transition-all duration-700 ease-expo group-hover:w-full" />
            </Link>
          ))}
          <a
            href="mailto:hello@interio.studio"
            data-cursor="Write"
            className="group relative ml-4 px-10 py-4 overflow-hidden border border-[#1A1816]/10"
          >
            <div className="absolute inset-0 bg-[#1A1816] transition-transform duration-700 ease-expo -translate-y-full group-hover:translate-y-0" />
            <span className="relative z-10 text-[#1A1816] group-hover:text-white text-[10px] uppercase tracking-[0.4em] transition-colors duration-500 font-bold">
              Contact
            </span>
          </a>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          className="md:hidden text-[#1A1816] p-2 transition-colors hover:text-[#B8860B]"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </header>

      {/* ── Mobile fullscreen overlay ─────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#1A1816] flex flex-col p-8 overflow-hidden"
          >
            {/* Grain */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url(/noise.svg)' }} />

            {/* Header row */}
            <div className="relative flex justify-between items-center mb-16">
              <span className="font-syncopate font-bold tracking-[0.22em] text-white text-xl">INTERIO</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white/70 hover:text-white transition-colors">
                <X size={28} strokeWidth={1.2} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="relative flex flex-col gap-2">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="border-b border-white/10 py-5"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-syncopate text-5xl font-bold text-white hover:text-[#B8860B] transition-colors duration-300 uppercase tracking-tight block"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative mt-auto"
            >
              <p className="font-outfit text-[10px] uppercase tracking-[0.4em] text-white/30 mb-3">Contact</p>
              <a href="mailto:hello@interio.studio" className="font-outfit text-white/70 text-lg hover:text-[#B8860B] transition-colors">
                hello@interio.studio
              </a>
              <div className="mt-6 flex gap-4">
                {['Instagram', 'Pinterest', 'Houzz'].map((s) => (
                  <a key={s} href="#" className="font-outfit text-[10px] uppercase tracking-widest text-white/30 hover:text-[#B8860B] transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
