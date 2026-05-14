import Navbar from '@/components/Navbar';
import SplineHero from '@/components/SplineHero';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

// Lazy-load below-the-fold sections to reduce initial JS bundle
const StatsSection = dynamic(() => import('@/components/StatsSection'), {
  loading: () => <div className="h-64 bg-white" />,
});
const HorizontalScrollSection = dynamic(() => import('@/components/HorizontalScrollSection'), {
  loading: () => <div className="h-screen bg-[#F8F8F8]" />,
});
const MarqueeStrip = dynamic(() => import('@/components/MarqueeStrip'), {
  loading: () => <div className="h-12 bg-[#1A1816]" />,
});
const DetailsSection = dynamic(() => import('@/components/DetailsSection'), {
  loading: () => <div className="h-screen bg-[#F8F8F8]" />,
});
const Carousel360 = dynamic(() => import('@/components/Carousel360'), {
  loading: () => <div className="h-screen bg-[#F8F8F8]" />,
});
const CTASection = dynamic(() => import('@/components/CTASection'), {
  loading: () => <div className="h-screen bg-[#1A1816]" />,
});

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
