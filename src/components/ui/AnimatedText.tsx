
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger to prevent the "ScrollTrigger is not defined" error
gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animation?: 'chars' | 'words' | 'lines';
  staggerAmount?: number;
  duration?: number;
  delay?: number;
  className?: string;
  once?: boolean;
}

const AnimatedText = ({
  text,
  as = 'p',
  animation = 'words',
  staggerAmount = 0.05,
  duration = 0.8,
  delay = 0,
  className = '',
  once = true
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const element = textRef.current;
    
    // Split text based on animation type
    let items: HTMLElement[] = [];
    let originalContent = text;
    
    element.innerHTML = ''; // Clear existing content
    
    if (animation === 'chars') {
      // Split by characters
      for (let i = 0; i < originalContent.length; i++) {
        const span = document.createElement('span');
        span.textContent = originalContent[i] === ' ' ? '\u00A0' : originalContent[i];
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        element.appendChild(span);
        items.push(span);
      }
    } else if (animation === 'words') {
      // Split by words
      const words = originalContent.split(' ');
      
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(25px)';
        element.appendChild(span);
        items.push(span);
        
        // Add space after word (except last word)
        if (index < words.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '\u00A0';
          space.style.display = 'inline-block';
          element.appendChild(space);
        }
      });
    } else if (animation === 'lines') {
      // Display text as is, but wrap in a div for animation
      const div = document.createElement('div');
      div.textContent = originalContent;
      div.style.opacity = '0';
      div.style.transform = 'translateY(30px)';
      element.appendChild(div);
      items.push(div);
    }
    
    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom-=100',
        toggleActions: once ? 'play none none none' : 'play none none reset',
      }
    });
    
    tl.to(items, {
      y: 0,
      opacity: 1,
      duration: duration,
      stagger: staggerAmount,
      ease: 'power3.out',
      delay: delay
    });
    
    // Cleanup
    return () => {
      if (tl) tl.kill();
    };
  }, [text, animation, staggerAmount, duration, delay, once]);

  // Create a component dynamically
  const DynamicComponent = as;
  
  return (
    <div ref={textRef} className={className}>
      <DynamicComponent>{text}</DynamicComponent>
    </div>
  );
};

export default AnimatedText;
