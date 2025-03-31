
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidLoader from './LiquidLoader';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number;
}

const LoadingScreen = ({ 
  onLoadingComplete,
  minLoadingTime = 2000
}: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    const startTime = Date.now();
    let loadIncrement: NodeJS.Timeout;
    
    // Simulate loading assets with incremental progress
    const simulateLoading = () => {
      loadIncrement = setInterval(() => {
        setProgress(prev => {
          // Slow down as we approach 100%
          const increment = Math.max(1, 10 * (1 - prev / 100));
          const nextProgress = Math.min(99, prev + increment);
          return nextProgress;
        });
      }, 100);
    };
    
    simulateLoading();
    
    // Handle real loading of page assets
    window.addEventListener('load', () => {
      clearInterval(loadIncrement);
      
      // Ensure minimum loading time for animation effect
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setProgress(100);
        
        // Small delay before hiding the loader
        setTimeout(() => {
          setIsComplete(true);
          onLoadingComplete();
        }, 500);
      }, remainingTime);
    });
    
    return () => {
      clearInterval(loadIncrement);
    };
  }, [minLoadingTime, onLoadingComplete]);
  
  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md px-6"
          >
            <div className="text-5xl font-bold mb-8 text-center">
              Vinay<span className="text-accent">Sharma</span>
            </div>
            
            <LiquidLoader progress={progress} height={180} />
            
            <div className="mt-4 text-center text-foreground/60">
              Creating immersive experiences
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
