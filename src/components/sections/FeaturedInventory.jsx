import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedCars } from '../../redux/slices/carsSlice';
import { Link } from 'react-router-dom';
import { 
  Heart, GitCompare, Calendar, Gauge, Fuel, MapPin, 
  ArrowRight, Phone, MessageCircle, Eye, X, Check, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeaturedInventory = () => {
  const dispatch = useDispatch();
  const { featuredCars, featuredStatus } = useSelector((state) => state.cars);
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  
  // Local state for interactive features
  const [wishlist, setWishlist] = useState({});
  const [compared, setCompared] = useState({});

  useEffect(() => {
    if (featuredStatus === 'idle') {
      dispatch(fetchFeaturedCars());
    }
  }, [featuredStatus, dispatch]);

  const toggleWishlist = (id) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompare = (id) => {
    setCompared(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 bg-surface-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Top Selections</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
              Featured Vehicles
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mt-3 font-medium">
              Handpicked premium vehicles that meet our rigorous standards for quality, safety, and performance.
            </p>
          </div>
          <Link 
            to="/buy" 
            className="group flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 hover:border-accent hover:text-accent font-bold rounded-xl shadow-sm hover:shadow-soft transition-all text-primary text-sm whitespace-nowrap self-start md:self-end"
          >
            <span>Browse Full Inventory</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {featuredStatus === 'loading' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 flex flex-col gap-4 animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="h-10 bg-gray-200 rounded-xl mt-4 w-full" />
              </div>
            ))}
          </div>
        ) : featuredCars.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-primary mb-2">No Featured Vehicles</h3>
            <p className="text-gray-500 mb-6 text-sm">We are currently updating our collections. Please check back later or search our main inventory.</p>
            <Link to="/buy" className="px-6 py-3 bg-accent text-white rounded-xl font-bold hover:bg-accent-hover transition-all text-sm">
              Browse Inventory
            </Link>
          </div>
        ) : (
          /* Grid of Premium Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col h-full relative group transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                  <span className="bg-emerald-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 uppercase tracking-wider">
                    <CheckCircle2 size={12} /> Certified
                  </span>
                  {car.featured && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wider">
                      Featured
                    </span>
                  )}
                </div>

                {/* Quick actions top-right */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => toggleWishlist(car.id)}
                    className={`p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all ${
                      wishlist[car.id] 
                        ? 'bg-red-550 border-red-550 text-white' 
                        : 'bg-white/80 border-gray-100 text-gray-700 hover:text-red-500 hover:bg-white'
                    }`}
                    title="Add to wishlist"
                  >
                    <Heart size={16} className={wishlist[car.id] ? 'fill-current' : ''} />
                  </button>
                  <button 
                    onClick={() => toggleCompare(car.id)}
                    className={`p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all ${
                      compared[car.id] 
                        ? 'bg-accent border-accent text-white' 
                        : 'bg-white/80 border-gray-100 text-gray-700 hover:text-accent hover:bg-white'
                    }`}
                    title="Compare vehicle"
                  >
                    <GitCompare size={16} />
                  </button>
                </div>

                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <img 
                    src={car.image} 
                    alt={`${car.make} ${car.model}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Quick View trigger on Image hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => setSelectedQuickView(car)}
                      className="px-4 py-2 bg-white text-primary text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xl hover:bg-accent hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-300"
                    >
                      <Eye size={14} /> Quick View
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-primary line-clamp-1 group-hover:text-accent transition-colors">
                      {car.make} {car.model}
                    </h3>
                    <p className="text-xs font-medium text-gray-400 mt-1 line-clamp-1 uppercase tracking-wide">
                      {car.variant}
                    </p>
                  </div>

                  {/* Highlights specs */}
                  <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-t border-b border-gray-100 py-4 mb-5 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge size={16} className="text-gray-400" />
                      <span>{car.mileage ? car.mileage.toLocaleString() + ' km' : 'Low km'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel size={16} className="text-gray-400" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="truncate">{car.location ? car.location.replace(' Branch', '') : 'Dealer'}</span>
                    </div>
                  </div>

                  {/* Actions / CTA */}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Price</span>
                      <span className="text-2xl font-black text-primary mt-1">
                        ${car.price ? car.price.toLocaleString() : 'N/A'}
                      </span>
                    </div>
                    <Link 
                      to={`/car/${car.id}`}
                      className="px-4 py-2.5 bg-primary hover:bg-accent text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>

                  {/* WhatsApp Direct CTA */}
                  <a 
                    href={`https://wa.me/18005550199?text=Hello,%20I'm%20interested%20in%20the%20${car.make}%20${car.model}%2520(ID:%2520${car.id})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full mt-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl transition-colors border border-emerald-100"
                  >
                    <MessageCircle size={14} className="fill-current" />
                    <span>Inquire via WhatsApp</span>
                  </a>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Quick View Modal Overlay */}
      <AnimatePresence>
        {selectedQuickView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedQuickView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-gray-100 flex flex-col md:flex-row text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedQuickView(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/50 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
              >
                <X size={16} />
              </button>

              {/* Left Side: Image */}
              <div className="w-full md:w-1/2 relative bg-gray-50 h-64 md:h-auto min-h-[300px]">
                <img 
                  src={selectedQuickView.image} 
                  alt={`${selectedQuickView.make} ${selectedQuickView.model}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-emerald-500 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                    Certified Pre-Owned
                  </span>
                  <h3 className="text-2xl font-black mt-2">
                    {selectedQuickView.make} {selectedQuickView.model}
                  </h3>
                  <p className="text-sm font-semibold text-gray-300 mt-1 uppercase">
                    {selectedQuickView.variant}
                  </p>
                </div>
              </div>

              {/* Right Side: Specs & CTAs */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-extrabold text-gray-400 uppercase tracking-widest">Specifications</span>
                    <span className="text-3xl font-black text-accent">${selectedQuickView.price.toLocaleString()}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm border-b border-gray-150 pb-6 mb-6">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">Year</span>
                      <span className="font-extrabold text-primary mt-0.5">{selectedQuickView.year}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">Mileage</span>
                      <span className="font-extrabold text-primary mt-0.5">{selectedQuickView.mileage.toLocaleString()} km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">Fuel Type</span>
                      <span className="font-extrabold text-primary mt-0.5">{selectedQuickView.fuelType}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-bold uppercase">Transmission</span>
                      <span className="font-extrabold text-primary mt-0.5">{selectedQuickView.transmission}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <span className="text-xs text-gray-400 font-bold uppercase">Location</span>
                      <span className="font-extrabold text-primary mt-0.5">{selectedQuickView.location}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 leading-relaxed font-medium mb-6">
                    {selectedQuickView.description}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    to={`/car/${selectedQuickView.id}`}
                    onClick={() => setSelectedQuickView(null)}
                    className="flex-1 py-3 bg-primary hover:bg-black text-white text-center text-sm font-bold rounded-xl transition-all shadow-md"
                  >
                    View Details
                  </Link>
                  <a 
                    href={`https://wa.me/18005550199?text=Hello,%20I'm%2520interested%2520in%2520the%2520${selectedQuickView.make}%252520${selectedQuickView.model}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white text-center text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/10"
                  >
                    <MessageCircle size={18} className="fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default FeaturedInventory;
