import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Fuel, Gauge, Heart, GitCompare, Calendar } from 'lucide-react';

const VehicleCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition-all duration-300 group border border-gray-100 flex flex-col h-full relative">
      
      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {car.certified && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            CERTIFIED
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-white/90 backdrop-blur text-gray-700 p-2 rounded-full hover:text-red-500 hover:bg-white shadow-sm transition-all" title="Add to favorites">
          <Heart size={18} />
        </button>
        <button className="bg-white/90 backdrop-blur text-gray-700 p-2 rounded-full hover:text-accent hover:bg-white shadow-sm transition-all" title="Compare">
          <GitCompare size={18} />
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-gray-500">{car.description}</p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-gray-400" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge size={16} className="text-gray-400" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel size={16} className="text-gray-400" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-gray-400" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="font-bold text-2xl text-primary">
            ₹{car.price.toLocaleString('en-IN')}
          </div>
          <Link 
            to={`/car/${car.id}`}
            className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
