import axiosInstance from './axiosInstance';
import { mockCars, mockBrands } from '../utils/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const carService = {
  // Fetch all cars (using mock data for now)
  getAllCars: async (filters = {}) => {
    // In a real app: return axiosInstance.get('/cars', { params: filters });
    await delay(800);
    let filteredCars = [...mockCars];
    
    // Simple mock filtering
    if (filters.make) {
      filteredCars = filteredCars.filter(car => car.make.toLowerCase() === filters.make.toLowerCase());
    }
    
    return { data: filteredCars };
  },

  // Fetch single car by ID
  getCarById: async (id) => {
    // In a real app: return axiosInstance.get(`/cars/${id}`);
    await delay(500);
    const car = mockCars.find(c => c.id === id);
    if (!car) throw new Error('Car not found');
    return { data: car };
  },

  // Fetch featured cars
  getFeaturedCars: async () => {
    // In a real app: return axiosInstance.get('/cars/featured');
    await delay(600);
    return { data: mockCars.slice(0, 4) }; // Return first 4 as featured
  },

  // Fetch brands
  getBrands: async () => {
    // In a real app: return axiosInstance.get('/brands');
    await delay(400);
    return { data: mockBrands };
  }
};

export default carService;
