import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedCars } from '../../redux/slices/carsSlice';
import VehicleCard from '../cards/VehicleCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedCars = () => {
  const dispatch = useDispatch();
  const { featuredCars, featuredStatus } = useSelector((state) => state.cars);

  useEffect(() => {
    if (featuredStatus === 'idle') {
      dispatch(fetchFeaturedCars());
    }
  }, [featuredStatus, dispatch]);

  return (
    <section className="py-24 bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Vehicles</h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              Handpicked premium vehicles that meet our rigorous standards for quality and performance.
            </p>
          </div>
          <Link to="/inventory" className="hidden md:flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors group">
            View All Inventory 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featuredStatus === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-[400px] bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VehicleCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-10 md:hidden flex justify-center">
          <Link to="/inventory" className="flex items-center gap-2 text-accent font-semibold">
            View All Inventory <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
