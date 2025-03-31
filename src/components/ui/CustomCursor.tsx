
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const lastUpdateTime = useRef(Date.now());
  const lastPosition = useRef({ x: 0, y: 0 });
  const speed = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const dt = (currentTime - lastUpdateTime.current) / 1000;
      lastUpdateTime.current = currentTime;
      
      // Calculate cursor speed
      if (dt > 0) {
        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        speed.current = Math.min(distance / dt / 1000, 1);
      }
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');
    
    const handleMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Check for data attributes
      const textContent = target.getAttribute('data-cursor-text');
      if (textContent) {
        setCursorText(textContent);
        setCursorVariant('text');
      } else {
        setCursorVariant('hover');
      }
      
      // Check for different interactive elements and apply appropriate styles
      if (target.classList.contains('interactive-magnetic')) {
        const magneticStrength = 0.3;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Apply magnetic effect when hovering over the element
        const onElementMouseMove = (e: MouseEvent) => {
          const dx = e.clientX - centerX;
          const dy = e.clientY - centerY;
          
          gsap.to(target, {
            x: dx * magneticStrength,
            y: dy * magneticStrength,
            duration: 0.3,
          });
        };
        
        const onElementMouseLeave = () => {
          gsap.to(target, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        };
        
        target.addEventListener('mousemove', onElementMouseMove);
        target.addEventListener('mouseleave', onElementMouseLeave);
        
        return () => {
          target.removeEventListener('mousemove', onElementMouseMove);
          target.removeEventListener('mouseleave', onElementMouseLeave);
        };
      }
    };
    
    const handleMouseLeaveLink = () => {
      setCursorVariant('default');
      setCursorText('');
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Get all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive, .interactive-magnetic, [data-cursor-text]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnterInteractive);
      element.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    // Apply stretching effect on cursor speed
    const updateCursorStretch = () => {
      if (cursorOutlineRef.current) {
        const stretchFactor = 1 + speed.current * 2;
        const rotation = Math.atan2(
          mousePosition.y - lastPosition.current.y,
          mousePosition.x - lastPosition.current.x
        ) * (180 / Math.PI);
        
        gsap.to(cursorOutlineRef.current, {
          scaleX: 1 + (stretchFactor - 1) * 0.5,
          scaleY: 1 + (stretchFactor - 1) * 0.2,
          rotation: rotation,
          duration: 0.1,
          ease: "power1.out"
        });
      }
      
      requestAnimationFrame(updateCursorStretch);
    };
    
    updateCursorStretch();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnterInteractive);
        element.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, [mousePosition]);
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      mixBlendMode: 'difference' as 'difference',
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(138, 75, 246, 0.4)',
      mixBlendMode: 'difference' as 'difference',
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: 'rgba(138, 75, 246, 0.2)',
      mixBlendMode: 'difference' as 'difference',
    },
    text: {
      x: mousePosition.x - 48,
      y: mousePosition.y - 48,
      height: 96,
      width: 96,
      backgroundColor: 'rgba(138, 75, 246, 0.7)',
      mixBlendMode: 'normal' as 'normal',
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <>
      <motion.div
        ref={cursorDotRef}
        className="cursor-dot hidden md:block"
        variants={{
          default: { x: mousePosition.x - 2.5, y: mousePosition.y - 2.5 },
          click: { x: mousePosition.x - 2.5, y: mousePosition.y - 2.5, scale: 0.8 },
          hover: { x: mousePosition.x - 2.5, y: mousePosition.y - 2.5, scale: 1.2 },
          text: { x: mousePosition.x - 2.5, y: mousePosition.y - 2.5, opacity: 0 }
        }}
        animate={cursorVariant}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
      <motion.div
        ref={cursorOutlineRef}
        className="cursor-outline hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      >
        {cursorVariant === 'text' && (
          <motion.div
            ref={cursorTextRef}
            className="h-full w-full flex items-center justify-center text-xs font-medium text-white"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
