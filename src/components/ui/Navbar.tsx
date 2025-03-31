
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/');
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Set current active menu item based on location
  useEffect(() => {
    const path = window.location.pathname;
    setActiveItem(path);
  }, []);
  
  // Handle menu open animation
  useEffect(() => {
    if (menuOpen) {
      // Animate menu items when menu opens
      gsap.fromTo(
        '.mobile-menu-item',
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }
  }, [menuOpen]);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 transition-colors duration-300 
        ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="z-50"
          >
            <Link to="/" className="text-2xl font-bold tracking-tighter text-primary interactive">
              3D<span className="text-accent">Lab</span>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <NavItem 
                key={item.path} 
                href={item.path} 
                label={item.label} 
                isActive={activeItem === item.path}
                onClick={() => setActiveItem(item.path)} 
              />
            ))}
            
            <motion.button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              Resume
            </motion.button>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="block md:hidden text-foreground z-50 interactive"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center space-y-8 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navItems.map((item, index) => (
                <div key={item.path} className="mobile-menu-item">
                  <Link
                    to={item.path}
                    className={`text-2xl font-semibold ${
                      activeItem === item.path ? "text-primary" : "text-foreground/80 hover:text-foreground"
                    } transition-colors`}
                    onClick={() => {
                      setActiveItem(item.path);
                      setMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <motion.button
                className="mobile-menu-item bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-medium hover:bg-primary/90 mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface NavItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, label, isActive = false, onClick }: NavItemProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        to={href} 
        className="relative text-sm tracking-wider uppercase interactive"
        onClick={onClick}
      >
        <span className={`transition-colors duration-300 ${
          isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
        }`}>
          {label}
        </span>
        {isActive && (
          <motion.div 
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
            layoutId="navIndicator"
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 30 
            }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Navbar;
