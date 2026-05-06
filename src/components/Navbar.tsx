'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Studio', href: '#studio' },
    { name: 'Inquiry', href: '#inquiry' },
  ];

  return (
    <>
      <header className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-16 py-6 md:py-8 flex justify-between items-center",
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-[#1A1816]/5 py-4 md:py-6" : "bg-transparent"
      )}>
        <Link href="/" className="text-xl md:text-3xl font-syncopate font-bold tracking-[0.2em] text-[#1A1816]">
          INTERIO
        </Link>
        
        <nav className="hidden md:flex gap-12">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="text-[#1A1816] text-xs uppercase tracking-[0.3em] hover:text-[#B8860B] transition-colors relative group font-bold">
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#B8860B] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="open menu" 
          className="md:hidden text-[#1A1816] hover:text-[#B8860B] transition-colors p-2"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl font-syncopate font-bold tracking-[0.2em] text-[#1A1816]">INTERIO</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#1A1816]"
              >
                <X size={32} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  key={item.name}
                >
                  <Link 
                    href={item.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-syncopate font-bold text-[#1A1816] uppercase tracking-tighter hover:text-[#B8860B] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-[#1A1816]/10">
              <p className="font-outfit text-xs uppercase tracking-[0.2em] text-[#1A1816]/40 mb-4">Contact Us</p>
              <p className="font-syncopate text-lg text-[#1A1816]">hello@interio.studio</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
