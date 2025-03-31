
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from '@/components/ui/button';

interface AnimatedButtonProps extends ButtonProps {
  hoverEffect?: 'shine' | 'slide' | 'expand';
  children: React.ReactNode;
}

const AnimatedButton = ({ 
  children, 
  hoverEffect = 'shine', 
  className = '',
  ...props 
}: AnimatedButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative overflow-hidden inline-block">
      <motion.div
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative z-10"
      >
        <Button 
          className={`relative overflow-hidden ${className}`}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
      
      {hoverEffect === 'shine' && (
        <motion.div 
          className="absolute inset-0 bg-white/20 -skew-x-12 transform-gpu"
          initial={{ left: '-100%' }}
          animate={isHovering ? { left: '200%' } : { left: '-100%' }}
          transition={isHovering ? { 
            duration: 0.8, 
            ease: 'easeOut',
          } : { duration: 0 }}
        />
      )}
      
      {hoverEffect === 'slide' && (
        <motion.div 
          className="absolute inset-0 bg-primary/90"
          initial={{ left: '-100%' }}
          animate={isHovering ? { left: '0%' } : { left: '-100%' }}
          transition={{ 
            duration: 0.4, 
            ease: 'easeInOut',
          }}
        />
      )}
      
      {hoverEffect === 'expand' && (
        <motion.div 
          className="absolute rounded-full bg-primary/90"
          initial={{ width: 0, height: 0, x: '-50%', y: '-50%', top: '50%', left: '50%' }}
          animate={isHovering ? { 
            width: '300%', 
            height: '300%',
          } : { 
            width: 0, 
            height: 0 
          }}
          transition={{ 
            duration: 0.6, 
            ease: 'easeOut',
          }}
        />
      )}
    </div>
  );
};

export default AnimatedButton;
