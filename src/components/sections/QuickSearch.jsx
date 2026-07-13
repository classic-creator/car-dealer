import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../../redux/slices/carsSlice';
import { Search, ChevronDown, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';

const QuickSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <section className="relative z-35 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-accent/10 p-2.5 rounded-xl text-accent">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary">Quick Search</h2>
            <p className="text-xs text-gray-500 font-medium">Find your ideal luxury vehicle instantly</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* Brand/Make */}
          <div className="relative flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Brand</label>
            <div className="relative">
              <select
                value={make}
                onChange={(e) => { setMake(e.target.value); setModel(''); }}
                className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="">All Brands</option>
                {makes.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Model */}
          <div className="relative flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Model</label>
            <div className="relative">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
                className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">All Models</option>
                {make && modelsByMake[make]?.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Price Range */}
          <div className="relative flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Max Price</label>
            <div className="relative">
              <select
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="">Any Price</option>
                {prices.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Year */}
          <div className="relative flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Min Year</label>
            <div className="relative">
              <select
                value={yearMin}
                onChange={(e) => setYearMin(e.target.value)}
                className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="">Any Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}+</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Fuel Type */}
          <div className="relative flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Fuel Type</label>
            <div className="relative">
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="">Any Fuel</option>
                {fuels.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Transmission */}
          <div className="relative flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Transmission</label>
            <div className="relative">
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="">Any Gearbox</option>
                {transmissions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Body Type */}
          <div className="relative flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Body Type</label>
            <div className="relative">
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="w-full appearance-none bg-gray-50/50 hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold py-3.5 pl-4 pr-10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer"
              >
                <option value="">Any Body Type</option>
                {bodyTypes.map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-sm font-bold tracking-wide rounded-xl shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH VEHICLES</span>
            </motion.button>
          </div>

        </form>
      </motion.div>
    </section>
  );
};

export default QuickSearch;
