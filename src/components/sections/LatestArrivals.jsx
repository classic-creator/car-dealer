import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/slices/carsSlice';
import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, ChevronLeft, ChevronRight, MessageCircle, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const LatestArrivals = () => {
  const dispatch = useDispatch();
  const { cars, status } = useSelector((state) => state.cars);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  // Get recently added cars (sorting by addedDate or using first few cars in list)
  const sortedCars = [...cars]
    .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    .slice(0, 6);

  return (
    <section className="py-24 bg-surface-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">New Additions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
              Latest Arrivals
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mt-3 font-medium">
              Browse our freshly sourced, handpicked vehicles added to our collection this week.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-3">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:border-accent hover:text-accent text-primary flex items-center justify-center transition-all shadow-sm cursor-pointer"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-xl bg-white border border-gray-200 hover:border-accent hover:text-accent text-primary flex items-center justify-center transition-all shadow-sm cursor-pointer"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        {status === 'loading' ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="min-w-[320px] bg-white rounded-3xl p-4 border border-gray-100 flex flex-col gap-4 animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-10 bg-gray-200 rounded-xl mt-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div 
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sortedCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="min-w-[320px] max-w-[320px] snap-start bg-white rounded-3xl overflow-hidden border border-gray-100/80 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-350 hover:-translate-y-1.5 flex flex-col group"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 left-4 bg-accent text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-md animate-pulse">
                    New Arrival
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="mb-4">
                    <h3 className="text-lg font-extrabold text-primary line-clamp-1 group-hover:text-accent transition-colors">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-xs font-semibold text-gray-400 mt-0.5 tracking-wide uppercase">
                      {car.variant}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-3 mb-5 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                    <div className="flex flex-col items-center justify-center p-1.5 bg-gray-50 rounded-xl">
                      <Calendar size={12} className="text-gray-400 mb-1" />
                      <span>{car.year}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-1.5 bg-gray-50 rounded-xl">
                      <Gauge size={12} className="text-gray-400 mb-1" />
                      <span>{car.mileage ? Math.round(car.mileage/1000) + 'k km' : 'Low km'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-1.5 bg-gray-50 rounded-xl">
                      <Fuel size={12} className="text-gray-400 mb-1" />
                      <span>{car.fuelType}</span>
                    </div>
                  </div>

                  {/* Pricing / Details */}
                  <div className="mt-auto flex items-center justify-between gap-4">
                    <span className="text-xl font-black text-primary">
                      ₹{car.price ? car.price.toLocaleString('en-IN') : 'N/A'}
                    </span>
                    <Link 
                      to={`/car/${car.id}`}
                      className="px-4 py-2 bg-primary hover:bg-accent text-white text-xs font-extrabold rounded-xl transition-all shadow-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default LatestArrivals;
