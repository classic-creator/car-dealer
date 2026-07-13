import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carsSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import reportsReducer from './slices/reportsSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    ui: uiReducer,
    auth: authReducer,
    reports: reportsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
