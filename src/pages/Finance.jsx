import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Finance = () => {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [months, setMonths] = useState(60);
  const interestRate = 5.9; // Fixed for demo

  const monthlyPayment = ((loanAmount * (1 + (interestRate / 100) * (months / 12))) / months).toFixed(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary pt-24 pb-32 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Auto Financing Made Simple</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Calculate your estimated monthly payments and apply for pre-approval in minutes.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-20 mb-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Sliders */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between font-bold mb-4">
                <span>Vehicle Price</span>
                <span className="text-accent">${loanAmount.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="5000" max="150000" step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-accent h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <div className="flex justify-between font-bold mb-4">
                <span>Loan Term (Months)</span>
                <span className="text-accent">{months}</span>
              </div>
              <input 
                type="range" 
                min="12" max="84" step="12"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-accent h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="font-semibold text-gray-500">Estimated APR</span>
              <span className="font-bold text-lg">{interestRate}%</span>
            </div>
          </div>

          {/* Result */}
          <div className="bg-primary text-white rounded-2xl p-8 text-center flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
            <p className="text-gray-300 font-semibold mb-2 relative z-10">Estimated Monthly Payment</p>
            <motion.div 
              key={monthlyPayment}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-6xl font-bold text-accent mb-8 relative z-10"
            >
              ${monthlyPayment}
            </motion.div>
            <button className="w-full bg-accent hover:bg-accent-hover py-4 rounded-xl font-bold text-lg transition-colors relative z-10 shadow-lg">
              Apply for Pre-Approval
            </button>
            <p className="text-xs text-gray-400 mt-4 relative z-10">* Does not include taxes, title, or fees.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Finance;
