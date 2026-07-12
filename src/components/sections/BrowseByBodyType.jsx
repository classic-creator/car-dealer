import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../../redux/slices/carsSlice';
import { Zap, ShieldCheck } from 'lucide-react';

const BrowseByBodyType = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bodyTypes = [
    { 
      name: 'SUV', 
      desc: 'Adventure & Space',
      // SVG path for SUV silhouette
      icon: (
        <svg className="w-16 h-8 text-primary group-hover:text-accent transition-colors" viewBox="0 0 100 40" fill="currentColor">
          <path d="M5 25 L10 18 L25 15 L50 15 L62 10 L82 12 L92 20 L95 25 L95 30 L85 30 A8 8 0 0 1 70 30 L30 30 A8 8 0 0 1 15 30 L5 30 Z" />
          <circle cx="22" cy="30" r="6" fill="white" stroke="currentColor" strokeWidth="2" />
          <circle cx="78" cy="30" r="6" fill="white" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    { 
      name: 'Sedan', 
      desc: 'Comfort & Style',
      // SVG path for Sedan silhouette
      icon: (
        <svg className="w-16 h-8 text-primary group-hover:text-accent transition-colors" viewBox="0 0 100 40" fill="currentColor">
          <path d="M3 26 L12 25 L25 17 L55 17 L72 17 L86 23 L95 24 L97 27 L97 31 L84 31 A7 7 0 0 1 70 31 L32 31 A7 7 0 0 1 18 31 L3 31 Z" />
          <circle cx="25" cy="31" r="5.5" fill="white" stroke="currentColor" strokeWidth="2" />
          <circle cx="77" cy="31" r="5.5" fill="white" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    { 
      name: 'Hatchback', 
      desc: 'Agile & Efficient',
      // SVG path for Hatchback
      icon: (
        <svg className="w-16 h-8 text-primary group-hover:text-accent transition-colors" viewBox="0 0 100 40" fill="currentColor">
          <path d="M5 26 L10 25 L22 17 L55 17 L68 17 L80 14 L85 24 L90 28 L90 31 L80 31 A7 7 0 0 1 66 31 L34 31 A7 7 0 0 1 20 31 L5 31 Z" />
          <circle cx="27" cy="31" r="5.5" fill="white" stroke="currentColor" strokeWidth="2" />
          <circle cx="73" cy="31" r="5.5" fill="white" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    { 
      name: 'Coupe', 
      desc: 'Sporty & Fast',
      // SVG path for Coupe
      icon: (
        <svg className="w-16 h-8 text-primary group-hover:text-accent transition-colors" viewBox="0 0 100 40" fill="currentColor">
          <path d="M4 27 L18 24 L34 16 L56 16 L76 18 L88 23 L95 27 L95 31 L82 31 A6 6 0 0 1 70 31 L30 31 A6 6 0 0 1 18 31 L4 31 Z" />
          <circle cx="24" cy="31" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
          <circle cx="76" cy="31" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    { 
      name: 'Convertible', 
      desc: 'Open Air Luxury',
      // SVG path for Convertible
      icon: (
        <svg className="w-16 h-8 text-primary group-hover:text-accent transition-colors" viewBox="0 0 100 40" fill="currentColor">
          <path d="M4 27 L18 24 L32 23 L62 23 L72 20 L88 23 L95 27 L95 31 L82 31 A6 6 0 0 1 70 31 L30 31 A6 6 0 0 1 18 31 L4 31 Z" />
          <circle cx="24" cy="31" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
          <circle cx="76" cy="31" r="5" fill="white" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    { 
      name: 'Pickup', 
      desc: 'Power & Utility',
      // SVG path for Pickup Truck
      icon: (
        <svg className="w-16 h-8 text-primary group-hover:text-accent transition-colors" viewBox="0 0 100 40" fill="currentColor">
          <path d="M4 25 L8 20 L24 16 L48 16 L58 12 L70 12 L70 20 L96 20 L96 31 L84 31 A7 7 0 0 1 70 31 L32 31 A7 7 0 0 1 18 31 L4 31 Z" />
          <circle cx="25" cy="31" r="5.5" fill="white" stroke="currentColor" strokeWidth="2" />
          <circle cx="77" cy="31" r="5.5" fill="white" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    { 
      name: 'Luxury', 
      desc: 'Elite Class',
      icon: (
        <div className="text-primary group-hover:text-accent transition-colors flex items-center justify-center h-8">
          <ShieldCheck size={28} />
        </div>
      )
    },
    { 
      name: 'Electric', 
      desc: 'Eco & Future',
      icon: (
        <div className="text-primary group-hover:text-accent transition-colors flex items-center justify-center h-8">
          <Zap size={28} className="animate-pulse" />
        </div>
      )
    }
  ];

  const handleBodyTypeClick = (type) => {
    dispatch(setFilters({ bodyType: type }));
    navigate('/buy');
  };

  return (
    <section className="py-24 bg-surface-dark border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Categories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Browse by Body Type
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4 font-medium">
            Filter vehicles by their functional designs and styles to match your driving habits and lifestyle.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bodyTypes.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => handleBodyTypeClick(item.name)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-8 rounded-3xl border border-gray-150/60 bg-white hover:border-accent hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
            >
              <div className="h-16 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-extrabold text-primary group-hover:text-accent transition-colors">
                {item.name}
              </h3>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                {item.desc}
              </p>
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrowseByBodyType;
