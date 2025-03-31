
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AnimatedText from '@/components/ui/AnimatedText';
import AnimatedButton from '@/components/ui/AnimatedButton';
import ThreeScene from '@/components/three/Scene';

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero = ({
  title = "Interactive 3D Web Experiences",
  subtitle = "Combining Three.js, GSAP, and Framer Motion to create immersive digital experiences."
}: HeroProps) => {
  const heroRef = useRef<HTMLElement>(null);
  
  // Split title for animation
  const titleLines = title.split(' ').reduce((acc: string[], word, i, arr) => {
    const lastLine = acc[acc.length - 1];
    const isLastWordInLine = i > 0 && i % 3 === 0;
    
    if (isLastWordInLine) {
      acc.push(word);
    } else if (lastLine) {
      acc[acc.length - 1] = `${lastLine} ${word}`;
    } else {
      acc.push(word);
    }
    
    return acc;
  }, []);
  
  useEffect(() => {
    if (!heroRef.current) return;
    
    const tl = gsap.timeline({ delay: 0.5 });
    const heroEl = heroRef.current;
    
    // Animate the gradient background
    tl.fromTo(
      heroEl.querySelector('.hero-gradient'),
      {
        opacity: 0,
        scale: 1.2,
      },
      {
        opacity: 0.7,
        scale: 1,
        duration: 2,
        ease: 'power3.out',
      }
    );
    
    // Animate 3D scene
    tl.fromTo(
      heroEl.querySelector('.hero-scene'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
      },
      '-=1.5'
    );
    
    // Animate scroll indicator
    tl.fromTo(
      heroEl.querySelector('.scroll-indicator'),
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5'
    );
    
    return () => {
      tl.kill();
    };
  }, []);
  
  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="hero-gradient absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0"></div>
      
      {/* 3D scene background */}
      <div className="hero-scene absolute inset-0 w-full h-full opacity-0">
        <ThreeScene className="w-full h-full" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10 relative pt-20">
        <div className="max-w-4xl">
          <div className="lines-reveal mb-6">
            {titleLines.map((line, index) => (
              <div key={index} className="line overflow-hidden">
                <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight my-2">
                  {line}
                </h1>
              </div>
            ))}
          </div>
          
          <div className="overflow-hidden mb-8">
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-xl md:text-2xl text-foreground/70 max-w-xl"
            >
              {subtitle}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <AnimatedButton 
              size="lg" 
              hoverEffect="shine"
              className="px-8 font-medium"
              data-cursor-text="View Projects"
            >
              Explore Projects
            </AnimatedButton>
            
            <AnimatedButton 
              variant="outline" 
              size="lg"
              hoverEffect="slide" 
              className="px-8 font-medium"
              data-cursor-text="Contact"
            >
              Get in Touch
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <p className="text-foreground/70 mb-2 text-sm">Scroll to discover</p>
        <motion.div 
          className="w-5 h-10 border-2 border-foreground/30 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          <motion.div 
            className="w-1 h-1 bg-primary rounded-full"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: 'loop'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
