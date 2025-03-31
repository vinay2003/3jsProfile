import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaDribbble } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Navbar from "@/components/ui/Navbar";
import AdvancedCursor from "@/components/ui/AdvancedCursor";
import useLocoScroll from "@/hooks/useLocoScroll";
import {
  ArrowRight,
  Code,
  Users,
  Globe,
  Star,
  Briefcase,
  Mail,
  ExternalLink,
} from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import AnimatedButton from "@/components/ui/AnimatedButton";
import SectionHeading from "@/components/ui/SectionHeading";
import Hero from "@/components/sections/Hero";
import Education from "@/components/sections/Education";
import LoadingScreen from "@/components/ui/LoadingScreen";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Project data
const projects = [
  {
    title: "Cosmic Explorer",
    description:
      "Interactive 3D journey through the solar system with detailed models and animations.",
    category: "3D Visualization",
    tags: ["Three.js", "React", "WebGL"],
    image:
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3",
  },
  {
    title: "Architectural Portfolio",
    description:
      "Navigate through photorealistic 3D architectural visualizations of modern buildings.",
    category: "3D Modeling",
    tags: ["Three.js", "GSAP", "Blender"],
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3",
  },
  {
    title: "Data Visualization",
    description:
      "Interactive data visualization platform using 3D charts and immersive UX.",
    category: "Data Viz",
    tags: ["D3.js", "React", "Three.js"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
  },
  {
    title: "VR Product Showcase",
    description:
      "Virtual reality product showcase for interactive shopping experiences.",
    category: "VR Development",
    tags: ["Three.js", "WebXR", "React"],
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3",
  },
];

// Skills data
const skills = [
  {
    category: "3D & Animation",
    items: [
      "Three.js",
      "WebGL",
      "GSAP",
      "Framer Motion",
      "Blender",
      "Cinema 4D",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "GraphQL",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB", "Firebase", "AWS", "REST APIs"],
  },
  {
    category: "Other",
    items: [
      "UI/UX Design",
      "Responsive Design",
      "Performance Optimization",
      "SEO",
      "Git",
      "Figma",
    ],
  },
];

// Testimonial data
const testimonials = [
  {
    text: "Working with this developer was an incredible experience. The 3D visualizations created for our project exceeded our expectations and significantly improved user engagement.",
    author: "Alex Johnson",
    role: "Creative Director",
    company: "DigitalCraft Studios",
  },
  {
    text: "The interactive portfolio website developed for our architecture firm has completely transformed how we present our projects. Clients love the immersive experience!",
    author: "Sarah Williams",
    role: "Principal Architect",
    company: "ModernSpace Architects",
  },
  {
    text: "Exceptional technical skills combined with creative vision. Delivered our product visualization tool on time and under budget with stunning visual quality.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "InnovateTech",
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Start scroll animations once page is loaded
  useLocoScroll(!isLoading);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Initialize animations after loading
  useEffect(() => {
    if (isLoading) return;

    // Initialize stat counter animations
    const statElements = document.querySelectorAll(".stat-number");

    statElements.forEach((element) => {
      const targetValue = parseInt(
        element.getAttribute("data-value") || "0",
        10
      );

      gsap.fromTo(
        element,
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 2,
          ease: "power1.inOut",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
          },
        }
      );
    });

    // Update ScrollTrigger when the page loads
    ScrollTrigger.refresh();
  }, [isLoading]);

  // Animate testimonials
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />

      <div
        ref={scrollRef}
        className={`min-h-screen bg-background text-foreground overflow-x-hidden ${
          isLoading ? "hidden" : ""
        }`}
      >
        <AdvancedCursor />
        <Navbar />
        {/* Hero Section */}
        <Hero />
        {/* Stats Section */}
        <section className="py-20 bg-card relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute -top-[30%] -right-[10%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute -bottom-[30%] -left-[10%] w-[40%] h-[60%] bg-accent/5 rounded-full blur-[100px] animate-float animation-delay-2000"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: 10, label: "Projects Completed" },
                { value: 20, label: "Happy Clients" },
                { value: 4, label: "Awards Won" },
                { value: 1, label: "Years Experience" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="transform transition-transform hover:scale-105 duration-300"
                >
                  <div className="p-6 bg-background/40 backdrop-blur-sm border border-border rounded-lg shadow-lg">
                    <div
                      className="stat-number text-4xl md:text-5xl font-bold text-primary mb-2"
                      data-value={stat.value}
                    >
                      0
                    </div>
                    <p className="text-foreground/70">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-[100px]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <SectionHeading
              title="About Me"
              subtitle="I create immersive digital experiences with cutting-edge web technologies"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="fade-in">
                <div className="space-y-4">
                  <AnimatedText
                    text="I'm a creative developer specializing in interactive 3D web experiences that push the boundaries of what's possible in the browser."
                    animation="lines"
                    className="text-foreground/80"
                  />
                  <AnimatedText
                    text="With a background in both design and development, I bridge the gap between stunning visuals and technical excellence, creating memorable digital experiences that engage and inspire."
                    animation="lines"
                    delay={0.2}
                    className="text-foreground/80"
                  />
                  <AnimatedText
                    text="My work combines cutting-edge technologies like Three.js, GSAP, and Framer Motion to deliver immersive interactions and fluid animations that make each project unique."
                    animation="lines"
                    delay={0.4}
                    className="text-foreground/80"
                  />
                </div>

                <div className="mt-8 flex gap-4">
                  <AnimatedButton
                    variant="secondary"
                    hoverEffect="shine"
                    className="interactive"
                  >
                    My Skills
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    hoverEffect="slide"
                    className="interactive"
                  >
                    View Work
                  </AnimatedButton>
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
                      {
                        icon: <Code size={24} />,
                        title: "Development",
                        text: "Creating interactive and responsive web applications",
                      },
                      {
                        icon: <Globe size={24} />,
                        title: "3D Web",
                        text: "Building immersive 3D experiences for the browser",
                      },
                      {
                        icon: <Users size={24} />,
                        title: "Collaboration",
                        text: "Working closely with designers and stakeholders",
                      },
                      {
                        icon: <Star size={24} />,
                        title: "Quality",
                        text: "Ensuring high-performance and polished experiences",
                      },
                    ].map((service, index) => (
                      <motion.div
                        key={index}
                        className="flex flex-col items-center text-center"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                          <div className="text-primary">{service.icon}</div>
                        </div>
                        <h3 className="font-semibold mb-1">{service.title}</h3>
                        <p className="text-foreground/70 text-sm">
                          {service.text}
                        </p>
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
        <section id="skills" className="py-24 bg-card relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[20%] right-0 w-[30%] h-[50%] bg-primary/5 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-[20%] left-0 w-[30%] h-[50%] bg-accent/5 rounded-full blur-[80px]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <SectionHeading
              title="My Skills"
              subtitle="I specialize in these technologies and constantly expand my expertise to create cutting-edge web experiences."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-fade-in">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={index}
                  className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-6 stagger-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-primary">
                    {skillGroup.category}
                  </h3>
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
        {/* Education Section */}
        <Education />
        {/* Projects Section */}
        <section id="projects" className="py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/5 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/5 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/4"></div>

          <div className="container mx-auto px-6 relative z-10">
            <SectionHeading
              title="Featured Projects"
              subtitle="Explore some of my interactive 3D web experiences that push the boundaries of what's possible on the web."
            />

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
                    className="absolute inset-0 bg-cover bg-center z-0 mask-reveal"
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
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <ArrowRight className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <AnimatedButton
                variant="outline"
                hoverEffect="expand"
                className="interactive px-8"
              >
                View All Projects
              </AnimatedButton>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="py-24 bg-card relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -top-[20%] -right-[10%] w-[40%] h-[60%] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[60%] bg-accent/5 rounded-full blur-[100px]"></div>

          <div className="container mx-auto px-6 relative z-10">
            <SectionHeading
              title="Client Testimonials"
              subtitle="What clients say about working with me and the experiences I create."
            />

            <div className="max-w-3xl mx-auto">
              <div className="relative h-[300px]">
                <AnimatePresence mode="wait">
                  {testimonials.map(
                    (testimonial, index) =>
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
                              <svg
                                className="h-8 w-8 text-primary mb-4 opacity-50"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.5 8H5.5C4.67157 8 4 8.67157 4 9.5V12.5C4 13.3284 4.67157 14 5.5 14H7.5C8.32843 14 9 14.6716 9 15.5V16.5C9 17.3284 8.32843 18 7.5 18H6.5C5.67157 18 5 17.3284 5 16.5M19.5 8H15.5C14.6716 8 14 8.67157 14 9.5V12.5C14 13.3284 14.6716 14 15.5 14H17.5C18.3284 14 19 14.6716 19 15.5V16.5C19 17.3284 18.3284 18 17.5 18H16.5C15.6716 18 15 17.3284 15 16.5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <p className="text-lg mb-4">{testimonial.text}</p>
                            </div>

                            <div>
                              <p className="font-bold">{testimonial.author}</p>
                              <p className="text-foreground/70 text-sm">
                                {testimonial.role}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
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
        <section id="contact" className="py-24 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/5 rounded-full blur-[80px] transform -translate-x-1/4 translate-y-1/4"></div>

          <div className="container mx-auto px-6 relative z-10">
            <SectionHeading
              title="Let's Work Together"
              subtitle="Ready to bring your ideas to life? Let's create something amazing together."
            />

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="fade-in">
                  <p className="text-foreground/70 text-xl mb-8 max-w-md">
                    Open for freelance opportunities and collaborations. Get in
                    touch and let's discuss your project.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mr-4">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:hello@3dlab.dev"
                          className="text-foreground/70 hover:text-primary transition-colors"
                        >
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
                    {[
                      { platform: "GitHub", icon: <FaGithub /> },
                      { platform: "Twitter", icon: <FaTwitter /> },
                      { platform: "LinkedIn", icon: <FaLinkedin /> },
                      { platform: "Dribbble", icon: <FaDribbble /> },
                    ].map(({ platform, icon }, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="h-10 w-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary/20 transition-colors interactive"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="sr-only">{platform}</span>
                        {icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-card/70 backdrop-blur-sm border border-border rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-background/60 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-background/60 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 bg-background/60 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <AnimatedButton
                      type="submit"
                      className="w-full py-3 font-medium interactive"
                      hoverEffect="shine"
                    >
                      Send Message
                    </AnimatedButton>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="py-12 border-t border-border bg-card relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent opacity-30"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              {/* Logo and intro */}
              <div className="col-span-1 md:col-span-1">
                <div className="text-2xl font-bold tracking-tighter text-primary mb-4">
                  Vinay<span className="text-accent">Sharma</span>
                </div>
                <p className="text-foreground/60 mb-6">
                  Creating immersive digital experiences with cutting-edge web
                  technologies.
                </p>
                <div className="flex space-x-4">
                  {["GitHub", "Twitter", "LinkedIn", "Dribbble"].map(
                    (platform, i) => {
                      const icons = {
                        GitHub: <FaGithub />,
                        Twitter: <FaTwitter />,
                        LinkedIn: <FaLinkedin />,
                        Dribbble: <FaDribbble />,
                      };

                      return (
                        <motion.a
                          key={i}
                          href="#"
                          className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary/20 transition-colors interactive"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="sr-only">{platform}</span>
                          {icons[platform]}{" "}
                          {/* This renders the respective icon */}
                        </motion.a>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  {[
                    "Home",
                    "About",
                    "Projects",
                    "Skills",
                    "Education",
                    "Contact",
                  ].map((item, index) => (
                    <li key={index}>
                      <motion.a
                        href={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
                        className="text-foreground/60 hover:text-primary transition-colors inline-block"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  {[
                    "3D Web Development",
                    "Interactive Experiences",
                    "Creative Development",
                    "UI/UX Design",
                    "Performance Optimization",
                  ].map((item, index) => (
                    <li key={index}>
                      <motion.a
                        href="#"
                        className="text-foreground/60 hover:text-primary transition-colors inline-block"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-3">
                  <p className="flex items-center text-foreground/60">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    vinaysharma31681@gmail.com
                  </p>
                </div>
                <div className="mt-6">
                  <AnimatedButton
                    variant="outline"
                    hoverEffect="slide"
                    className="text-sm px-4 py-2"
                  >
                    Get in Touch
                  </AnimatedButton>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-foreground/60 text-sm">
                  © {new Date().getFullYear()} 3DLab. All rights reserved
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-foreground/60 hover:text-primary transition-colors text-sm"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
