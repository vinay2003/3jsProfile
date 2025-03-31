
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start: boolean) {
  useEffect(() => {
    if (!start) return;
    
    // Function to update the ScrollTrigger when the page loads and on resize
    const updateScrollTrigger = () => {
      ScrollTrigger.refresh();
    };
    
    // Wait until fonts are loaded
    document.fonts.ready.then(() => {
      // Update ScrollTrigger
      updateScrollTrigger();
      
      // Initialize simple scroll animations
      gsap.utils.toArray('.fade-in').forEach((element: any) => {
        gsap.fromTo(
          element,
          { 
            autoAlpha: 0,
            y: 50
          },
          { 
            autoAlpha: 1,
            y: 0,
            duration: 1, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100',
              toggleActions: 'play none none reset'
            }
          }
        );
      });
      
      // Animated sections with stagger
      gsap.utils.toArray('.stagger-fade-in').forEach((element: any) => {
        const items = element.querySelectorAll('.stagger-item');
        
        gsap.fromTo(
          items,
          { 
            autoAlpha: 0,
            y: 20
          },
          { 
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100',
              toggleActions: 'play none none reset'
            }
          }
        );
      });
      
      // Parallax elements
      gsap.utils.toArray('.parallax').forEach((element: any) => {
        gsap.fromTo(
          element, 
          { 
            y: 0 
          },
          {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentNode,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });
    });
    
    // Event listener for window resize
    window.addEventListener('resize', updateScrollTrigger);
    
    return () => {
      window.removeEventListener('resize', updateScrollTrigger);
      
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [start]);
}
