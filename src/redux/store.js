import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './slices/carsSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    ui: uiReducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
