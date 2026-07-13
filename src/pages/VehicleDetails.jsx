import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarDetails, clearCarDetails } from '../redux/slices/carsSlice';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, Calendar, Gauge, Fuel, Settings, ShieldCheck, MapPin, Share2, Heart, RotateCcw } from 'lucide-react';

const VehicleDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { carDetails: car, detailsStatus } = useSelector(state => state.cars);
  
  // State for EMI Calc
  const [downPayment, setDownPayment] = useState(10); // Percentage
  const [loanTerm, setLoanTerm] = useState(60); // Months
  const interestRate = 5.9; // Fixed APR
  const [emi, setEmi] = useState(0);

  // State for gallery view
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or '360'
  const [rotationIndex, setRotationIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCarDetails(id));
    return () => {
      dispatch(clearCarDetails());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (car) {
      const principal = car.price - (car.price * (downPayment / 100));
      const monthlyInterest = (interestRate / 100) / 12;
      const calculatedEmi = (principal * monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm)) / (Math.pow(1 + monthlyInterest, loanTerm) - 1);
      setEmi(Math.round(calculatedEmi));
    }
  }, [car, downPayment, loanTerm]);

  if (detailsStatus === 'loading' || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface-dark min-h-screen pb-24">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 py-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/buy" className="flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors">
            <ChevronLeft size={20} className="mr-1" /> Back to Inventory
          </Link>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <Heart size={16} /> Save to Wishlist
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Images & Specs */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header (Mobile) */}
            <div className="lg:hidden">
              <h1 className="text-3xl font-bold text-primary mb-2">{car.make} {car.model}</h1>
              <p className="text-gray-500 mb-4">{car.description}</p>
              <div className="text-3xl font-bold text-accent mb-6">₹{car.price.toLocaleString('en-IN')}</div>
            </div>

            {/* Image Gallery / 360 Viewer */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-2">
              <div className="flex justify-center gap-4 mb-2 p-2">
                <button 
                  onClick={() => setViewMode('gallery')}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${viewMode === 'gallery' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Gallery
                </button>
                <button 
                  onClick={() => setViewMode('360')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${viewMode === '360' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <RotateCcw size={16} /> 360° View
                </button>
              </div>

              {viewMode === 'gallery' ? (
                <>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                    <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                    {car.certified && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-lg">
                        <ShieldCheck size={18} /> CERTIFIED
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {car.images?.map((img, idx) => (
                      <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 flex flex-col items-center justify-center">
                  {/* Simulated 360 Viewer */}
                  <img 
                    src={car.images?.[rotationIndex % (car.images?.length || 1)] || car.image} 
                    alt="360 View" 
                    className="w-full h-full object-cover select-none" 
                  />
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                    <input 
                      type="range" 
                      min="0" 
                      max="36" 
                      value={rotationIndex}
                      onChange={(e) => setRotationIndex(parseInt(e.target.value))}
                      className="w-48 accent-accent"
                    />
                    <div className="text-center text-xs font-bold text-gray-500 mt-1 flex justify-center items-center gap-1">
                      <RotateCcw size={12}/> Drag to rotate
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Vehicle Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar size={18} /> <span className="text-sm font-medium">Year</span>
                  </div>
                  <span className="font-semibold text-lg">{car.year}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Gauge size={18} /> <span className="text-sm font-medium">Mileage</span>
                  </div>
                  <span className="font-semibold text-lg">{car.mileage.toLocaleString()} mi</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Fuel size={18} /> <span className="text-sm font-medium">Fuel Type</span>
                  </div>
                  <span className="font-semibold text-lg">{car.fuelType}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Settings size={18} /> <span className="text-sm font-medium">Transmission</span>
                  </div>
                  <span className="font-semibold text-lg">{car.transmission}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-150/60 p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Premium Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(Array.isArray(car.features) 
                  ? car.features 
                  : Object.values(car.features || {}).flat()
                ).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-blue-50 p-1.5 rounded-full text-accent">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & CTAs */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              {/* Pricing Card */}
              <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-8">
                <div className="hidden lg:block mb-6">
                  <h1 className="text-3xl font-bold text-primary mb-2">{car.make} {car.model}</h1>
                  <p className="text-gray-500">{car.description}</p>
                </div>
                
                <div className="text-4xl font-bold text-primary mb-2">₹{car.price.toLocaleString('en-IN')}</div>
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-8">
                  <MapPin size={16} /> Location: {car.location}
                </p>

                <div className="flex flex-col gap-3">
                  <button className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg">
                    Book Test Drive
                  </button>
                  <button className="w-full bg-gray-50 hover:bg-gray-100 text-primary py-4 rounded-xl font-bold text-lg transition-all border border-gray-200">
                    Contact Dealer
                  </button>
                </div>
              </div>

              {/* Interactive EMI Calculator */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="font-bold text-primary mb-6 text-xl">Finance Calculator</h3>
                
                <div className="mb-6 bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-sm text-gray-500 font-bold mb-1">Estimated Monthly Payment</div>
                  <div className="text-4xl font-black text-accent">
                    ₹{emi.toLocaleString('en-IN')}<span className="text-base text-gray-500 font-normal"> /mo</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold text-gray-700">Down Payment ({downPayment}%)</label>
                      <span className="text-sm font-bold text-primary">₹{((car.price * downPayment) / 100).toLocaleString('en-IN')}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="50" step="5"
                      value={downPayment}
                      onChange={(e) => setDownPayment(parseInt(e.target.value))}
                      className="w-full accent-accent"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-bold text-gray-700">Loan Term</label>
                      <span className="text-sm font-bold text-primary">{loanTerm} Months</span>
                    </div>
                    <div className="flex gap-2">
                      {[36, 48, 60, 72].map(term => (
                        <button 
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${loanTerm === term ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          {term}m
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-500">Interest Rate (APR)</span>
                    <span className="font-bold text-gray-900">{interestRate}%</span>
                  </div>
                  
                  <button className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-bold transition-colors">
                    Apply for Financing
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-40 pb-safe">
        <button className="flex-1 bg-accent text-white py-3.5 rounded-xl font-bold shadow-md">
          Book Drive
        </button>
        <button className="flex-1 bg-[#25D366] text-white py-3.5 rounded-xl font-bold shadow-md">
          WhatsApp
        </button>
      </div>
    </div>
  );
};

export default VehicleDetails;
