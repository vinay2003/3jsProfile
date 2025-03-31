
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Code, Puzzle, Zap, Layers, Paintbrush, Database } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

interface Skill {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const skills: Skill[] = [
  {
    icon: <Code className="text-primary h-6 w-6" />,
    title: "Frontend Development",
    description: "Creating responsive and performant interfaces with modern JavaScript frameworks.",
    delay: 0
  },
  {
    icon: <Layers className="text-accent h-6 w-6" />,
    title: "3D Visualization",
    description: "Building immersive 3D experiences with Three.js and WebGL technologies.",
    delay: 0.1
  },
  {
    icon: <Zap className="text-orange-500 h-6 w-6" />,
    title: "Animation",
    description: "Crafting smooth, interactive animations with GSAP and Framer Motion.",
    delay: 0.2
  },
  {
    icon: <Paintbrush className="text-emerald-500 h-6 w-6" />,
    title: "UI/UX Design",
    description: "Designing intuitive and visually appealing user interfaces and experiences.",
    delay: 0.3
  },
  {
    icon: <Puzzle className="text-pink-500 h-6 w-6" />,
    title: "Interactive Design",
    description: "Creating engaging user experiences with microinteractions and effects.",
    delay: 0.4
  },
  {
    icon: <Database className="text-cyan-500 h-6 w-6" />,
    title: "Backend Integration",
    description: "Connecting frontend applications to robust backend services and APIs.",
    delay: 0.5
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!sectionRef.current || !skillsRef.current) return;
    
    const tlSkills = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: "top bottom-=100",
        end: "bottom top",
        toggleActions: "play none none none"
      }
    });
    
    // Animate the heading
    tlSkills.fromTo(
      sectionRef.current.querySelectorAll('.section-heading-animation > *'),
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
      }
    );
    
    return () => {
      tlSkills.kill();
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-24 lg:py-36 px-6" id="skills">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="max-w-xl mb-16 section-heading-animation">
          <SectionHeading
            title="Skills & Expertise"
            subtitle="Specialized in modern web technologies and interactive experiences"
          />
        </div>
        
        {/* Skills Grid */}
        <div 
          ref={skillsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 stagger-fade-in"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              ref={(el) => (skillItemRefs.current[index] = el)}
              className="stagger-item group bg-black/10 backdrop-blur-sm border border-white/10 p-6 lg:p-8 rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-colors duration-300"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.23, 1, 0.32, 1],
                delay: skill.delay
              }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-5 p-3 rounded-lg bg-black/20 w-fit">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {skill.title}
              </h3>
              <p className="text-foreground/70">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
