import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, Mail, Phone, MapPin, Send, Check 
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-primary text-gray-400 pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Subtle bottom lighting */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5 items-start">
          {/* Logo & Description */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-accent text-white p-2 rounded-xl">
                <Car size={24} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                Auto<span className="text-accent">Elite</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed font-semibold max-w-sm">
              The new standard of purchasing and selling pre-owned luxury automobiles. Experience unmatched inspection transparency and white-glove service.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:text-white flex items-center justify-center transition-all text-gray-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:text-white flex items-center justify-center transition-all text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:text-white flex items-center justify-center transition-all text-gray-400">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-accent hover:text-white flex items-center justify-center transition-all text-gray-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-7 space-y-4 text-left w-full lg:max-w-md ml-auto">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Subscribe to Newsletter</h4>
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Stay updated on weekly luxury fleet arrivals, private events, and professional valuation guides.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-14 text-sm font-semibold text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
              />
              <button
                type="submit"
                className={`absolute right-1.5 p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                  subscribed 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/20'
                }`}
              >
                {subscribed ? <Check size={18} /> : <Send size={18} />}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 text-left">
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider border-l-2 border-accent pl-3">Quick Links</h4>
            <ul className="space-y-3.5 text-sm font-semibold">
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/sell" className="hover:text-accent transition-colors">Sell Your Car</Link></li>
              <li><Link to="/finance" className="hover:text-accent transition-colors font-medium">Financing Options</Link></li>
              <li><Link to="/compare" className="hover:text-accent transition-colors font-medium">Compare Models</Link></li>
              <li><Link to="/wishlist" className="hover:text-accent transition-colors font-medium">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Inventory Links */}
          <div className="space-y-6">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider border-l-2 border-accent pl-3">Inventory</h4>
            <ul className="space-y-3.5 text-sm font-semibold">
              <li><Link to="/buy" className="hover:text-accent transition-colors">Browse Stock</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors">Certified Cars</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors font-medium">Sedans & Coupes</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors font-medium">SUVs & Pickups</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors font-medium">Electric Fleet</Link></li>
            </ul>
          </div>

          {/* Premium Brands */}
          <div className="space-y-6">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider border-l-2 border-accent pl-3">Top Brands</h4>
            <ul className="space-y-3.5 text-sm font-semibold">
              <li><Link to="/buy" className="hover:text-accent transition-colors">Porsche</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors">Mercedes-Benz</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors">BMW</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors font-medium">Audi</Link></li>
              <li><Link to="/buy" className="hover:text-accent transition-colors font-medium">Tesla</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider border-l-2 border-accent pl-3">Contact Support</h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <span>123 Luxury Drive, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span>contact@autoelite.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-wider">
          <p className="text-gray-500 font-semibold">&copy; {new Date().getFullYear()} AutoElite. All rights reserved.</p>
          <div className="flex space-x-6 text-gray-500">
            <Link to="#" onClick={(e) => e.preventDefault()} className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" onClick={(e) => e.preventDefault()} className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
