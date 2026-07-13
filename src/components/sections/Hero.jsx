import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../../redux/slices/carsSlice';
import { Star, ArrowRight, ArrowUpRight, Search, ChevronDown, Sliders } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Premium background image representing luxury and performance
  const bgImage = "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=1200"; // Dark premium Mercedes/Porsche background

  // Stats for the hero section
  const stats = [
    { value: '15K+', label: 'Premium Cars Sold' },
    { value: '4.9★', label: 'Customer Reviews' },
    { value: '99%', label: 'Satisfaction Rate' }
  ];

  // Search Fields State
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [yearMin, setYearMin] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [bodyType, setBodyType] = useState('');

  // Dropdown Options
  const makes = ['Toyota', 'Honda', 'Hyundai', 'Tata', 'Mahindra', 'Kia', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche', 'Tesla'];
  const modelsByMake = {
    Toyota: ['Fortuner', 'Hyryder', 'Glanza', 'Camry', 'Land Cruiser'],
    Honda: ['City', 'Civic', 'Accord', 'CR-V'],
    Hyundai: ['Creta', 'Verna', 'Tucson', 'Ioniq 5'],
    Tata: ['Harrier', 'Safari', 'Nexon', 'Punch EV'],
    Mahindra: ['XUV700', 'Scorpio-N', 'Thar'],
    Kia: ['Seltos', 'Sonet', 'EV6'],
    BMW: ['3 Series', '5 Series', 'X5', 'i7'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE', 'EQS'],
    Audi: ['A4', 'A6', 'Q5', 'e-tron'],
    Lexus: ['ES', 'RX', 'LC500'],
    Porsche: ['911', 'Cayenne', 'Taycan'],
    Tesla: ['Model 3', 'Model Y', 'Model S']
  };

  const prices = [
    { label: 'Under ₹15 Lakhs', value: '1500000' },
    { label: 'Under ₹20 Lakhs', value: '2000000' },
    { label: 'Under ₹25 Lakhs', value: '2500000' },
    { label: 'Under ₹30 Lakhs', value: '3000000' },
    { label: 'Under ₹45 Lakhs', value: '4500000' }
  ];

  const years = ['2019', '2020', '2021', '2022', '2023', '2024'];
  const fuels = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Automatic', 'Manual'];
  const bodyTypes = ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible', 'Pickup', 'Luxury', 'Electric'];

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({
      make,
      model,
      priceMax,
      yearMin,
      fuelType,
      transmission,
      bodyType
    }));
    navigate('/buy');
  };

  return (
    <div className="relative min-h-[92vh] flex items-center overflow-hidden bg-primary text-white pt-16 lg:pt-20">
      {/* Background Cover Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10" />
        <motion.img 
          initial={{ scale: 1.1, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 0.65 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={bgImage} 
          alt="Premium background" 
          className="w-full h-full object-cover object-right"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Star className="w-4 h-4 text-accent fill-accent animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                The Luxury Automotive Experience
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
                UNLEASH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-150 to-gray-400">
                  PURE ELEGANCE
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-xl font-medium leading-relaxed">
                Explore an curated collection of world-class certified pre-owned vehicles. Unmatched luxury, fully inspected, and tailored to perfection.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button 
                onClick={() => navigate('/buy')}
                className="group relative px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-3 overflow-hidden"
              >
                <span>Browse Inventory</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/sell')}
                className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-white/20 font-bold rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <span>Sell Your Car</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Trust Badges & Statistics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-white/10 flex flex-wrap gap-8 items-center"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-black tracking-tight text-white">{stat.value}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Hero Right Column: Integrated Quick Search Form */}
          <div className="lg:col-span-5 w-full relative">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/20 blur-[120px] z-0 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/[0.08] backdrop-blur-xl rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/15 p-6 md:p-8 text-white relative z-10 text-left w-full"
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div className="bg-accent/15 p-2 rounded-xl text-accent">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white tracking-tight">Quick Search</h3>
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-wider">Find your ideal car instantly</p>
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                
                {/* Brand & Model */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/50">Brand</label>
                    <div className="relative">
                      <select
                        value={make}
                        onChange={(e) => { setMake(e.target.value); setModel(''); }}
                        className="w-full appearance-none bg-white/5 border border-white/10 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 backdrop-blur-md"
                      >
                        <option value="" className="bg-[#0f172a] text-white">All Brands</option>
                        {makes.map((m) => (
                          <option key={m} value={m} className="bg-[#0f172a] text-white">{m}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/50">Model</label>
                    <div className="relative">
                      <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        disabled={!make}
                        className="w-full appearance-none bg-white/5 border border-white/10 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 backdrop-blur-md disabled:opacity-45 disabled:cursor-not-allowed"
                      >
                        <option value="" className="bg-[#0f172a] text-white">All Models</option>
                        {make && modelsByMake[make]?.map((m) => (
                          <option key={m} value={m} className="bg-[#0f172a] text-white">{m}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Price & Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/50">Max Price</label>
                    <div className="relative">
                      <select
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 backdrop-blur-md"
                      >
                        <option value="" className="bg-[#0f172a] text-white">Any Price</option>
                        {prices.map((p) => (
                          <option key={p.value} value={p.value} className="bg-[#0f172a] text-white">{p.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/50">Min Year</label>
                    <div className="relative">
                      <select
                        value={yearMin}
                        onChange={(e) => setYearMin(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 backdrop-blur-md"
                      >
                        <option value="" className="bg-[#0f172a] text-white">Any Year</option>
                        {years.map((y) => (
                          <option key={y} value={y} className="bg-[#0f172a] text-white">{y}+</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Fuel & Transmission */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/50">Fuel Type</label>
                    <div className="relative">
                      <select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 backdrop-blur-md"
                      >
                        <option value="" className="bg-[#0f172a] text-white">Any Fuel</option>
                        {fuels.map((f) => (
                          <option key={f} value={f} className="bg-[#0f172a] text-white">{f}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/50">Transmission</label>
                    <div className="relative">
                      <select
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className="w-full appearance-none bg-white/5 border border-white/10 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 backdrop-blur-md"
                      >
                        <option value="" className="bg-[#0f172a] text-white">Any Gearbox</option>
                        {transmissions.map((t) => (
                          <option key={t} value={t} className="bg-[#0f172a] text-white">{t}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Body Type */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/50">Body Type</label>
                  <div className="relative">
                    <select
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                      className="w-full appearance-none bg-white/5 border border-white/10 text-xs font-bold py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer text-white hover:bg-white/10 focus:bg-white/10 backdrop-blur-md"
                    >
                      <option value="" className="bg-[#0f172a] text-white">Any Body Type</option>
                      {bodyTypes.map((bt) => (
                        <option key={bt} value={bt} className="bg-[#0f172a] text-white">{bt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/50 pointer-events-none" />
                  </div>
                </div>

                {/* Search button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-black tracking-widest rounded-xl shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Inventory</span>
                  </motion.button>
                </div>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
