
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import SectionHeading from '@/components/ui/SectionHeading';
import { GraduationCap, Calendar, MapPin, Building } from 'lucide-react';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
}

const educationItems: EducationItem[] = [
  {
    id: 1,
    degree: "Master of Science in Computer Science",
    institution: "Stanford University",
    location: "California, USA",
    duration: "2018 - 2020",
    description: "Specialized in Computer Graphics and Interactive Techniques with focus on WebGL and real-time rendering technologies."
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "MIT",
    location: "Massachusetts, USA",
    duration: "2014 - 2018",
    description: "Focused on Human-Computer Interaction and Frontend Engineering. Participated in multiple research projects involving interactive web technologies."
  },
  {
    id: 3,
    degree: "Certificate in UI/UX Design",
    institution: "Design Academy",
    location: "New York, USA",
    duration: "2017",
    description: "Intensive program covering user experience design principles, interaction design, and visual design for digital products."
  }
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;
    
    const tlEducation = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top bottom-=100",
        end: "bottom top",
        toggleActions: "play none none none"
      }
    });
    
    // Animate the timeline line
    tlEducation.fromTo(
      ".timeline-line",
      {
        scaleY: 0,
        transformOrigin: "top"
      },
      {
        scaleY: 1,
        duration: 1.5,
        ease: "power3.inOut"
      }
    );
    
    return () => {
      tlEducation.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-24 lg:py-36 px-6" id="education">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="max-w-xl mb-16 md:mb-20 section-heading-animation">
          <SectionHeading
            title="Education & Certifications"
            subtitle="Academic background and professional development"
            icon={<GraduationCap className="w-8 h-8 text-primary" />}
          />
        </div>
        
        {/* Education Timeline */}
        <div 
          ref={timelineRef}
          className="relative pl-8 md:pl-0 max-w-4xl mx-auto"
        >
          {/* Vertical Timeline Line */}
          <div className="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/80 to-accent/80" />
          
          {/* Timeline Items */}
          {educationItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className={`relative mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-[50%]' : 'md:pl-12 md:ml-[50%]'
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              {/* Timeline Node */}
              <div 
                className={`absolute top-0 left-[-41px] md:left-auto ${
                  index % 2 === 0 ? 'md:right-[-41px]' : 'md:left-[-41px]'
                } w-[18px] h-[18px] rounded-full bg-primary z-10 border-4 border-background`}
              />
              
              {/* Card */}
              <div className="bg-black/10 backdrop-blur-sm border border-white/10 p-6 lg:p-8 rounded-xl hover:border-primary/20 transition-colors duration-300">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary">
                  {item.degree}
                </h3>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground/70">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4" />
                    <span>{item.institution}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                </div>
                
                <p className="text-foreground/70">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
