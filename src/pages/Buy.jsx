import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../redux/slices/carsSlice';
import VehicleCard from '../components/cards/VehicleCard';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const Buy = () => {
  const dispatch = useDispatch();
  const { cars, status } = useSelector(state => state.cars);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);

  return (
    <div className="bg-surface-dark min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-primary">Browse Inventory</h1>
            <p className="text-gray-500">Find the perfect car for you from our premium selection.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium"
            >
              <Filter size={18} /> Filters
            </button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="bg-transparent text-sm font-medium outline-none">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Mileage: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 font-bold text-lg border-b pb-4 mb-6">
                <SlidersHorizontal size={20} /> Advanced Filters
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Make</h3>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3 text-sm">
                    <option>All Makes</option>
                    <option>Tesla</option>
                    <option>BMW</option>
                    <option>Porsche</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Body Type</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {['Sedan', 'SUV', 'Coupe', 'Truck'].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-accent focus:ring-accent" />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <input type="range" className="w-full accent-accent" min="0" max="10000000" step="100000" />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹0</span>
                    <span>₹1 Cr+</span>
                  </div>
                </div>

                <button className="w-full bg-accent text-white py-3 rounded-xl font-bold mt-4 hover:bg-accent-hover transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="lg:w-3/4">
            {status === 'loading' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-[400px] bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car, i) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <VehicleCard car={car} />
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Load More Mock */}
            <div className="mt-12 text-center">
              <button className="bg-white border border-gray-200 hover:border-accent text-primary px-8 py-3 rounded-full font-bold shadow-sm transition-all hover:shadow-md">
                Load More Vehicles
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Buy;
