
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = ''
}: SectionHeadingProps) => {
  const headingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (headingRef.current) {
      const title = headingRef.current.querySelector('.heading-title');
      const subtitle = headingRef.current.querySelector('.heading-subtitle');
      const line = headingRef.current.querySelector('.heading-line');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reset'
        }
      });
      
      tl.fromTo(
        title,
        { 
          y: 60, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        }
      );
      
      if (line) {
        tl.fromTo(
          line,
          { 
            scaleX: 0 
          },
          {
            scaleX: 1,
            duration: 0.6,
            ease: 'power3.inOut'
          },
          '-=0.4'
        );
      }
      
      if (subtitle) {
        tl.fromTo(
          subtitle,
          { 
            y: 30, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out'
          },
          '-=0.6'
        );
      }
    }
  }, []);
  
  const alignClass = {
    'left': 'text-left',
    'center': 'text-center',
    'right': 'text-right'
  }[align];
  
  return (
    <div ref={headingRef} className={`mb-16 ${alignClass} ${className}`}>
      <h2 className="heading-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        {title}
      </h2>
      
      <div 
        className={`heading-line h-1 bg-primary w-24 mb-6 rounded-full transform-gpu origin-left ${align === 'center' ? 'mx-auto' : ''} ${align === 'right' ? 'ml-auto' : ''}`}>
      </div>
      
      {subtitle && (
        <p className="heading-subtitle text-foreground/70 max-w-2xl text-lg md:text-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
