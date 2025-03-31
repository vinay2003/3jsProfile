
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ThreeScene from '@/components/three/Scene';
import Navbar from '@/components/ui/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import useLocoScroll from '@/hooks/useLocoScroll';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  useLocoScroll(!isLoading);
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 10);
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
      // Timeline animation for the hero section
      const heroTimeline = gsap.timeline();
      
      heroTimeline
        .from('.hero-title span', {
          opacity: 0, 
          y: 100, 
          duration: 1.5,
          stagger: 0.1,
          ease: 'power4.out'
        })
        .from('.hero-subtitle', {
          opacity: 0, 
          y: 20, 
          duration: 1,
          ease: 'power3.out'
        }, '-=1')
        .from('.hero-button', {
          opacity: 0, 
          y: 20, 
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.7');
    }
  }, [isLoading]);
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <motion.div 
          className="text-4xl font-bold mb-8 text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          3D<span className="text-accent">Lab</span>
        </motion.div>
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>
        <motion.p 
          className="text-foreground/70 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {loadingProgress}% loaded
        </motion.p>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <ThreeScene className="w-full h-full" />
        </div>
        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-3xl">
            <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {Array.from("Interactive 3D").map((char, index) => (
                <span key={index} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
              <br />
              {Array.from("Web Experiences").map((char, index) => (
                <span key={index} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-foreground/70 mb-8 max-w-xl">
              Combining Three.js, GSAP, and Framer Motion to create immersive digital experiences.
            </p>
            <motion.button 
              className="hero-button bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-medium hover:bg-primary/90 interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Explore Projects
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
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
      
      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4">Cutting-edge Technologies</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Leveraging the power of modern web technologies to create memorable interactive experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-fade-in">
            {[
              { 
                title: "Three.js", 
                description: "Create stunning 3D graphics and animations that run in the browser." 
              },
              { 
                title: "GSAP", 
                description: "Professional-grade animation library for the most fluid, precise interactions." 
              },
              { 
                title: "Framer Motion", 
                description: "Production-ready declarative animations for React applications." 
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-background p-8 rounded-lg border border-border stagger-item"
              >
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                  <div className="h-6 w-6 bg-primary rounded-md animate-spin-slow" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Preview */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore some of our interactive 3D web experiences that push the boundaries of what's possible on the web.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 stagger-fade-in">
            {[
              {
                title: "Cosmic Explorer",
                description: "An interactive journey through the solar system with detailed 3D models and animations."
              },
              {
                title: "Architectural Visualization",
                description: "Navigate through a photorealistic 3D architectural visualization of modern buildings."
              }
            ].map((project, index) => (
              <motion.div 
                key={index} 
                className="relative group overflow-hidden h-72 rounded-lg stagger-item interactive"
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 group-hover:opacity-80 opacity-60 transition-opacity duration-300" />
                <div className="h-full w-full bg-muted/10" />
                <div className="absolute bottom-0 left-0 p-6 z-10">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/80 max-w-md">{project.description}</p>
                </div>
                <motion.div 
                  className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to build something amazing?</h2>
            <p className="text-foreground/70 text-xl mb-8 max-w-2xl mx-auto">
              Let's collaborate and create immersive web experiences that engage and inspire your audience.
            </p>
            <motion.button 
              className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-medium hover:bg-primary/90 interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Get in Touch
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold tracking-tighter text-primary">
                3D<span className="text-accent">Lab</span>
              </div>
              <p className="text-foreground/60 mt-1">
                &copy; {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            <div className="flex space-x-6">
              {['Twitter', 'GitHub', 'Instagram'].map((item, index) => (
                <motion.a 
                  key={index} 
                  href="#" 
                  className="text-foreground/60 hover:text-primary transition-colors interactive"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
