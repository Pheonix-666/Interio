import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F5] text-[#1A1816] py-20 px-6 md:px-16 border-t border-[#1A1816]/10 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full max-w-screen-2xl mx-auto">
        
        {/* Brand/Copyright Column */}
        <div className="col-span-1 md:col-span-4 flex flex-col justify-between">
          <div className="text-2xl font-syne font-bold tracking-[0.2em] mb-12 md:mb-0">
            INTERIO
          </div>
          <div className="text-[#1A1816]/40 text-xs tracking-widest mt-auto pt-8">
            © {new Date().getFullYear()} INTERIO STUDIO. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="col-span-1 md:col-span-3 md:col-start-7 flex flex-col gap-6">
          <h4 className="font-syne text-[#B8860B] uppercase tracking-wider text-sm mb-2">Portfolio</h4>
          <Link href="#" className="text-[#1A1816]/70 hover:text-[#B8860B] transition-colors text-sm uppercase tracking-widest w-fit hover:underline underline-offset-4">Private Residences</Link>
          <Link href="#" className="text-[#1A1816]/70 hover:text-[#B8860B] transition-colors text-sm uppercase tracking-widest w-fit hover:underline underline-offset-4">Hotels & Resorts</Link>
          <Link href="#" className="text-[#1A1816]/70 hover:text-[#B8860B] transition-colors text-sm uppercase tracking-widest w-fit hover:underline underline-offset-4">Commercial Spaces</Link>
        </div>

        {/* Links Column 2 */}
        <div className="col-span-1 md:col-span-3 flex flex-col gap-6">
          <h4 className="font-syne text-[#B8860B] uppercase tracking-wider text-sm mb-2">Studio</h4>
          <Link href="#" className="text-[#1A1816]/70 hover:text-[#B8860B] transition-colors text-sm uppercase tracking-widest w-fit hover:underline underline-offset-4">Process</Link>
          <Link href="#" className="text-[#1A1816]/70 hover:text-[#B8860B] transition-colors text-sm uppercase tracking-widest w-fit hover:underline underline-offset-4">Press</Link>
          <Link href="#" className="text-[#1A1816]/70 hover:text-[#B8860B] transition-colors text-sm uppercase tracking-widest w-fit hover:underline underline-offset-4">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
