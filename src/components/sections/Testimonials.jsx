import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    purchase: 'Tata Harrier XZ+ (2023)',
    feedback: 'The experience was absolute luxury. I booked a home test drive, completed all documents digitally, and had the car delivered to my driveway. The transparency of their pricing was refreshing.'
  },
  {
    name: 'David Miller',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    purchase: 'Mahindra XUV700 AX7 (2022)',
    feedback: 'I was skeptical about buying a pre-owned luxury car, but AutoElite exceeded all my expectations. The 150-point inspection log was highly detailed, and the 7-day money-back guarantee gave me the ultimate peace of mind.'
  },
  {
    name: 'Amanda Brooks',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
    rating: 5,
    purchase: 'Tesla Model Y Performance (2023)',
    feedback: 'Fantastic customer service. The finance calculator was spot-on, and they helped me secure a great interest rate. Easy documentation, smooth trade-in valuation, and super friendly experts.'
  }
];

const Testimonials = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            What Our Buyers Say
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto mt-4 font-medium">
            Read certified reviews from customers who found their dream cars through our dealership network.
          </p>
        </div>

        {/* Testimonial Active Display Card */}
        <div className="relative min-h-[320px] max-w-4xl mx-auto flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="bg-surface-dark border border-gray-150/70 p-8 md:p-12 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-8 items-center text-left relative"
            >
              <div className="absolute top-8 right-8 text-gray-200 pointer-events-none hidden md:block">
                <MessageSquare size={64} className="opacity-40" />
              </div>

              {/* Avatar Column */}
              <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img 
                    src={testimonials[currentIdx].avatar} 
                    alt={testimonials[currentIdx].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-primary text-lg">{testimonials[currentIdx].name}</h4>
                  <span className="bg-emerald-555/10 border border-emerald-500/20 text-emerald-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider inline-block mt-1">
                    ✓ {testimonials[currentIdx].role}
                  </span>
                </div>
              </div>

              {/* Content Column */}
              <div className="space-y-4 flex-grow">
                {/* Star rating */}
                <div className="flex gap-1 text-amber-500 justify-center md:justify-start">
                  {[...Array(testimonials[currentIdx].rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold italic">
                  "{testimonials[currentIdx].feedback}"
                </blockquote>

                <div className="pt-2 border-t border-gray-150 flex flex-wrap gap-4 items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
                  <div>
                    <span className="text-gray-400 font-medium mr-1.5">Purchase:</span>
                    <span className="text-primary font-black">{testimonials[currentIdx].purchase}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
          
        </div>

        {/* Carousel Indicators & Action Keys */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button 
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 hover:border-accent hover:text-accent text-primary flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`transition-all duration-300 rounded-full ${
                  currentIdx === i ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 hover:border-accent hover:text-accent text-primary flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
