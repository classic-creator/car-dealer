import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Car, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Buy a Car', path: '/buy' },
    { name: 'Sell a Car', path: '/sell' },
    { name: 'Finance', path: '/finance' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-soft py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-2 rounded-lg group-hover:bg-accent transition-colors">
              <Car size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              Auto<span className="text-accent">Elite</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm font-medium text-gray-700 hover:text-accent transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-accent transition-colors rounded-full hover:bg-gray-100">
              <Search size={20} />
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-light transition-all shadow-md hover:shadow-lg">
              <User size={18} />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 md:hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-accent rounded-md border-b border-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-800 px-5 py-3 rounded-xl text-base font-medium">
                  <Search size={20} /> Search Inventory
                </button>
                <button className="flex items-center justify-center gap-2 w-full bg-primary text-white px-5 py-3 rounded-xl text-base font-medium">
                  <User size={20} /> Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
