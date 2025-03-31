
import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
      
      // Standard fade-in animations
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
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100',
              toggleActions: 'play none none reset'
            }
          }
        );
      });
      
      // Text reveal animations
      gsap.utils.toArray('.text-reveal').forEach((element: any) => {
        gsap.fromTo(
          element,
          {
            clipPath: 'inset(0 100% 0 0)'
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100',
              toggleActions: 'play none none reset'
            }
          }
        );
      });
      
      // Image scale animations
      gsap.utils.toArray('.image-scale').forEach((element: any) => {
        gsap.fromTo(
          element,
          { 
            scale: 1.2,
            autoAlpha: 0
          },
          { 
            scale: 1,
            autoAlpha: 1,
            duration: 1.8, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=50',
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
            y: 30
          },
          { 
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
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
          { y: 0 },
          {
            y: -80,
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
      
      // Horizontal scroll sections
      gsap.utils.toArray('.horizontal-scroll').forEach((element: any) => {
        const items = element.querySelectorAll('.scroll-item');
        if (items.length > 0) {
          const scrollDistance = items[0].offsetWidth * (items.length - 1);
          
          gsap.to(items, {
            x: `-${scrollDistance}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top center',
              end: `+=${scrollDistance + 500}`,
              pin: true,
              scrub: 1
            }
          });
        }
      });
      
      // Split text animation
      gsap.utils.toArray('.split-text').forEach((element: any) => {
        const text = element.textContent;
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement('span');
          span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          element.appendChild(span);
        }
        
        const chars = element.querySelectorAll('span');
        
        gsap.to(chars, {
          opacity: 1,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            toggleActions: 'play none none reset'
          }
        });
      });
      
      // Counter animation
      gsap.utils.toArray('.count-up').forEach((element: any) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        
        gsap.fromTo(
          element, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=150',
              toggleActions: 'play none none reset'
            }
          }
        );
      });

      // Mask reveal (like Uniqualitech)
      gsap.utils.toArray('.mask-reveal').forEach((element: any) => {
        gsap.fromTo(
          element,
          {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.5,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100',
              toggleActions: 'play none none reset'
            }
          }
        );
      });

      // Text lines reveal (similar to Uniqualitech)
      gsap.utils.toArray('.lines-reveal').forEach((element: any) => {
        const lines = element.querySelectorAll('.line');
        
        gsap.fromTo(
          lines,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100',
              toggleActions: 'play none none reset'
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
