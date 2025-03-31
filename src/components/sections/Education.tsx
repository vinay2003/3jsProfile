
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedText from '@/components/ui/AnimatedText';

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

const educationData: Education[] = [
  {
    degree: "Master of Fine Arts in Digital Design",
    institution: "California Institute of Arts",
    year: "2018-2020",
    description: "Specialized in interactive 3D design and immersive digital experiences with focus on Three.js and WebGL."
  },
  {
    degree: "Bachelor of Design in Interactive Media",
    institution: "Royal College of Art & Design",
    year: "2014-2018",
    description: "Studied interaction design, user experience, and front-end development with special emphasis on creative coding."
  },
  {
    degree: "Certificate in Advanced Web Development",
    institution: "Tech Academy Online",
    year: "2017",
    description: "Intensive program covering advanced JavaScript, React, and modern front-end frameworks for interactive web applications."
  }
];

const EducationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (!timelineRef.current || !isInView) return;
    
    const line = timelineRef.current.querySelector('.timeline-line');
    const points = timelineRef.current.querySelectorAll('.timeline-point');
    
    gsap.fromTo(
      line,
      { height: '0%' },
      {
        height: '100%',
        duration: 1.5,
        ease: 'power3.inOut'
      }
    );
    
    gsap.fromTo(
      points,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.4,
        delay: 0.2,
        ease: 'back.out(1.7)'
      }
    );
  }, [isInView]);

  return (
    <section id="education" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-primary/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/5 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/4"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10" ref={sectionRef}>
        <SectionHeading 
          title="Education & Certifications" 
          subtitle="My academic journey that shaped my skills and expertise in interactive design"
        />
        
        <div className="mt-12 flex flex-col items-center" ref={timelineRef}>
          {/* Timeline line */}
          <div className="relative w-1 bg-muted/30 h-full absolute left-1/2 transform -translate-x-1/2">
            <div className="timeline-line absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent h-0"></div>
          </div>
          
          {/* Timeline content */}
          <div className="relative z-10 w-full max-w-4xl">
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                className={`mb-16 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Timeline point */}
                <div className="mx-auto md:mx-0 flex-shrink-0 relative">
                  <div className="timeline-point w-5 h-5 rounded-full border-4 border-primary bg-background shadow-lg transform scale-0 opacity-0"></div>
                </div>
                
                {/* Content */}
                <div 
                  className={`w-full md:w-5/12 bg-background/40 backdrop-blur-sm p-6 rounded-lg border border-border shadow-lg ${
                    index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                  }`}
                >
                  <h3 className="text-xl font-bold text-primary">{item.degree}</h3>
                  <div className="flex flex-col md:flex-row justify-between md:items-center mt-2 mb-3">
                    <div className="text-lg">{item.institution}</div>
                    <div className="text-muted-foreground">{item.year}</div>
                  </div>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
                
                {/* Spacer for alternate layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
