import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import carService from '../../services/carService';

// Async Thunks
export const fetchCars = createAsyncThunk('cars/fetchCars', async (filters, { rejectWithValue }) => {
  try {
    const response = await carService.getAllCars(filters);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchFeaturedCars = createAsyncThunk('cars/fetchFeaturedCars', async (_, { rejectWithValue }) => {
  try {
    const response = await carService.getFeaturedCars();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchCarDetails = createAsyncThunk('cars/fetchCarDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await carService.getCarById(id);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const initialState = {
  cars: [],
  featuredCars: [],
  carDetails: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  featuredStatus: 'idle',
  detailsStatus: 'idle',
  error: null,
  filters: {
    search: '',
    make: '',
    model: '',
    yearMin: '',
    yearMax: '',
    priceMin: '',
    priceMax: '',
    mileageMin: '',
    mileageMax: '',
    fuelType: '',
    transmission: '',
    bodyType: '',
    color: '',
    status: '',
    featured: '',
  },
  savedFilters: [],
  sortKey: 'addedDate',
  sortOrder: 'desc',
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearCarDetails: (state) => {
      state.carDetails = null;
      state.detailsStatus = 'idle';
    },
    // Single operations
    addCar: (state, action) => {
      state.cars.unshift(action.payload);
    },
    updateCar: (state, action) => {
      const { id, carData } = action.payload;
      const index = state.cars.findIndex(c => c.id === id);
      if (index !== -1) {
        state.cars[index] = { ...state.cars[index], ...carData, id, lastUpdated: new Date().toISOString().split('T')[0] };
      }
    },
    deleteCar: (state, action) => {
      state.cars = state.cars.filter(c => c.id !== action.payload);
    },
    duplicateCar: (state, action) => {
      const carToDuplicate = state.cars.find(c => c.id === action.payload);
      if (carToDuplicate) {
        const duplicated = {
          ...carToDuplicate,
          id: `C-${Math.floor(1000 + Math.random() * 9000)}`,
          registrationNumber: '',
          vin: '',
          status: 'Draft',
          addedDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0],
          activityLog: [{ date: new Date().toISOString(), user: 'Admin User', action: 'Duplicated vehicle' }]
        };
        state.cars.unshift(duplicated);
      }
    },
    toggleFeatured: (state, action) => {
      const car = state.cars.find(c => c.id === action.payload);
      if (car) {
        car.featured = !car.featured;
      }
    },
    changeCarStatus: (state, action) => {
      const { id, status } = action.payload;
      const car = state.cars.find(c => c.id === id);
      if (car) {
        car.status = status;
        if (status === 'Sold') {
          car.soldPrice = car.price;
        }
      }
    },
    markAsSold: (state, action) => {
      const { id, soldPrice, customerDetails } = action.payload;
      const car = state.cars.find(c => c.id === id);
      if (car) {
        car.status = 'Sold';
        car.soldPrice = parseFloat(soldPrice);
        car.customer = customerDetails;
      }
    },
    // Filter & Sort operations
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
    saveFilter: (state, action) => {
      state.savedFilters.push(action.payload);
    },
    deleteSavedFilter: (state, action) => {
      state.savedFilters = state.savedFilters.filter((_, idx) => idx !== action.payload);
    },
    setSort: (state, action) => {
      state.sortKey = action.payload.key;
      state.sortOrder = action.payload.order;
    },
    // Bulk operations
    bulkDelete: (state, action) => {
      const ids = action.payload;
      state.cars = state.cars.filter(c => !ids.includes(c.id));
    },
    bulkArchive: (state, action) => {
      const ids = action.payload;
      state.cars.forEach(c => {
        if (ids.includes(c.id)) {
          c.status = 'Archived';
        }
      });
    },
    bulkPublish: (state, action) => {
      const ids = action.payload;
      state.cars.forEach(c => {
        if (ids.includes(c.id)) {
          c.status = 'Available';
        }
      });
    },
    bulkChangeStatus: (state, action) => {
      const { ids, status } = action.payload;
      state.cars.forEach(c => {
        if (ids.includes(c.id)) {
          c.status = status;
        }
      });
    },
    bulkAssignBranch: (state, action) => {
      const { ids, branch } = action.payload;
      state.cars.forEach(c => {
        if (ids.includes(c.id)) {
          c.location = branch;
        }
      });
    },
    bulkToggleFeatured: (state, action) => {
      const { ids, featured } = action.payload;
      state.cars.forEach(c => {
        if (ids.includes(c.id)) {
          c.featured = featured;
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchFeaturedCars.pending, (state) => {
        state.featuredStatus = 'loading';
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.featuredStatus = 'succeeded';
        state.featuredCars = action.payload;
      })
      .addCase(fetchFeaturedCars.rejected, (state, action) => {
        state.featuredStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCarDetails.pending, (state) => {
        state.detailsStatus = 'loading';
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.carDetails = action.payload;
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.error = action.payload;
      });
  }
});

export const { 
  clearCarDetails, addCar, updateCar, deleteCar, duplicateCar, toggleFeatured, 
  changeCarStatus, markAsSold, setFilters, clearFilters, saveFilter, deleteSavedFilter, setSort,
  bulkDelete, bulkArchive, bulkPublish, bulkChangeStatus, bulkAssignBranch, bulkToggleFeatured
} = carsSlice.actions;

export default carsSlice.reducer;
