import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VehicleCard from '../components/cards/VehicleCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchCars } from '../redux/slices/carsSlice';

const Wishlist = () => {
  const { cars: items = [], status } = useSelector(state => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);
  
  // Mock wishlist data (using first 3 cars from inventory for demo)
  const wishlistCars = items.slice(0, 3);

  return (
    <div className="bg-surface-dark min-h-screen pb-24 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
              <Heart className="text-accent" size={32} /> My Wishlist
            </h1>
            <p className="text-gray-500 mt-2 text-lg">You have saved {wishlistCars.length} vehicles.</p>
          </div>
          <Link to="/buy" className="text-accent font-bold hover:underline flex items-center gap-1">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>

        {wishlistCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCars.map(car => (
              <VehicleCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-gray-300" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Explore our inventory and save your favorite vehicles here.</p>
            <Link to="/buy" className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-xl font-bold transition-colors">
              Browse Vehicles
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;
