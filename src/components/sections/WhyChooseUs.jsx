import React from 'react';
import { 
  Shield, CheckSquare, DollarSign, Award, 
  CreditCard, FileText, Activity, Users 
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-accent" />,
    title: 'Certified Vehicles',
    description: 'Only vehicles that pass our strict quality checks receive the Elite Certification label.'
  },
  {
    icon: <CheckSquare className="w-6 h-6 text-accent" />,
    title: '150-Point Inspection',
    description: 'Every mechanical component is tested and verified by our certified in-house master technicians.'
  },
  {
    icon: <DollarSign className="w-6 h-6 text-accent" />,
    title: 'Transparent Pricing',
    description: 'No hidden dealership fees, no pressure. The price you see is exactly the price you pay.'
  },
  {
    icon: <Award className="w-6 h-6 text-accent" />,
    title: 'Warranty Options',
    description: 'Drive away with peace of mind. Standard warranty included, with customizable extensions.'
  },
  {
    icon: <CreditCard className="w-6 h-6 text-accent" />,
    title: 'Finance Assistance',
    description: 'Instant approvals and customized interest rates from our trusted partner banking network.'
  },
  {
    icon: <FileText className="w-6 h-6 text-accent" />,
    title: 'Easy Documentation',
    description: 'We handle all title transfers, registration, and tax filings for a completely hassle-free purchase.'
  },
  {
    icon: <Activity className="w-6 h-6 text-accent" />,
    title: 'Roadside Assistance',
    description: '24/7 complimentary roadside assistance included for your first year of vehicle ownership.'
  },
  {
    icon: <Users className="w-6 h-6 text-accent" />,
    title: 'Trusted Dealer Network',
    description: 'Connect with a prestigious community of luxury automotive collectors and certified dealers.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Benefits</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            Why Choose AutoElite?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
            We have completely redesigned the car buying experience from the ground up to be transparent, straightforward, and premium.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-primary-light/40 border border-white/5 p-8 rounded-3xl hover:border-accent/30 transition-all duration-350 hover:-translate-y-1.5 group flex flex-col text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-accent/10">
                {feature.icon}
              </div>
              <h3 className="text-lg font-extrabold mb-3 tracking-wide group-hover:text-accent transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
