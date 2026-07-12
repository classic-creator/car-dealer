import React, { useState } from 'react';
import { motion } from 'framer-motion';
import glanzaImg from '../../assets/glanzafaceliftglanzafaceliftrightfrontthreequarter.webp';
import punchImg1 from '../../assets/punchevpunchevrightfrontthreequarter.webp';
import punchImg2 from '../../assets/punchevpunchevrightfrontthreequarter (1).webp';
import hyryderImg from '../../assets/urbancruiserhyryderhyryderrightfrontthreequarter.webp';

const QuickLook = () => {
  const [activeTab, setActiveTab] = useState('UPCOMING');

  const cars = [
    {
      id: 1,
      name: 'TOYOTA GLANZA',
      oldPrice: '$40,152',
      newPrice: '$26,598',
      year: '2024',
      transmission: 'Automatic',
      power: '90 hp',
      image: glanzaImg,
    },
    {
      id: 2,
      name: 'TATA PUNCH EV',
      oldPrice: '$40,152',
      newPrice: '$26,598',
      year: '2024',
      transmission: 'Automatic',
      power: '120 hp',
      image: punchImg1,
    },
    {
      id: 3,
      name: 'TATA PUNCH EV (Variant)',
      oldPrice: '$40,152',
      newPrice: '$26,598',
      year: '2024',
      transmission: 'Automatic',
      power: '120 hp',
      image: punchImg2,
    },
    {
      id: 4,
      name: 'TOYOTA HYRYDER',
      oldPrice: '$40,152',
      newPrice: '$26,598',
      year: '2024',
      transmission: 'Manual',
      power: '101 hp',
      image: hyryderImg,
    }
  ];

  const tabs = ['UPCOMING', 'POPULAR', 'LATEST'];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 uppercase tracking-tight">
              For Your Quick Look
            </h2>
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 text-sm font-semibold transition-colors ${
                    activeTab === tab 
                      ? 'bg-accent text-white' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Nav Arrows */}
          <div className="flex gap-2 mt-6 md:mt-0">
            <button className="w-10 h-10 bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <span className="font-bold">&lt;</span>
            </button>
            <button className="w-10 h-10 bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <span className="font-bold">&gt;</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 shadow-sm flex flex-col"
            >
              {/* Image */}
              <div className="h-48 bg-gradient-to-b from-[#4a4a4a] to-[#2a2a2a] relative overflow-hidden flex items-center justify-center p-4">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-contain mix-blend-screen"
                />
              </div>

              {/* Body */}
              <div className="p-6 text-center flex-grow flex flex-col justify-center bg-gray-50/50">
                <h3 className="text-base font-medium text-primary mb-3 uppercase px-4 leading-snug">
                  {car.name}
                </h3>
                
                <div className="w-10 h-[1px] bg-gray-300 mx-auto mb-4"></div>
                
                <div className="flex items-center justify-center gap-3">
                  <span className="text-gray-400 line-through text-sm">{car.oldPrice}</span>
                  <span className="text-primary font-bold text-lg">{car.newPrice}</span>
                </div>
              </div>

              {/* Footer details */}
              <div className="grid grid-cols-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
                <div className="py-3 text-center border-r border-gray-100 font-medium">
                  {car.year}
                </div>
                <div className="py-3 text-center border-r border-gray-100 font-medium">
                  {car.transmission}
                </div>
                <div className="py-3 text-center font-medium">
                  {car.power}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default QuickLook;
