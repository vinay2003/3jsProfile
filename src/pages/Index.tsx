
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useLocoScroll from '@/hooks/useLocoScroll';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import CustomCursor from '@/components/ui/CustomCursor';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasScrollInitialized, setHasScrollInitialized] = useState(false);
  
  // Initialize scroll animations once loading is complete
  useLocoScroll(!isLoading);
  
  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasScrollInitialized(true);
  };
  
  useEffect(() => {
    if (hasScrollInitialized) {
      // Add custom cursor to interactive elements
      document.querySelectorAll('a, button').forEach((element) => {
        element.classList.add('interactive');
      });
    }
  }, [hasScrollInitialized]);
  
  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        
        <main>
          <Hero />
          <Projects />
          <Skills />
          <Education />
          {/* Add more sections as needed */}
        </main>
        
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
