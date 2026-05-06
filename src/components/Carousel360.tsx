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
        return window.innerWidth < 768 ? 250 : 450;
      }
      return 400;
    };
    
    let radius = getRadius();

    // Set initial 3D positions for each card
    gsap.set(carouselRef.current, { 
      perspective: 1200, 
      transformStyle: "preserve-3d",
      rotationX: -5 // Slight tilt for better 3D depth
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
          end: "+=4000", // Increased distance to slow down the rotation
          scrub: 1,
          pin: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#F5F5F5] overflow-hidden flex items-center justify-center">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10 w-full px-6">
        <h2 className="font-syncopate text-4xl md:text-6xl text-[#1A1816] mb-4">Selected Works</h2>
        <p className="font-outfit text-[#B8860B] tracking-[0.3em] uppercase text-xs md:text-sm font-semibold">
          Scroll to Rotate Portfolio
        </p>
      </div>

      <div 
        ref={carouselRef} 
        className="relative w-[250px] h-[350px] md:w-[400px] md:h-[500px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {projects.map((project, i) => (
          <div 
            key={project.id}
            className="carousel-card absolute top-0 left-0 w-full h-full backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-full relative group rounded-2xl overflow-hidden border border-[#1A1816]/10 shadow-2xl bg-white">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-8 right-6 md:right-8 transition-transform duration-500 group-hover:-translate-y-2">
                <p className="font-outfit text-[#B8860B] text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 md:mb-3 font-semibold">{project.category}</p>
                <h3 className="font-syncopate text-xl md:text-3xl text-[#1A1816] leading-tight">{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
