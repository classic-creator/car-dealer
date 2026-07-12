import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LayoutDashboard, Car, Users, PhoneCall, BarChart, Settings, LogOut, Menu } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const AdminLayout = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on path change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated) {
    // Uncomment when auth is strictly enforced
    // return <Navigate to="/auth/login" replace />;
  }

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { title: 'Inventory', icon: <Car size={20} />, path: '/admin/cars' },
    { title: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
    { title: 'Leads', icon: <PhoneCall size={20} />, path: '/admin/leads' },
    { title: 'Reports', icon: <BarChart size={20} />, path: '/admin/reports' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:flex`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200 justify-between">
          <Link to="/admin" className="text-xl font-black text-accent tracking-tighter">AUTO<span className="text-primary">ELITE</span> ADMIN</Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/admin')
                    ? 'bg-accent/10 text-accent'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => dispatch(logout())}
            className="flex items-center gap-3 px-3 py-2.5 w-full text-left rounded-lg font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
              {menuItems.find(item => location.pathname.startsWith(item.path) && (item.path !== '/admin' || location.pathname === '/admin'))?.title || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block text-sm">
              <p className="font-bold text-gray-900 leading-none mb-1">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500 leading-none">{user?.role || 'Super Admin'}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
