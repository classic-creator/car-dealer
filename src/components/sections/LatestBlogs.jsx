import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const articles = [
  {
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=600', // Luxury car front view
    category: 'Buying Guides',
    date: 'July 10, 2026',
    readTime: '5 min read',
    title: 'The Secrets of Selecting Certified Pre-Owned Luxury Cars',
    desc: 'Learn what to look for in inspection logs, warranty options, and history check-lists before purchasing a premium vehicle.'
  },
  {
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600', // Sports car side view
    category: 'Future Mobility',
    date: 'June 28, 2026',
    readTime: '8 min read',
    title: 'Electric vs Hybrid: Which Premium Drivetrain Fits You?',
    desc: 'An in-depth review comparing battery range, performance curves, charger networks, and depreciation between EV and PHEV systems.'
  },
  {
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=600', // Classic car steering wheel/dash
    category: 'Vehicle Care',
    date: 'June 15, 2026',
    readTime: '4 min read',
    title: 'Maintenance Routines to Keep Your Vehicle in Showroom Condition',
    desc: 'Simple preventive checks, premium detailing rules, and servicing advice to protect the resale value of your luxury sedan or SUV.'
  }
];

const LatestBlogs = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">News & Insights</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Latest Automotive Articles
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mt-4 font-medium">
            Stay up to date with the latest trends, expert buying advice, and luxury care tips.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-surface-dark rounded-3xl overflow-hidden border border-gray-150/60 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-350 flex flex-col h-full group text-left"
            >
              
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                  {item.category}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex gap-4 items-center text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {item.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-primary mb-3 group-hover:text-accent transition-colors leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed font-semibold mb-6 flex-grow">
                  {item.desc}
                </p>

                {/* Action Link */}
                <a 
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary hover:text-accent transition-colors group-hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </a>

              </div>

            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestBlogs;
