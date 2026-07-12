import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp = null;
          const endVal = parseInt(value.replace(/[^0-9]/g, ""), 10);
          const duration = 2000; // 2 seconds animation

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuad easing
            const easeProgress = progress * (2 - progress);
            
            setCount(Math.floor(easeProgress * endVal));

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(endVal);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [value, hasAnimated]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
};

const StatsSection = () => {
  const statsList = [
    { value: '15000', suffix: '+', label: 'Cars Sold' },
    { value: '12000', suffix: '+', label: 'Happy Customers' },
    { value: '15', suffix: '+', label: 'Years of Experience' },
    { value: '10', suffix: '+', label: 'Partner Banks' },
    { value: '500', suffix: '+', label: 'Certified Vehicles' },
    { value: '99', suffix: '%', label: 'Satisfaction Rate' }
  ];

  return (
    <section className="py-20 bg-primary text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,32,32,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {statsList.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="space-y-2 border-r border-white/5 last:border-0"
            >
              <div className="text-4xl md:text-5xl font-black tracking-tight text-accent">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
