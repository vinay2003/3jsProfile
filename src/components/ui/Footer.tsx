
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Twitter, Linkedin, GitHub, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black/20 pt-24 pb-12 relative">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        {/* Footer Top - CTA */}
        <div className="mb-24">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              Ready to build something <span className="text-primary">incredible</span>?
            </h2>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/contact" 
                className="group flex items-center gap-2 text-xl interactive"
              >
                <span>Let's work together</span>
                <motion.span
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <ArrowRight size={20} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1 - Company */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter mb-6 block">
              3D<span className="text-primary">Lab</span>
            </Link>
            <p className="text-foreground/70 mb-6 max-w-xs">
              Creating immersive digital experiences with cutting-edge web technologies.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Instagram size={18} />} href="https://instagram.com" />
              <SocialIcon icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialIcon icon={<Linkedin size={18} />} href="https://linkedin.com" />
              <SocialIcon icon={<GitHub size={18} />} href="https://github.com" />
            </div>
          </div>
          
          {/* Column 2 - Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Navigation</h3>
            <div className="space-y-4">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/projects" label="Projects" />
              <FooterLink href="/skills" label="Skills" />
              <FooterLink href="/about" label="About" />
              <FooterLink href="/contact" label="Contact" />
            </div>
          </div>
          
          {/* Column 3 - Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <div className="space-y-4">
              <FooterLink href="#" label="3D Web Development" />
              <FooterLink href="#" label="Interactive Interfaces" />
              <FooterLink href="#" label="Motion Design" />
              <FooterLink href="#" label="UI/UX Design" />
              <FooterLink href="#" label="WebGL Experiences" />
            </div>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <p className="text-foreground/70 mb-3">
              San Francisco, CA
            </p>
            <a href="mailto:hello@3dlab.com" className="text-foreground/70 hover:text-primary transition-colors block mb-3">
              hello@3dlab.com
            </a>
            <a href="tel:+15553232323" className="text-foreground/70 hover:text-primary transition-colors">
              +1 (555) 323-2323
            </a>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            © {currentYear} 3DLab. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

const SocialIcon = ({ icon, href }: SocialIconProps) => {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors interactive"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => {
  return (
    <motion.div whileHover={{ x: 4 }}>
      <Link 
        to={href} 
        className="group flex items-center gap-1 text-foreground/70 hover:text-primary transition-colors interactive"
      >
        <span>{label}</span>
        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </motion.div>
  );
};

export default Footer;
