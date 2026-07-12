import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import glanzaImg from '../../assets/glanzafaceliftglanzafaceliftrightfrontthreequarter.webp';
import punchImg from '../../assets/punchevpunchevrightfrontthreequarter.webp';
import hyryderImg from '../../assets/urbancruiserhyryderhyryderrightfrontthreequarter.webp';

const UpcomingCars = () => {
  const cars = [
    {
      id: 1,
      date: 'November 6, 2026',
      name: 'TOYOTA GLANZA HYBRID',
      image: glanzaImg,
      bgClass: 'bg-[#1e293b]', // Dark Slate
      textDark: false
    },
    {
      id: 2,
      date: 'December 12, 2026',
      name: 'TATA PUNCH EV SPORT',
      image: punchImg,
      bgClass: 'bg-white', // Light Slate/Grey
      textDark: true
    },
    {
      id: 3,
          date: 'November 6, 2026',
      name: 'TOYOTA GLANZA HYBRID',
      image: glanzaImg,
      bgClass: 'bg-[#1e293b]', // Dark Slate
      textDark: false
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[380px] border-t-4 border-accent relative z-20">
      
      {/* 1. Title Block */}
      <div className="w-full lg:w-1/4 min-h-[250px] lg:min-h-full bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex flex-col justify-between p-10 relative text-left">
        {/* Decorative Circle Bottom Left */}
        <div className="absolute bottom-8 left-8 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-black shadow-inner">
          ⚡
        </div>
        
        {/* Text */}
        <div className="my-auto space-y-2">
          <h2 className="text-6xl font-black text-slate-350 tracking-tighter leading-none flex items-baseline">
            18<span className="text-3xl text-accent font-black">+</span>
          </h2>
          <p className="text-sm font-black tracking-widest text-primary uppercase">UPCOMING VEHICLES</p>
          <p className="text-xs text-gray-500 font-semibold leading-relaxed max-w-[200px]">
            Private showcase of prototype luxury models launching next season.
          </p>
        </div>

        {/* Navigation Arrows Bottom Right */}
        <div className="absolute bottom-0 right-0 flex">
          <button className="w-12 h-12 bg-primary hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer">
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button className="w-12 h-12 bg-primary-light hover:bg-accent text-white border-l border-white/5 flex items-center justify-center transition-colors cursor-pointer">
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 2. Car Blocks */}
      {cars.map((car, index) => (
        <motion.div 
          key={car.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className={`w-full lg:w-1/4 min-h-[320px] lg:min-h-full flex flex-col justify-between group cursor-pointer overflow-hidden ${car.bgClass}`}
        >
          {/* Image Container with Hover zoom */}
          <div className="flex-grow flex items-center justify-center p-8 relative min-h-[220px]">
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-[85%] max-h-[160px] object-contain  group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500 ease-out"
            />
          </div>
          
          {/* Footer details */}
          <div className={`p-6 flex flex-col relative border-t ${
            car.textDark 
              ? 'bg-white/80 border-slate-200 text-primary' 
              : 'bg-black/10 border-white/5 text-white'
          } h-20 justify-center text-left`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${
              car.textDark ? 'text-gray-400' : 'text-gray-500'
            } mb-1`}>
              {car.date}
            </span>
            
            <h3 className="text-xs font-black tracking-widest truncate pr-8 uppercase">
              {car.name}
            </h3>
            
            {/* Arrow icon */}
            <div className={`absolute right-6 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-1 ${
              car.textDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <ArrowRight size={14} />
            </div>
          </div>
        </motion.div>
      ))}

    </div>
  );
};

export default UpcomingCars;
