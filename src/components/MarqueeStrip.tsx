'use client';

const items = [
  'Architectural Precision',
  '✦',
  'Quiet Luxury',
  '✦',
  'Bespoke Interiors',
  '✦',
  'Silent Opulence',
  '✦',
  'Material Curation',
  '✦',
  'Spatial Narratives',
  '✦',
];

interface MarqueeStripProps {
  direction?: 'left' | 'right';
  bg?: string;
  textColor?: string;
  accentColor?: string;
  speed?: number;
}

export default function MarqueeStrip({
  direction = 'left',
  bg = '#1A1816',
  textColor = '#F5F5F5',
  accentColor = '#B8860B',
  speed = 30,
}: MarqueeStripProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden py-5 select-none"
      style={{ background: bg }}
    >
      {/* Top & bottom hairlines */}
      <div className="absolute inset-x-0 top-0 h-[1px]" style={{ background: `${textColor}15` }} />
      <div className="absolute inset-x-0 bottom-0 h-[1px]" style={{ background: `${textColor}15` }} />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 mx-6 font-outfit text-[11px] md:text-xs uppercase tracking-[0.35em]"
            style={{ color: item === '✦' ? accentColor : textColor }}
          >
            {item}
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.33%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
