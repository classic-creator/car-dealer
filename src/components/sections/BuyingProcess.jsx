import React, { useState } from 'react';
import { Search, Compass, Calendar, FileCheck2, FileText, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

const BuyingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      icon: <Search className="w-6 h-6" />,
      title: 'Browse Inventory',
      desc: 'Explore our catalog of certified luxury cars from the comfort of your home.'
    },
    {
      num: '02',
      icon: <Compass className="w-6 h-6" />,
      title: 'Choose Vehicle',
      desc: 'Compare premium specifications and review detailed multi-point inspection logs.'
    },
    {
      num: '03',
      icon: <Calendar className="w-6 h-6" />,
      title: 'Book Test Drive',
      desc: 'Schedule a private, hassle-free test drive session at your home or showroom.'
    },
    {
      num: '04',
      icon: <FileCheck2 className="w-6 h-6" />,
      title: 'Finance Approval',
      desc: 'Customize down payment options and get instant low-rate financing offers.'
    },
    {
      num: '05',
      icon: <FileText className="w-6 h-6" />,
      title: 'Documentation',
      desc: 'Our legal desk handles all vehicle title transfers and insurance paperwork.'
    },
    {
      num: '06',
      icon: <KeyRound className="w-6 h-6" />,
      title: 'Drive Home',
      desc: 'Collect keys at the showroom or request premium door-delivery services.'
    }
  ];

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">How it works</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            The Buying Journey
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-medium">
            A seamless, transparent step-by-step roadmap to owning your premium vehicle.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative">
          
          {steps.map((step, index) => {
            const isActive = index <= activeStep;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveStep(index)}
                className="group relative flex flex-col items-start text-left cursor-pointer"
              >
                
                {/* Visual Step Marker & Icon */}
                <div className="relative mb-6">
                  {/* Step Connector Line for tablets/small displays */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-[2px] bg-white/5 md:hidden pointer-events-none" />
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                    isActive 
                      ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20 scale-105' 
                      : 'bg-primary-light border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20'
                  }`}>
                    {step.icon}
                  </div>
                  
                  {/* Floating Number */}
                  <span className={`absolute -top-3.5 -right-3.5 text-[10px] font-black font-sans px-1.5 py-0.5 rounded border transition-colors ${
                    isActive
                      ? 'bg-accent text-white border-accent'
                      : 'bg-primary-light text-gray-500 border-white/10'
                  }`}>
                    {step.num}
                  </span>
                </div>

                {/* Step Details */}
                <h3 className={`text-base font-extrabold mb-2 transition-colors ${
                  isActive ? 'text-accent' : 'text-white'
                }`}>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-semibold">
                  {step.desc}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BuyingProcess;
