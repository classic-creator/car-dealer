import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, CheckCircle, Target } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Cars in Stock' },
    { number: '99%', label: 'Approval Rate' }
  ];

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Hero */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1562626888-29219e4a3d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Showroom" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Driven by Excellence</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Redefining the premium automotive experience with transparency, quality, and unmatched service.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2010, AutoElite began with a simple mission: to take the stress and uncertainty out of buying a premium pre-owned vehicle. 
              We believe that luxury isn't just about the car you drive—it's about how you're treated during the journey to get it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every vehicle in our showroom has been meticulously selected, inspected, and perfected by our master technicians. We don't just sell cars; we curate automotive experiences for those who demand the very best.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cars" className="rounded-2xl h-64 object-cover w-full" />
            <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Detailing" className="rounded-2xl h-64 object-cover w-full mt-8" />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <CheckCircle className="w-12 h-12 text-accent" />, title: 'Radical Transparency', desc: 'No hidden fees, no surprises. Just honest pricing and open communication.' },
              { icon: <Trophy className="w-12 h-12 text-accent" />, title: 'Uncompromising Quality', desc: 'If it doesn\'t pass our 150-point inspection, it doesn\'t make it to our floor.' },
              { icon: <Users className="w-12 h-12 text-accent" />, title: 'Client First', desc: 'Your satisfaction is our ultimate metric of success. We build relationships, not just sales.' }
            ].map((val, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="mb-6">{val.icon}</div>
                <h3 className="text-xl font-bold mb-4">{val.title}</h3>
                <p className="text-gray-400">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
