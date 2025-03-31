
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AdvancedCursorProps {
  color?: string;
  size?: number;
  mixBlendMode?: boolean;
  innerScale?: number;
  outerScale?: number;
  outerAlpha?: number;
}

const AdvancedCursor = ({
  color = 'hsl(var(--primary))', 
  size = 30,
  mixBlendMode = false,
  innerScale = 0.4,
  outerScale = 1,
  outerAlpha = 0.5
}: AdvancedCursorProps) => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  
  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    
    if (!dot || !outline) return;
    
    // Initial setup
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(outline, { xPercent: -50, yPercent: -50 });
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out'
      });
      
      gsap.to(outline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out'
      });
    };
    
    // Mouse interaction handlers
    const handleMouseEnter = () => {
      gsap.to(dot, {
        scale: innerScale * 2.5,
        opacity: 0.8,
        duration: 0.3,
      });
      gsap.to(outline, {
        scale: outerScale * 1.3,
        opacity: outerAlpha * 0.6,
        duration: 0.3,
      });
      setIsInteracting(true);
    };
    
    const handleMouseLeave = () => {
      gsap.to(dot, {
        scale: innerScale,
        opacity: 1,
        duration: 0.3,
      });
      gsap.to(outline, {
        scale: outerScale,
        opacity: outerAlpha,
        duration: 0.3,
      });
      setIsInteracting(false);
    };
    
    const handleMouseDown = () => {
      gsap.to(dot, {
        scale: innerScale * 0.7,
        duration: 0.2,
      });
      gsap.to(outline, {
        scale: outerScale * 0.7,
        duration: 0.3,
      });
    };
    
    const handleMouseUp = () => {
      if (isInteracting) {
        gsap.to(dot, {
          scale: innerScale * 2.5,
          duration: 0.2,
        });
        gsap.to(outline, {
          scale: outerScale * 1.3,
          duration: 0.3,
        });
      } else {
        gsap.to(dot, {
          scale: innerScale,
          duration: 0.2,
        });
        gsap.to(outline, {
          scale: outerScale,
          duration: 0.3,
        });
      }
    };
    
    // Add listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .interactive, [role="button"], input, select, textarea'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isInteracting, innerScale, outerScale, outerAlpha]);
  
  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }
  
  return (
    <>
      <div 
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: size * innerScale,
          height: size * innerScale,
          backgroundColor: color,
          borderRadius: '50%',
          mixBlendMode: mixBlendMode ? 'difference' : 'normal',
        }}
      />
      <div 
        ref={outlineRef}
        className="cursor-outline fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          opacity: outerAlpha,
        }}
      />
    </>
  );
};

export default AdvancedCursor;
