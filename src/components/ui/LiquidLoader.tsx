
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LiquidLoaderProps {
  progress: number;
  color?: string;
  bgColor?: string;
  height?: number;
}

const LiquidLoader = ({
  progress,
  color = '#8B5CF6',
  bgColor = '#1a1a1a',
  height = 300
}: LiquidLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = containerRef.current?.clientWidth || window.innerWidth;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Wave properties
    const waves = {
      frontWave: {
        color: color,
        length: 80,
        amplitude: 20,
        frequency: 0.2
      },
      backWave: {
        color: color,
        length: 120,
        amplitude: 15,
        frequency: 0.3
      }
    };
    
    // Animation variables
    let animationFrame: number;
    let time = 0;
    
    // Draw wave function
    const drawWave = (waveParams: typeof waves.frontWave, fillRatio: number, alpha: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      const waveHeight = canvas.height * (1 - fillRatio);
      
      // Draw wave path
      for (let x = 0; x < canvas.width; x++) {
        const dx = x * waveParams.frequency;
        const offsetY = Math.sin(dx + time) * waveParams.amplitude;
        const y = waveHeight + offsetY;
        ctx.lineTo(x, y);
      }
      
      // Complete the path
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      
      // Fill with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `${waveParams.color}99`); // Semi-transparent at top
      gradient.addColorStop(0.8, waveParams.color); // Solid at bottom
      ctx.fillStyle = gradient;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    };
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const normalizedProgress = Math.max(0, Math.min(1, progress / 100));
      
      // Draw back wave with slight offset
      drawWave(waves.backWave, normalizedProgress + 0.02, 0.7);
      
      // Draw front wave
      drawWave(waves.frontWave, normalizedProgress, 0.9);
      
      // Update time
      time += 0.05;
      
      // Continue animation loop
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Update text value with animation
    if (textRef.current) {
      gsap.to(textRef.current, {
        textContent: Math.round(progress).toString(),
        duration: 0.5,
        snap: { textContent: 1 },
        ease: 'power2.out',
      });
    }
    
    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [progress, color, bgColor, height]);
  
  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg"
      style={{ height }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="text-5xl font-bold flex items-baseline">
          <span ref={textRef}>0</span>
          <span className="ml-1">%</span>
        </div>
        <div className="mt-2 text-xl font-light uppercase tracking-widest">Loading</div>
      </div>
    </div>
  );
};

export default LiquidLoader;
