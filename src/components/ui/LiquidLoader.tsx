
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LiquidLoaderProps {
  progress: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

const LiquidLoader = ({
  progress,
  height = 200,
  primaryColor = '#8b5cf6',
  secondaryColor = '#3b82f6'
}: LiquidLoaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number>(0);
  const progressTextRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const width = canvas.width = canvas.clientWidth;
    const waveHeight = height * 0.8;
    
    // Wave parameters
    let frequency = 0.005;
    let amplitude = 20;
    let phase = 0;
    
    // Create linear gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, primaryColor);
    gradient.addColorStop(1, secondaryColor);
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, waveHeight);
      
      // Calculate wave fill based on progress
      const fillHeight = waveHeight * (1 - progress / 100);
      
      // Draw wave
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, waveHeight);
      
      // Draw the wave path
      for (let x = 0; x < width; x++) {
        const y = fillHeight + amplitude * Math.sin(frequency * x + phase);
        ctx.lineTo(x, y);
      }
      
      // Complete the path
      ctx.lineTo(width, waveHeight);
      ctx.lineTo(0, waveHeight);
      ctx.closePath();
      ctx.fill();
      
      // Update phase for next frame
      phase += 0.05;
      
      // Request next frame
      requestIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Update progress text with animation
    if (progressTextRef.current) {
      gsap.to(progressTextRef.current, {
        textContent: Math.round(progress).toString(),
        duration: 0.3,
        snap: { textContent: 1 },
        stagger: 0.05,
      });
    }
    
    // Cleanup
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [progress, height, primaryColor, secondaryColor]);
  
  return (
    <div className="relative w-full">
      {/* Wave animation container */}
      <div 
        className="w-full overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10" 
        style={{ height: `${height}px` }}
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          style={{ height: `${height}px` }}
        />
      </div>
      
      {/* Progress percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-baseline">
            <div ref={progressTextRef} className="text-5xl font-bold text-white">0</div>
            <div className="text-xl text-white/80">%</div>
          </div>
          <div className="text-sm text-white/60 mt-1">Loading</div>
        </div>
      </div>
    </div>
  );
};

export default LiquidLoader;
