
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Immersive Portfolio",
    description: "Interactive 3D portfolio website with custom animations and WebGL effects.",
    image: "https://images.unsplash.com/photo-1618609255910-caa84b3ad797?q=80&w=1000&auto=format&fit=crop",
    category: "Web Development",
    link: "#"
  },
  {
    id: 2,
    title: "3D Product Viewer",
    description: "E-commerce product configurator with real-time 3D rendering and customization.",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1000&auto=format&fit=crop",
    category: "3D Visualization",
    link: "#"
  },
  {
    id: 3,
    title: "Interactive Data Dashboard",
    description: "Real-time data visualization dashboard with animated charts and filters.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
    category: "Data Visualization",
    link: "#"
  },
  {
    id: 4,
    title: "Animated Landing Page",
    description: "High-conversion landing page with scroll-triggered animations and interactions.",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1000&auto=format&fit=crop",
    category: "Web Development",
    link: "#"
  }
];

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe project items
    projectRefs.current.forEach((project) => {
      if (project) observer.observe(project);
    });
    
    return () => {
      projectRefs.current.forEach((project) => {
        if (project) observer.unobserve(project);
      });
    };
  }, []);
  
  return (
    <section className="py-24 lg:py-36 px-6" id="projects">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="max-w-xl mx-auto text-center mb-16 md:mb-24">
          <SectionHeading
            title="Featured Projects"
            subtitle="Explore our recent work"
            alignment="center"
          />
        </div>
        
        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="project-card group relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 h-[400px]"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.23, 1, 0.32, 1],
                delay: index * 0.1
              }}
              whileHover={{ y: -5 }}
            >
              {/* Project Image */}
              <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Project Content */}
              <div className="absolute inset-0 w-full h-full z-20 p-6 md:p-8 flex flex-col justify-end">
                <span className="text-sm font-medium text-primary mb-2">{project.category}</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                <p className="text-foreground/70 mb-6 max-w-md">{project.description}</p>
                
                <motion.a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-white font-medium interactive"
                  whileHover={{ x: 5 }}
                  data-cursor-text="View Project"
                >
                  <span>View project</span>
                  <ArrowUpRight size={18} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
