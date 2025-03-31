
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');
    
    const handleMouseEnterLink = () => setCursorVariant('hover');
    const handleMouseLeaveLink = () => setCursorVariant('default');
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Add event listeners to all links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnterLink);
      element.addEventListener('mouseleave', handleMouseLeaveLink);
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnterLink);
        element.removeEventListener('mouseleave', handleMouseLeaveLink);
      });
    };
  }, []);
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      border: '1px solid hsl(var(--primary))',
    },
    click: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(138, 75, 246, 0.4)',
      border: '1px solid hsl(var(--primary))',
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: 'rgba(138, 75, 246, 0.2)',
      border: '1px solid hsl(var(--primary))',
    },
  };

  return (
    <>
      <motion.div
        className="cursor-dot hidden md:block"
        variants={{
          default: { x: mousePosition.x - 2.5, y: mousePosition.y - 2.5 },
          click: { x: mousePosition.x - 2.5, y: mousePosition.y - 2.5 },
          hover: { x: mousePosition.x - 2.5, y: mousePosition.y - 2.5 },
        }}
        animate={cursorVariant}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
      <motion.div
        className="cursor-outline hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.3 }}
      />
    </>
  );
};

export default CustomCursor;
