import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Website Pages
import Home from './pages/Home';
import VehicleDetails from './pages/VehicleDetails';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Finance from './pages/Finance';
import About from './pages/About';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';

// Auth Pages
import Login from './pages/auth/Login';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import CarsList from './pages/admin/CarsList';
import AddCar from './pages/admin/AddCar';
import CarDetails from './pages/admin/CarDetails';
import LeadsPipeline from './pages/admin/LeadsPipeline';
import Customers from './pages/admin/Customers';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="car/:id" element={<VehicleDetails />} />
          <Route path="buy" element={<Buy />} />
          <Route path="sell" element={<Sell />} />
          <Route path="finance" element={<Finance />} />
          <Route path="about" element={<About />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="compare" element={<Compare />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<CarsList />} />
          <Route path="cars/add" element={<AddCar />} />
          <Route path="cars/edit/:id" element={<AddCar />} />
          <Route path="cars/:id" element={<CarDetails />} />
          <Route path="leads" element={<LeadsPipeline />} />
          <Route path="customers" element={<Customers />} />
          {/* Add more admin routes here in future phases */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
