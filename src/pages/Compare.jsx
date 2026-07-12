import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Check, X, ArrowLeftRight, ChevronDown } from 'lucide-react';
import { fetchCars } from '../redux/slices/carsSlice';

const Compare = () => {
  const { cars: items = [], status } = useSelector(state => state.cars);
  const dispatch = useDispatch();

  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);
  
  useEffect(() => {
    if (items.length > 0 && compareList.length === 0) {
      // Avoid adding undefined items
      const initial = [];
      if (items[0]) initial.push(items[0]);
      if (items[1]) initial.push(items[1]);
      setCompareList(initial);
    }
  }, [items]);

  const removeCar = (id) => {
    setCompareList(compareList.filter(car => car && car.id !== id));
  };

  const addCarToCompare = (e) => {
    const selectedId = e.target.value;
    const carToAdd = items.find(car => car.id.toString() === selectedId.toString());
    if (carToAdd && compareList.length < 3 && !compareList.find(c => c.id === carToAdd.id)) {
      setCompareList([...compareList, carToAdd]);
    }
    e.target.value = ""; // reset select
  };

  const featuresList = [
    'Bluetooth', 'Navigation', 'Backup Camera', 'Sunroof', 'Leather Seats', 
    'Heated Seats', 'Apple CarPlay', 'Android Auto', 'Keyless Entry'
  ];

  return (
    <div className="bg-surface-dark min-h-screen pb-24 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
            <ArrowLeftRight className="text-accent" size={32} /> Compare Vehicles
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Compare up to 3 vehicles side-by-side to find the perfect fit.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="w-1/4 p-6 bg-gray-50 border-r border-b border-gray-100 font-bold text-gray-500 text-sm tracking-wider uppercase align-bottom">
                  Vehicle Details
                </th>
                
                {compareList.map((car, index) => (
                  <th key={car.id} className="w-1/4 p-6 border-r border-b border-gray-100 relative">
                    <button 
                      onClick={() => removeCar(car.id)}
                      className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X size={16} />
                    </button>
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4">
                      <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{car.year} {car.name}</h3>
                    <p className="text-2xl font-black text-accent mt-2">${car.price.toLocaleString()}</p>
                    <Link to={`/car/${car.id}`} className="block w-full text-center mt-4 bg-gray-900 hover:bg-black text-white py-2 rounded-lg font-bold transition-colors">
                      View Details
                    </Link>
                  </th>
                ))}

                {compareList.length < 3 && (
                  <th className="w-1/4 p-6 border-b border-gray-100 align-middle">
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm mb-4">
                        <ArrowLeftRight size={20} />
                      </div>
                      <h4 className="font-bold text-gray-700 mb-2">Add Vehicle</h4>
                      <select onChange={addCarToCompare} className="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none">
                        <option value="">Select a vehicle...</option>
                        {items.filter(i => !compareList.find(c => c.id === i.id)).map(item => (
                          <option key={item.id} value={item.id}>{item.year} {item.name}</option>
                        ))}
                      </select>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 bg-gray-50 border-r border-b border-gray-100 font-bold text-gray-700">Mileage</td>
                {compareList.map(car => (
                  <td key={car.id} className="p-4 border-r border-b border-gray-100 font-medium text-gray-600">{car.mileage.toLocaleString()} mi</td>
                ))}
                {compareList.length < 3 && <td className="border-b border-gray-100 bg-gray-50/50"></td>}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 border-r border-b border-gray-100 font-bold text-gray-700">Fuel Type</td>
                {compareList.map(car => (
                  <td key={car.id} className="p-4 border-r border-b border-gray-100 font-medium text-gray-600">{car.fuelType || 'Petrol'}</td>
                ))}
                {compareList.length < 3 && <td className="border-b border-gray-100 bg-gray-50/50"></td>}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 border-r border-b border-gray-100 font-bold text-gray-700">Transmission</td>
                {compareList.map(car => (
                  <td key={car.id} className="p-4 border-r border-b border-gray-100 font-medium text-gray-600">{car.transmission || 'Automatic'}</td>
                ))}
                {compareList.length < 3 && <td className="border-b border-gray-100 bg-gray-50/50"></td>}
              </tr>

              {/* Features section */}
              <tr>
                <td colSpan={4} className="p-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs">
                  Premium Features
                </td>
              </tr>
              {featuresList.map((feature, idx) => (
                <tr key={idx}>
                  <td className="p-4 bg-gray-50 border-r border-b border-gray-100 font-bold text-gray-700">{feature}</td>
                  {compareList.map(car => {
                    const hasFeature = Math.random() > 0.4; // Mocking feature presence for demo
                    return (
                      <td key={car.id} className="p-4 border-r border-b border-gray-100 text-center">
                        {hasFeature ? (
                          <div className="inline-flex bg-green-100 text-green-600 p-1.5 rounded-full"><Check size={16} strokeWidth={3} /></div>
                        ) : (
                          <div className="inline-flex text-gray-300"><X size={16} strokeWidth={3} /></div>
                        )}
                      </td>
                    );
                  })}
                  {compareList.length < 3 && <td className="border-b border-gray-100 bg-gray-50/50"></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Compare;
