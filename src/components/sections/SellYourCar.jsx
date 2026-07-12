import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CalendarRange, Landmark, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SellYourCar = () => {
  const navigate = useNavigate();
  const bannerCar = "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200"; // Premium AMG Mercedes

  const steps = [
    {
      icon: <CalendarRange className="w-5 h-5 text-accent" />,
      title: '1. Request Valuation',
      desc: 'Fill in your model details online and receive an instant competitive value estimate.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      title: '2. Book Inspection',
      desc: 'Schedule a free 120-point inspection at your home or our showroom branch.'
    },
    {
      icon: <Landmark className="w-5 h-5 text-accent" />,
      title: '3. Sell Instantly',
      desc: 'Accept our guaranteed pricing offer and receive immediate secure wire transfer payments.'
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-primary rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch border border-white/5">
          
          {/* Content Column Left */}
          <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-between text-left relative z-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Selling Process</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Sell Your Car In <br />
                Three Simple Steps
              </h2>
              <p className="text-gray-400 text-sm md:text-base font-semibold leading-relaxed">
                Looking to upgrade or cash out? We offer top market valuation, absolute inspection transparency, and immediate direct bank payments.
              </p>

              {/* Sell Steps */}
              <div className="space-y-5 pt-4">
                {steps.map((s, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm tracking-wide">{s.title}</h4>
                      <p className="text-xs text-gray-400 font-semibold mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-10">
              <button
                onClick={() => navigate('/sell')}
                className="group px-8 py-4 bg-accent hover:bg-accent-hover text-white font-extrabold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-accent/25 cursor-pointer"
              >
                <span>Get Free Valuation</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Visual Column Right */}
          <div className="lg:w-1/2 relative min-h-[350px] bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10 hidden lg:block" />
            <img 
              src={bannerCar} 
              alt="Sell your car banner" 
              className="w-full h-full object-cover object-center" 
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default SellYourCar;
