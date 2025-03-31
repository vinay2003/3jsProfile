
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ThreeScene from '@/components/three/Scene';
import Navbar from '@/components/ui/Navbar';
import CustomCursor from '@/components/ui/CustomCursor';
import useLocoScroll from '@/hooks/useLocoScroll';
import { ArrowRight, Code, Users, Globe, Star, Briefcase, Mail } from 'lucide-react';

// Project data
const projects = [
  {
    title: "Cosmic Explorer",
    description: "Interactive 3D journey through the solar system with detailed models and animations.",
    category: "3D Visualization",
    tags: ["Three.js", "React", "WebGL"],
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3"
  },
  {
    title: "Architectural Portfolio",
    description: "Navigate through photorealistic 3D architectural visualizations of modern buildings.",
    category: "3D Modeling",
    tags: ["Three.js", "GSAP", "Blender"],
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3"
  },
  {
    title: "Data Visualization",
    description: "Interactive data visualization platform using 3D charts and immersive UX.",
    category: "Data Viz",
    tags: ["D3.js", "React", "Three.js"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3"
  },
  {
    title: "VR Product Showcase",
    description: "Virtual reality product showcase for interactive shopping experiences.",
    category: "VR Development",
    tags: ["Three.js", "WebXR", "React"],
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3"
  }
];

// Skills data
const skills = [
  { 
    category: "3D & Animation",
    items: ["Three.js", "WebGL", "GSAP", "Framer Motion", "Blender", "Cinema 4D"]
  },
  { 
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "GraphQL"]
  },
  { 
    category: "Backend", 
    items: ["Node.js", "Express", "MongoDB", "Firebase", "AWS", "REST APIs"] 
  },
  { 
    category: "Other",
    items: ["UI/UX Design", "Responsive Design", "Performance Optimization", "SEO", "Git", "Figma"]
  }
];

