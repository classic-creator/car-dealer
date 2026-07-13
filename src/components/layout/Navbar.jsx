import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, Search, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
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

  const isDarkHeader = ['/', '/about', '/sell', '/finance'].includes(location.pathname);

  // Dynamic Class Names for Transparent & Glass Theme
  const navBgClass = isScrolled
    ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/25 shadow-soft py-3'
    : isDarkHeader
      ? 'bg-transparent py-5'
      : 'bg-white/35 backdrop-blur-md border-b border-gray-200/25 py-5';

  const logoTextClass = (isScrolled || !isDarkHeader)
    ? 'text-primary'
    : 'text-white';

  const logoIconBgClass = (isScrolled || !isDarkHeader)
    ? 'bg-primary text-white group-hover:bg-accent'
    : 'bg-white/15 border border-white/20 text-white group-hover:bg-accent';

  const textClass = (isScrolled || !isDarkHeader)
    ? 'text-gray-700 hover:text-accent'
    : 'text-white/80 hover:text-white';

  const iconClass = (isScrolled || !isDarkHeader)
    ? 'text-gray-600 hover:text-accent hover:bg-gray-100'
    : 'text-white/80 hover:text-white hover:bg-white/10';

  const buttonClass = (isScrolled || !isDarkHeader)
    ? 'bg-primary text-white hover:bg-primary-light'
    : 'bg-white text-primary hover:bg-white/90';

  const mobileMenuBgClass = (isScrolled || !isDarkHeader)
    ? 'bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-lg'
    : 'bg-[#0f172a]/95 backdrop-blur-xl border-t border-white/10 shadow-lg';

  const mobileLinkClass = (isScrolled || !isDarkHeader)
    ? 'text-gray-800 hover:bg-gray-50 hover:text-accent border-b border-gray-100'
    : 'text-white/80 hover:bg-white/5 hover:text-white border-b border-white/5';

  const mobileSearchBtnClass = (isScrolled || !isDarkHeader)
    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10';

  const mobileSignInBtnClass = (isScrolled || !isDarkHeader)
    ? 'bg-primary text-white hover:bg-primary-light'
    : 'bg-white text-primary hover:bg-white/90';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-lg transition-colors ${logoIconBgClass}`}>
              <Car size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${logoTextClass}`}>
              Auto<span className="text-accent">Elite</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`text-sm font-medium transition-colors ${textClass}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={`p-2 transition-colors rounded-full ${iconClass}`}>
              <Search size={20} />
            </button>
            <button className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg ${buttonClass}`}>
              <User size={18} />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors rounded-lg ${isScrolled || !isDarkHeader ? 'text-gray-600 hover:text-primary hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
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
            className={`absolute top-full left-0 w-full md:hidden ${mobileMenuBgClass}`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${mobileLinkClass}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-base font-medium transition-colors ${mobileSearchBtnClass}`}>
                  <Search size={20} /> Search Inventory
                </button>
                <button className={`flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-base font-medium transition-all ${mobileSignInBtnClass}`}>
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
