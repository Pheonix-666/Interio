import Navbar from '@/components/Navbar';
import SplineHero from '@/components/SplineHero';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import Carousel360 from '@/components/Carousel360';
import Footer from '@/components/Footer';
import Image from 'next/image';

import DetailsSection from '@/components/DetailsSection';
import StatsSection from '@/components/StatsSection';
import MarqueeStrip from '@/components/MarqueeStrip';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      
      {/* 1. Spline Hero Section (Vertical) */}
      <SplineHero />

      {/* 2. Brand Stats (New) */}
      <StatsSection />

      {/* 3. Horizontal Scroll Section (V-H-V Effect - Light Mode with Parallax Grid) */}
      <HorizontalScrollSection />

      {/* 4. Scrolling Marquee (New) */}
      <MarqueeStrip />

      {/* 5. Unique Details Section (New) */}
      <DetailsSection />

      {/* 6. 360-degree Project Scroller (Vertical) */}
      <Carousel360 />

      {/* 7. Final CTA (New) */}
      <CTASection />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