// Testimonial data
const testimonials = [
  {
    text: "Working with this developer was an incredible experience. The 3D visualizations created for our project exceeded our expectations and significantly improved user engagement.",
    author: "Alex Johnson",
    role: "Creative Director",
    company: "DigitalCraft Studios"
  },
  {
    text: "The interactive portfolio website developed for our architecture firm has completely transformed how we present our projects. Clients love the immersive experience!",
    author: "Sarah Williams",
    role: "Principal Architect",
    company: "ModernSpace Architects"
  },
  {
    text: "Exceptional technical skills combined with creative vision. Delivered our product visualization tool on time and under budget with stunning visual quality.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "InnovateTech"
  }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: scrollRef,
    offset: ["start start", "end end"] 
  });
  
  // Parallax effects
  const yPosAnim = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityAnim = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.5, 0]);
  
  // Start scroll animations once page is loaded
  useLocoScroll(!isLoading);
  
  useEffect(() => {
    // Simulate loading assets
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        const increment = Math.floor(Math.random() * 10);
        const newProgress = Math.min(prev + increment, 100);
        
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
      initAnimations();
    }
  }, [isLoading]);
  
  // Animate testimonials
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);
  
  const initAnimations = () => {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
      .from('.hero-title .word', {
        opacity: 0, 
        y: 100, 
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out'
      })
      .from('.hero-subtitle', {
        opacity: 0, 
        y: 20, 
        duration: 1,
        ease: 'power3.out'
      }, '-=0.8')
      .from('.hero-buttons .btn', {
        opacity: 0, 
        y: 20, 
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.7')
      .from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');
      
    // Setup scroll-triggered animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate statistics counters
    gsap.utils.toArray('.stat-number').forEach((stat: any) => {
      const target = parseInt(stat.getAttribute('data-value'), 10);
      
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: 'top bottom-=100',
        },
      });
    });
  };
  
  // Split text into words for hero animation
  const splitText = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-[0.2em]">{word}</span>
    ));
  };
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <motion.div 
          className="text-5xl font-bold mb-8 text-primary"
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
    <div ref={scrollRef} className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen flex items-center relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: yPosAnim, opacity: opacityAnim }}
        >
          <ThreeScene className="w-full h-full" />
        </motion.div>
        
        <div className="container mx-auto px-6 z-10 relative pt-20">
          <div className="max-w-4xl">
            <h1 className="hero-title text-5xl md:text-7xl font-bold tracking-tight mb-8">
              {splitText("Creating Immersive Digital Experiences")}
            </h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-foreground/70 mb-12 max-w-xl">
              Combining Three.js, GSAP, and Framer Motion to build captivating interactive web environments.
            </p>
            
            <div className="hero-buttons flex flex-wrap gap-4">
              <motion.a 
                href="#projects"
                className="btn bg-primary text-primary-foreground px-8 py-4 rounded-md text-lg font-medium hover:bg-primary/90 interactive flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                View Projects
                <ArrowRight className="ml-2" size={18} />
              </motion.a>
              
              <motion.a 
                href="#contact"
                className="btn border-2 border-foreground/20 hover:border-primary text-foreground px-8 py-4 rounded-md text-lg font-medium interactive"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                Get in Touch
              </motion.a>
            </div>
          </div>
        </div>
        
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
      
      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 85, label: "Projects Completed" },
              { value: 120, label: "Happy Clients" },
              { value: 15, label: "Awards Won" },
              { value: 5, label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="fade-in">
                <div className="stat-number text-4xl md:text-5xl font-bold text-primary mb-2" data-value={stat.value}>
                  0
                </div>
                <p className="text-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-reveal">About Me</h2>
              <div className="space-y-4">
                <p className="text-foreground/80">
                  I'm a creative developer specializing in interactive 3D web experiences that push the boundaries of what's possible in the browser.
                </p>
                <p className="text-foreground/80">
                  With a background in both design and development, I bridge the gap between stunning visuals and technical excellence, creating memorable digital experiences that engage and inspire.
                </p>
                <p className="text-foreground/80">
                  My work combines cutting-edge technologies like Three.js, GSAP, and Framer Motion to deliver immersive interactions and fluid animations that make each project unique.
                </p>
              </div>
              
              <div className="mt-8 flex gap-4">
                <motion.a 
                  href="#skills"
                  className="bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-md interactive"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  My Skills
                </motion.a>
                <motion.a 
                  href="#projects"
                  className="bg-transparent border border-border hover:border-primary text-foreground px-6 py-3 rounded-md interactive"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Work
                </motion.a>
              </div>
            </div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-8 relative z-10"
              >
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: <Code size={24} />, title: "Development", text: "Creating interactive and responsive web applications" },
                    { icon: <Globe size={24} />, title: "3D Web", text: "Building immersive 3D experiences for the browser" },
                    { icon: <Users size={24} />, title: "Collaboration", text: "Working closely with designers and stakeholders" },
                    { icon: <Star size={24} />, title: "Quality", text: "Ensuring high-performance and polished experiences" }
                  ].map((service, index) => (
                    <motion.div 
                      key={index}
                      className="flex flex-col items-center text-center"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <div className="text-primary">
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">{service.title}</h3>
                      <p className="text-foreground/70 text-sm">{service.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <div className="absolute -z-10 -top-4 -left-4 w-full h-full bg-primary/5 border border-primary/20 rounded-lg"></div>
              <div className="absolute -z-20 -top-8 -left-8 w-full h-full bg-secondary/10 border border-secondary/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4">My Skills</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              I specialize in these technologies and constantly expand my expertise to create cutting-edge web experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={index}
                className="bg-background border border-border rounded-lg p-6 stagger-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore some of my interactive 3D web experiences that push the boundaries of what's possible on the web.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="group overflow-hidden h-80 rounded-lg stagger-item interactive relative bg-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                {/* Project Image with Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                
                {/* Project Content */}
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-primary mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-foreground/80 max-w-md mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-background/20 backdrop-blur-sm px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div 
                      className="bg-primary h-10 w-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="h-5 w-5 text-white" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.a
              href="/projects"
              className="inline-block border border-border hover:border-primary px-8 py-3 rounded-md text-lg font-medium interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.a>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              What clients say about working with me and the experiences I create.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative h-[300px]">
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  index === currentTestimonial && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border"
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <svg className="h-8 w-8 text-primary mb-4 opacity-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5 8H5.5C4.67157 8 4 8.67157 4 9.5V12.5C4 13.3284 4.67157 14 5.5 14H7.5C8.32843 14 9 14.6716 9 15.5V16.5C9 17.3284 8.32843 18 7.5 18H6.5C5.67157 18 5 17.3284 5 16.5M19.5 8H15.5C14.6716 8 14 8.67157 14 9.5V12.5C14 13.3284 14.6716 14 15.5 14H17.5C18.3284 14 19 14.6716 19 15.5V16.5C19 17.3284 18.3284 18 17.5 18H16.5C15.6716 18 15 17.3284 15 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <p className="text-lg mb-4">{testimonial.text}</p>
                        </div>
                        
                        <div>
                          <p className="font-bold">{testimonial.author}</p>
                          <p className="text-foreground/70 text-sm">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-6 fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
                <p className="text-foreground/70 text-xl mb-8 max-w-md">
                  Ready to bring your ideas to life? Let's create something amazing together.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:hello@3dlab.dev" className="text-foreground/70 hover:text-primary transition-colors">
                        hello@3dlab.dev
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mr-4">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Work Inquiries</h3>
                      <p className="text-foreground/70">
                        Open for freelance opportunities and collaborations.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  {['GitHub', 'Twitter', 'LinkedIn', 'Dribbble'].map((platform, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">{platform}</span>
                      {/* Icon would go here */}
                    </motion.a>
                  ))}
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 interactive"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="text-2xl font-bold tracking-tighter text-primary">
                3D<span className="text-accent">Lab</span>
              </div>
              <p className="text-foreground/60 mt-1">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <nav className="flex space-x-6">
                {['Home', 'Projects', 'About', 'Contact'].map((item, index) => (
                  <motion.a 
                    key={index} 
                    href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                    className="text-foreground/60 hover:text-primary transition-colors interactive"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
              
              <div className="h-4 border-l border-border hidden md:block"></div>
              
              <div className="flex space-x-4">
                {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((platform, index) => (
                  <motion.a 
                    key={index} 
                    href="#" 
                    className="text-foreground/60 hover:text-primary transition-colors interactive"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={platform}
                  >
                    <span className="sr-only">{platform}</span>
                    {/* Icon would go here */}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
