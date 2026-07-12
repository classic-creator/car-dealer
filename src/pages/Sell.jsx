import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Sell = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-surface-dark pb-24">
      {/* Hero */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sell Your Car in Minutes</h1>
          <p className="text-xl text-gray-300 mb-8">Get a real offer instantly. No haggling, no hassle.</p>
        </div>
      </div>

      {/* Multi-step Form */}
      <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          
          {/* Progress Bar */}
          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
            <div className={`absolute top-1/2 left-0 h-1 bg-accent -z-10 -translate-y-1/2 transition-all duration-500 w-${step === 1 ? '0' : step === 2 ? '1/2' : 'full'}`}></div>
            
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= i ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > i ? <Check size={18} /> : i}
              </div>
            ))}
          </div>

          {/* Form Content */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6">Tell us about your vehicle</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Year" className="bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-accent outline-none" />
                  <input type="text" placeholder="Make" className="bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-accent outline-none" />
                  <input type="text" placeholder="Model" className="col-span-2 bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-accent outline-none" />
                  <input type="text" placeholder="Mileage" className="col-span-2 bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-accent outline-none" />
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold mt-4 transition-colors">
                  Next Step
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-6">Vehicle Condition</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Excellent', 'Good', 'Fair'].map(cond => (
                    <button key={cond} className="border-2 border-gray-200 hover:border-accent hover:bg-red-50 p-6 rounded-xl flex flex-col items-center gap-2 transition-all group">
                      <span className="font-bold text-lg text-primary group-hover:text-accent">{cond}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-bold transition-colors">Back</button>
                  <button onClick={() => setStep(3)} className="w-2/3 bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold transition-colors">Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold mb-2">Get Your Instant Offer</h2>
                <p className="text-gray-500 mb-6">Enter your email to receive your official valuation.</p>
                <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-accent outline-none mb-4" />
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-bold transition-colors">Back</button>
                  <button onClick={() => alert('Offer Sent!')} className="w-2/3 bg-primary hover:bg-primary-light text-white py-4 rounded-xl font-bold transition-colors">Get Offer</button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Sell;
