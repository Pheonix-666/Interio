'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'Oakhaven Estate', category: 'Private Residence', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, title: 'The Azure Retreat', category: 'Hotels & Resorts', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, title: 'Lumina Penthouse', category: 'Luxury Apartment', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, title: 'Minimalist Atelier', category: 'Commercial Space', image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1600&auto=format&fit=crop' },
  { id: 5, title: 'Heritage Villa', category: 'Restoration', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop' },
];

export default function Carousel360() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !carouselRef.current) return;

    const cards = gsap.utils.toArray('.carousel-card') as HTMLElement[];
    const numCards = cards.length;
    const angle = 360 / numCards;
    
    // Dynamic radius based on screen width
    const getRadius = () => {
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? 300 : 550;
      }
      return 500;
    };
    
    let radius = getRadius();

    // Set initial 3D positions for each card
    gsap.set(carouselRef.current, { 
      perspective: 2000, 
      transformStyle: "preserve-3d",
      rotationX: -10 // Deeper tilt for more drama
    });
    
    cards.forEach((card, i) => {
      gsap.set(card, {
        rotationY: i * angle,
        z: radius,
        transformOrigin: `50% 50% ${-radius}px`,
      });
    });

    // ScrollTrigger to rotate the entire carousel
    const ctx = gsap.context(() => {
      gsap.to(carouselRef.current, {
        rotationY: -360, // Rotate full circle
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000", // Slower rotation for better readability
          scrub: 1.5,
          pin: true,
        }
      });

      // Card hover effect enhancement
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, duration: 0.5, ease: "power2.out" });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.5, ease: "power2.out" });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F8F8F8] overflow-hidden flex items-center justify-center">
      {/* Decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-syncopate text-[20vw] text-[#1A1816] opacity-[0.03] select-none pointer-events-none uppercase font-bold">
        Works
      </div>

      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-10 w-full px-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#B8860B]"></div>
          <span className="font-outfit text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#B8860B] font-bold">Selected Works</span>
          <div className="w-12 h-[1px] bg-[#B8860B]"></div>
        </div>
        <h2 className="font-syncopate text-5xl md:text-8xl text-[#1A1816] uppercase font-bold tracking-tighter leading-none">The Collection</h2>
      </div>

      <div 
        ref={carouselRef} 
        className="relative w-[280px] h-[400px] md:w-[450px] md:h-[600px] mt-20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {projects.map((project, i) => (
          <div 
            key={project.id}
            className="carousel-card absolute top-0 left-0 w-full h-full backface-hidden cursor-pointer"
            style={{ backfaceVisibility: 'hidden' }}
            data-cursor="View"
          >
            <div className="w-full h-full relative group rounded-sm overflow-hidden border border-[#1A1816]/5 shadow-[0_30px_100px_rgba(0,0,0,0.15)] bg-white transition-all duration-700">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1816] via-transparent to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-40"></div>
              
              <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 right-8 md:right-12">
                <p className="font-outfit text-[#B8860B] text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 font-bold opacity-80">{project.category}</p>
                <h3 className="font-syncopate text-2xl md:text-4xl text-white leading-none uppercase font-bold tracking-tight">{project.title}</h3>
                
                <div className="mt-8 flex items-center gap-4 opacity-0 -translate-x-4 transition-all duration-700 delay-100 group-hover:opacity-100 group-hover:translate-x-0">
                   <div className="w-8 h-[1px] bg-white"></div>
                   <span className="font-outfit text-[9px] uppercase tracking-[0.4em] text-white">Full Case Study</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
         <span className="font-outfit text-[10px] uppercase tracking-[0.5em] text-[#1A1816]/30 font-bold">Scroll to Rotate</span>
         <div className="w-12 h-[1px] bg-[#1A1816]/10"></div>
      </div>
    </section>
  );
}
