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

interface Experience {
  jobTitle: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

const educationData: Education[] = [
  {
    degree: "Bachelor of Technology (BTech) in Computer Science",
    institution: "GLA University",
    year: "2020-2024",
    description: "Specialized in front-end development, cross-browser compatibility, and responsive web design. Focused on modern web technologies, UI/UX principles, and interactive development."
  },
  {
    degree: "Certificate in Advanced Web Development",
    institution: "Tech Academy Online",
    year: "2017",
    description: "Intensive program covering advanced JavaScript, React, and modern front-end frameworks for interactive web applications."
  }
];

const experienceData: Experience[] = [
  {
    jobTitle: "Frontend Developer",
    company: "Befog AW Technologies",
    duration: "Nov 2024 – Present",
    location: "Lucknow, India (Hybrid)",
    description: "Designed and implemented user interfaces using modern frontend technologies for seamless UX. Collaborated with backend teams to integrate APIs and optimize data flow. Developed responsive and visually appealing web applications."
  },
  {
    jobTitle: "Backend Developer Intern",
    company: "Brain Quest Consultancy and Training",
    duration: "Oct 2024 – Nov 2024",
    location: "Remote (Dubai, UAE)",
    description: "Worked on API development and database management. Improved backend performance and optimized server-side logic."
  },
  {
    jobTitle: "Software Engineer Intern",
    company: "Bluestock™",
    duration: "Aug 2024 – Sep 2024",
    location: "Hybrid",
    description: "Developed scalable frontend solutions using React.js and Node.js. Implemented performance optimizations for web applications."
  },
  {
    jobTitle: "Software Developer Intern",
    company: "Hindalco Industries Limited",
    duration: "Jun 2022 – Jul 2022",
    location: "Renukut, India (Hybrid)",
    description: "Focused on frontend development using Tailwind CSS and HTML. Worked on internal applications for process automation."
  }
];

const Section = ({ title, subtitle, data, isEducation }: { title: string; subtitle: string; data: any[]; isEducation: boolean }) => {
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
    <section id={title.toLowerCase().replace(/\s/g, '-')} className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-primary/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/5 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/4"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10" ref={sectionRef}>
        <SectionHeading 
          title={title}
          subtitle={subtitle}
        />
        
        <div className="mt-12 flex flex-col items-center" ref={timelineRef}>
          <div className="w-1 bg-muted/30 h-full absolute left-1/2 transform -translate-x-1/2">
            <div className="timeline-line absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent h-0"></div>
          </div>
          
          <div className="relative z-10 w-full max-w-4xl">
            {data.map((item, index) => (
              <motion.div
                key={index}
                className={`mb-16 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="mx-auto md:mx-0 flex-shrink-0 relative">
                  <div className="timeline-point w-5 h-5 rounded-full border-4 border-primary bg-background shadow-lg transform scale-0 opacity-0"></div>
                </div>
                
                <div 
                  className={`w-full md:w-5/12 bg-background/40 backdrop-blur-sm p-6 rounded-lg border border-border shadow-lg ${
                    index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                  }`}
                >
                  <h3 className="text-xl font-bold text-primary">{isEducation ? item.degree : item.jobTitle}</h3>
                  <div className="flex flex-col md:flex-row justify-between md:items-center mt-2 mb-3">
                    <div className="text-lg">{isEducation ? item.institution : item.company}</div>
                    <div className="text-muted-foreground">{isEducation ? item.year : item.duration}</div>
                  </div>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
                
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const EducationExperience = () => (
  <>
    <Section 
      title="Education & Certifications" 
      subtitle="My academic journey that shaped my skills and expertise in interactive design"
      data={educationData} 
      isEducation={true}
    />
    <Section 
      title="Experience" 
      subtitle="A journey of crafting interactive and visually compelling digital experiences"
      data={experienceData} 
      isEducation={false}
    />
  </>
);

export default EducationExperience;
