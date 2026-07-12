import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  const navigate = useNavigate();
  const bgImage = "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1920"; // Premium luxury vehicle dashboard/front view

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-32 bg-primary text-white overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary z-10" />
        <img 
          src={bgImage} 
          alt="Premium luxury car dashboard" 
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
            Ready to Find Your Next Car?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-medium">
            Explore our curated catalog of pristine luxury vehicles or reach out to our team of sales advisors today.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => navigate('/buy')}
            className="group px-8 py-4 bg-accent hover:bg-accent-hover text-white font-extrabold rounded-xl shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <span>Browse Inventory</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#contact-us"
            onClick={handleContactClick}
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 text-white font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <Phone size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            <span>Contact Consultants</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
