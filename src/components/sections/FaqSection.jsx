import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: 'Financing',
    q: 'What financing terms and interest rates do you offer?',
    a: 'We partner with over 10 top-tier financial institutions to secure highly competitive rates starting at 4.9% APR. Down payment configurations are fully flexible, and loan tenures range from 12 to 84 months. Pre-approvals do not affect your credit score.'
  },
  {
    category: 'Warranty',
    q: 'What warranty coverage comes with certified pre-owned vehicles?',
    a: 'Every certified car comes with our complimentary 12-Month / 15,000-mile comprehensive warranty which covers key engine, transmission, electrical, and cooling system parts. Extended protection options up to 5 years are available.'
  },
  {
    category: 'Inspection',
    q: 'How extensive is your pre-sale vehicle inspection check?',
    a: 'We perform a strict 150-point inspection covering structural integrity, mechanical status, steering systems, dashboard electricals, brakes, tires, and a thorough road-test assessment. Each car includes a detailed diagnostic sheet you can download.'
  },
  {
    category: 'Documentation',
    q: 'Who handles ownership title transfer and local registration paperwork?',
    a: 'Our in-house registration desk takes care of all title transfers, vehicle registration documents, road tax filings, and license plate arrangements. All paperwork is completed on the day of sale, leaving you completely hassle-free.'
  },
  {
    category: 'Test Drives',
    q: 'Can I schedule a vehicle test drive session at my home address?',
    a: 'Absolutely. We offer complimentary home test drives where our representative brings the sanitized vehicle directly to your driveway. Alternatively, you can book a VIP slot at any of our showroom locations.'
  }
];

const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (index) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section className="py-24 bg-surface-dark relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Help Desk</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-lg mx-auto mt-4 font-medium">
            Find quick answers to common questions about our pre-owned luxury processes.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            
            return (
              <div 
                key={index}
                className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 font-extrabold text-primary hover:text-accent transition-colors cursor-pointer"
                >
                  <div className="flex gap-3.5 items-center">
                    <span className="text-[10px] font-black font-sans px-2 py-0.5 rounded bg-gray-50 text-gray-400 border border-gray-100 uppercase tracking-widest">
                      {faq.category}
                    </span>
                    <span className="text-sm md:text-base leading-snug">{faq.q}</span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm md:text-base text-gray-500 font-medium leading-relaxed border-t border-gray-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
