import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Percent, Calendar, Calculator, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EmiCalculator = () => {
  const navigate = useNavigate();

  // Inputs
  const [carPrice, setCarPrice] = useState(3000000);
  const [downPayment, setDownPayment] = useState(600000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [loanTerm, setLoanTerm] = useState(5); // in years

  // Outputs
  const [loanAmount, setLoanAmount] = useState(2400000);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Recalculate whenever inputs change
  useEffect(() => {
    // Principal (P)
    const principal = Math.max(0, carPrice - downPayment);
    setLoanAmount(principal);

    // Monthly Interest Rate (r)
    const r = (interestRate / 12) / 100;

    // Number of payments in months (n)
    const n = loanTerm * 12;

    if (principal === 0) {
      setMonthlyPayment(0);
      return;
    }

    if (r === 0) {
      setMonthlyPayment(principal / n);
      return;
    }

    // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(Math.round(emi));
  }, [carPrice, downPayment, interestRate, loanTerm]);

  // Adjust downpayment max limit if car price changes
  const handleCarPriceChange = (val) => {
    setCarPrice(val);
    if (downPayment > val) {
      setDownPayment(val);
    }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Left */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Financing</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight leading-tight">
              Flexible Financing, <br />
              Tailored For You
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-medium leading-relaxed">
              Purchasing your dream vehicle should be as smooth as driving it. Use our interactive loan calculator to estimate your monthly budget and request competitive rates instantly.
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">✓</div>
                <p className="text-sm font-semibold text-gray-700">Pre-approval in minutes, zero impact on credit score.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">✓</div>
                <p className="text-sm font-semibold text-gray-700">Low interest rates partnered with leading banks.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">✓</div>
                <p className="text-sm font-semibold text-gray-700">Flexible down payments and tenure up to 7 years.</p>
              </div>
            </div>
          </div>

          {/* Calculator Visual Right */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary rounded-3xl overflow-hidden shadow-2xl p-6 md:p-10 text-white text-left grid grid-cols-1 md:grid-cols-12 gap-8 border border-white/5 relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Sliders Area */}
              <div className="md:col-span-7 space-y-6">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
                  <Calculator className="text-accent w-5 h-5" />
                  <span className="font-extrabold text-sm uppercase tracking-wider">EMI Loan Estimator</span>
                </div>

                {/* Car Price */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                    <span>Vehicle Price</span>
                    <span className="text-white">₹{carPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="15000000"
                    step="50000"
                    value={carPrice}
                    onChange={(e) => handleCarPriceChange(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Down Payment */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                    <span>Down Payment</span>
                    <span className="text-white">₹{downPayment.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={carPrice}
                    step="20000"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                    <span>Interest Rate</span>
                    <span className="text-white">{interestRate}% APR</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Loan Duration */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                    <span>Loan Duration</span>
                    <span className="text-white">{loanTerm} Years ({loanTerm * 12} mos)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="7"
                    step="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>

              {/* Monthly Cost Presentation */}
              <div className="md:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-between items-center text-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Payment</span>
                  <div className="text-4xl md:text-5xl font-black tracking-tight text-accent mt-2">
                    ₹{monthlyPayment.toLocaleString('en-IN')}
                    <span className="text-xs text-gray-400 font-bold block mt-1 tracking-normal">/ month</span>
                  </div>
                </div>

                <div className="w-full border-t border-b border-white/10 py-4 my-6 text-xs text-gray-300 font-semibold space-y-2.5">
                  <div className="flex justify-between">
                    <span>Principal Amount</span>
                    <span className="text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Down Payment</span>
                    <span className="text-white">₹{downPayment.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>APR (Fixed)</span>
                    <span className="text-white">{interestRate}%</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/finance')}
                  className="group w-full py-3.5 bg-white text-primary hover:bg-accent hover:text-white text-xs font-black tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>APPLY FOR FINANCE</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EmiCalculator;
