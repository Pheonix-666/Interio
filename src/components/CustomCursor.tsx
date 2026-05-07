'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const [label, setLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Trail points for the line effect
  const trailPointsRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const isStuckRef = useRef(false);
  const stuckPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const canvas = trailCanvasRef.current;
    if (!cursor || !dot || !canvas) return;

    const ctx2d = canvas.getContext('2d');
    if (!ctx2d) return;

    // Size the canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Detect touch devices — hide cursor entirely
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      gsap.set([cursor, dot, canvas], { display: 'none' });
      return;
    }

    let mouseX = -100, mouseY = -100;
    let rafId: number;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseRef.current = { x: mouseX, y: mouseY };

      if (!isVisible) setIsVisible(true);

      // Add trail point
      trailPointsRef.current.push({ x: mouseX, y: mouseY, age: 0 });
      if (trailPointsRef.current.length > 50) {
        trailPointsRef.current.shift();
      }

      // Immediate dot follows mouse exactly
      gsap.set(dot, { x: mouseX, y: mouseY });

      if (isStuckRef.current) {
        // Magnetic: cursor ring sticks to element center
        gsap.to(cursor, {
          x: stuckPosRef.current.x,
          y: stuckPosRef.current.y,
          duration: 0.25,
          ease: 'power3.out'
        });
      } else {
        // Normal: smooth ring follows
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.65,
          ease: 'power3.out'
        });
      }
    };

    // Trail rendering loop
    const drawTrail = () => {
      if (!ctx2d) return;
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);

      const points = trailPointsRef.current;

      // Age out points
      for (let i = points.length - 1; i >= 0; i--) {
        points[i].age += 1;
        if (points[i].age > 30) {
          points.splice(i, 1);
        }
      }

      if (points.length < 2) {
        rafId = requestAnimationFrame(drawTrail);
        return;
      }

      ctx2d.beginPath();
      ctx2d.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].y + points[i - 1].y) / 2;
        ctx2d.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
      }

      const lastPoint = points[points.length - 1];
      ctx2d.lineTo(lastPoint.x, lastPoint.y);

      ctx2d.strokeStyle = 'rgba(184, 134, 11, 0.12)';
      ctx2d.lineWidth = 1.5;
      ctx2d.lineCap = 'round';
      ctx2d.stroke();

      rafId = requestAnimationFrame(drawTrail);
    };
    rafId = requestAnimationFrame(drawTrail);

    const onEnterLink = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const cursorText = target.getAttribute('data-cursor') || '';
      setLabel(cursorText);

      // Magnetic: stick to element center
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      isStuckRef.current = true;
      stuckPosRef.current = { x: centerX, y: centerY };

      gsap.to(cursor, {
        width: Math.max(rect.width + 24, 60),
        height: Math.max(rect.height + 24, 60),
        borderRadius: rect.width > rect.height * 2 ? '8px' : '50%',
        backgroundColor: 'rgba(184, 134, 11, 0.06)',
        borderColor: 'rgba(184, 134, 11, 0.3)',
        x: centerX,
        y: centerY,
        duration: 0.45,
        ease: 'power3.out'
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    };

    const onLeaveLink = () => {
      setLabel('');
      isStuckRef.current = false;

      gsap.to(cursor, {
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        borderColor: 'rgba(184, 134, 11, 0.6)',
        duration: 0.45,
        ease: 'power3.out'
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.75, duration: 0.15, ease: 'power2.out' });
      gsap.to(dot, { scale: 2.5, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onMouseEnterWindow = () => setIsVisible(true);
    const onMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    document.addEventListener('mouseleave', onMouseLeaveWindow);

    // Observe dynamic content for interactables
    const refreshInteractables = () => {
      const els = document.querySelectorAll('a, button, [data-cursor], input, textarea, .magnetic');
      els.forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
      return els;
    };

    let interactables = refreshInteractables();

    const observer = new MutationObserver(() => {
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
      interactables = refreshInteractables();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(rafId);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[9996] pointer-events-none"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s' }}
      />

      {/* Ring cursor — magnetic, shape-shifting */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
          border: '1px solid rgba(184, 134, 11, 0.6)',
          borderRadius: '50%',
        }}
      >
        {label && (
          <span className="font-syncopate text-[7px] font-bold uppercase tracking-[0.25em] text-[#B8860B] whitespace-nowrap select-none">
            {label}
          </span>
        )}
      </div>

      {/* Precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-[#B8860B]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
          boxShadow: '0 0 12px rgba(184, 134, 11, 0.4)',
        }}
      />
    </>
  );
}
