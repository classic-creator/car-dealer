import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../../redux/slices/carsSlice';
import { ArrowRight } from 'lucide-react';

const BrowseByBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const brands = [
    { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
    { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg' },
    { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Hyundai_logo_in_gray_color.svg' },
    { name: 'Tata', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
    { name: 'Mahindra', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Mahindra_Auto_logo.svg' },
    { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Kia-logo.svg' },
    { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
    { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
    { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
    { name: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Lexus_logo.svg' }
  ];

  const handleBrandClick = (brandName) => {
    dispatch(setFilters({ make: brandName }));
    navigate('/buy');
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Top Brands</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Browse by Brand
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mt-4 font-medium">
            Explore our curated fleet of prestigious models from the world's most renowned manufacturers.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {brands.map((brand, index) => (
            <motion.button
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center p-8 rounded-3xl border border-gray-100 hover:border-accent hover:shadow-[0_15px_30px_rgba(0,0,0,0.04)] transition-all bg-surface-dark hover:bg-white cursor-pointer"
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center relative transition-all duration-300 md:grayscale md:group-hover:grayscale-0 opacity-60 group-hover:opacity-100 scale-95 group-hover:scale-105">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="w-full h-full object-contain max-h-12" 
                />
              </div>
              <span className="font-bold text-sm text-primary tracking-wide group-hover:text-accent transition-colors flex items-center gap-1">
                {brand.name}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </span>
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrowseByBrand;
