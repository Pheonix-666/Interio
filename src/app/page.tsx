import Navbar from '@/components/Navbar';
import SplineHero from '@/components/SplineHero';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import Carousel360 from '@/components/Carousel360';
import Footer from '@/components/Footer';
import Image from 'next/image';

import DetailsSection from '@/components/DetailsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      
      {/* 1. Spline Hero Section (Vertical) */}
      <SplineHero />

      {/* 2. Horizontal Scroll Section (V-H-V Effect - Light Mode with Parallax Grid) */}
      <HorizontalScrollSection />

      {/* 3. Unique Details Section (New) */}
      <DetailsSection />

      {/* 4. 360-degree Project Scroller (Vertical) */}
      <Carousel360 />

      {/* 5. Footer */}
      <Footer />
    </main>
  );
}
