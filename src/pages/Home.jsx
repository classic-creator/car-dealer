import React from 'react';
import { motion } from 'framer-motion';

// Premium Redesigned and New Section Components
import Hero from '../components/sections/Hero';
import UpcomingCars from '../components/sections/UpcomingCars';
import FeaturedInventory from '../components/sections/FeaturedInventory';
import BrowseByBrand from '../components/sections/BrowseByBrand';
import BrowseByBodyType from '../components/sections/BrowseByBodyType';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import EmiCalculator from '../components/sections/EmiCalculator';
import LatestArrivals from '../components/sections/LatestArrivals';
import Testimonials from '../components/sections/Testimonials';
import BuyingProcess from '../components/sections/BuyingProcess';
import SellYourCar from '../components/sections/SellYourCar';
import StatsSection from '../components/sections/StatsSection';
import LatestBlogs from '../components/sections/LatestBlogs';
import FaqSection from '../components/sections/FaqSection';
import ContactSection from '../components/sections/ContactSection';
import FinalCTA from '../components/sections/FinalCTA';

const Home = () => {
  // Page reveal variants
  const pageReveal = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageReveal}
      className="flex flex-col min-h-screen bg-surface-dark overflow-hidden font-sans"
    >
      {/* 1. Premium Hero Section */}
      <Hero />

      {/* Upcoming Cars Showcase (Screenshot Style) */}
      <UpcomingCars />

      {/* 3. Featured Inventory */}
      <FeaturedInventory />

      {/* 4. Browse by Brand */}
      <BrowseByBrand />

      {/* 5. Browse by Body Type */}
      <BrowseByBodyType />

      {/* 6. Why Choose Us */}
      <WhyChooseUs />

      {/* 7. Financing & EMI Calculator */}
      <EmiCalculator />

      {/* 8. Latest Arrivals */}
      <LatestArrivals />

      {/* 12. Dealership Statistics */}
      <StatsSection />

      {/* 10. Vehicle Buying Process */}
      <BuyingProcess />

      {/* 11. Sell Your Car */}
      <SellYourCar />

      {/* 9. Customer Testimonials */}
      <Testimonials />

      {/* 13. Latest Blog Articles */}
      <LatestBlogs />

      {/* 14. FAQ Section */}
      <FaqSection />

      {/* 15. Contact Section */}
      <div id="contact-us">
        <ContactSection />
      </div>

      {/* 16. Final Call-to-Action */}
      <FinalCTA />
      
    </motion.div>
  );
};

export default Home;
