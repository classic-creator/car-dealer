import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, DollarSign, X,
  TrendingUp, BarChart2, CheckSquare, Square, ChevronDown, RefreshCw, 
  Settings, ArrowUpDown, ShieldCheck, Download, Archive, Globe, Award, Sparkles, FolderPlus, Save
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { 
  fetchCars, deleteCar, duplicateCar, toggleFeatured, changeCarStatus, markAsSold,
  setFilters, clearFilters, saveFilter, deleteSavedFilter, setSort,
  bulkDelete, bulkArchive, bulkPublish, bulkChangeStatus, bulkAssignBranch, bulkToggleFeatured
} from '../../redux/slices/carsSlice';

const CarsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { cars: items = [], status, filters, savedFilters, sortKey, sortOrder } = useSelector(state => state.cars);

  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'dashboard'
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  
  // Quick status update popover state
  const [activeStatusMenu, setActiveStatusMenu] = useState(null);

  // Modal State for Sold pricing
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [sellPrice, setSellPrice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Saved Filter Name State
  const [saveFilterName, setSaveFilterName] = useState('');
  const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);

  // Bulk operation handlers
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(item => item.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Filter application
  const filteredItems = items.filter(car => {
    const searchMatch = !searchTerm || 
      `${car.make} ${car.model} ${car.variant} ${car.vin} ${car.registrationNumber}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const makeMatch = !filters.make || car.make === filters.make;
    const modelMatch = !filters.model || car.model === filters.model;
    const yearMinMatch = !filters.yearMin || car.year >= parseInt(filters.yearMin);
    const yearMaxMatch = !filters.yearMax || car.year <= parseInt(filters.yearMax);
    const priceMinMatch = !filters.priceMin || car.price >= parseInt(filters.priceMin);
    const priceMaxMatch = !filters.priceMax || car.price <= parseInt(filters.priceMax);
    const mileageMinMatch = !filters.mileageMin || car.mileage >= parseInt(filters.mileageMin);
    const mileageMaxMatch = !filters.mileageMax || car.mileage <= parseInt(filters.mileageMax);
    const fuelMatch = !filters.fuelType || car.fuelType === filters.fuelType;
    const transmissionMatch = !filters.transmission || car.transmission === filters.transmission;
    const bodyMatch = !filters.bodyType || car.bodyType === filters.bodyType;
    const colorMatch = !filters.color || car.color.toLowerCase().includes(filters.color.toLowerCase());
    const statusMatch = !filters.status || car.status === filters.status;
    const featuredMatch = !filters.featured || car.featured === (filters.featured === 'true');

    return searchMatch && makeMatch && modelMatch && yearMinMatch && yearMaxMatch &&
           priceMinMatch && priceMaxMatch && mileageMinMatch && mileageMaxMatch &&
           fuelMatch && transmissionMatch && bodyMatch && colorMatch && statusMatch && featuredMatch;
  }).sort((a, b) => {
    let valA = a[sortKey];
    let valB = b[sortKey];
    
    if (sortKey === 'profit') {
      valA = a.sellingPrice - a.purchasePrice;
      valB = b.sellingPrice - b.purchasePrice;
    }

    if (typeof valA === 'string') {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  const handleOpenSellModal = (car) => {
    setSelectedCar(car);
    setSellPrice(car.price.toString());
    setIsSellModalOpen(true);
  };

  const handleMarkAsSold = (e) => {
    e.preventDefault();
    if (selectedCar && sellPrice) {
      dispatch(markAsSold({ 
        id: selectedCar.id, 
        soldPrice: sellPrice,
        customerDetails: { name: customerName, phone: customerPhone }
      }));
      setIsSellModalOpen(false);
      setSelectedCar(null);
      setSellPrice('');
      setCustomerName('');
      setCustomerPhone('');
    }
  };

  const handleSaveFilter = () => {
    if (saveFilterName) {
      dispatch(saveFilter({ name: saveFilterName, filters: { ...filters } }));
      setSaveFilterName('');
      setShowSaveFilterModal(false);
    }
  };

  const handleApplySavedFilter = (saved) => {
    dispatch(setFilters(saved.filters));
  };

  // CSV Export utility
  const exportToCSV = (records) => {
    const headers = ['ID', 'Vehicle', 'Reg No', 'VIN', 'Mileage', 'Fuel', 'Trans', 'Status', 'Purchase Price', 'Selling Price', 'Profit'];
    const rows = records.map(car => [
      car.id,
      `${car.year} ${car.make} ${car.model} ${car.variant}`,
      car.registrationNumber,
      car.vin,
      car.mileage,
      car.fuelType,
      car.transmission,
      car.status,
      car.purchasePrice,
      car.sellingPrice,
      car.sellingPrice - car.purchasePrice
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AUTOELITE_Inventory_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dashboard calculations
  const totalVehicles = items.length;
  const availableVehicles = items.filter(c => c.status === 'Available').length;
  const soldVehicles = items.filter(c => c.status === 'Sold').length;
  const reservedVehicles = items.filter(c => c.status === 'Reserved').length;
  const draftVehicles = items.filter(c => c.status === 'Draft').length;
  const featuredVehicles = items.filter(c => c.featured).length;

  const totalInventoryValue = items.filter(c => c.status === 'Available').reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = totalVehicles > 0 ? (items.reduce((acc, curr) => acc + curr.price, 0) / totalVehicles) : 0;
  
  // Sales & profit calculations
  const totalRevenue = items.filter(c => c.status === 'Sold').reduce((acc, curr) => acc + (curr.soldPrice || curr.price), 0);
  const totalProfit = items.filter(c => c.status === 'Sold').reduce((acc, curr) => acc + ((curr.soldPrice || curr.price) - curr.purchasePrice), 0);

  // brand data for Recharts
  const brandCounts = items.reduce((acc, curr) => {
    acc[curr.make] = (acc[curr.make] || 0) + 1;
    return acc;
  }, {});
  const brandChartData = Object.keys(brandCounts).map(key => ({ name: key, value: brandCounts[key] }));

  // bodyType data for Recharts
  const bodyCounts = items.reduce((acc, curr) => {
    acc[curr.bodyType || 'Other'] = (acc[curr.bodyType || 'Other'] || 0) + 1;
    return acc;
  }, {});
  const bodyChartData = Object.keys(bodyCounts).map(key => ({ name: key, value: bodyCounts[key] }));

  // status distribution data for Recharts
  const statusChartData = [
    { name: 'Available', value: availableVehicles },
    { name: 'Sold', value: soldVehicles },
    { name: 'Reserved', value: reservedVehicles },
    { name: 'Draft', value: draftVehicles },
  ];

  const COLORS = ['#e22020', '#111111', '#4f46e5', '#f59e0b', '#10b981', '#6b7280'];

  return (
    <div className="space-y-6">
      {/* Upper Navigation / Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Inventory Management</h2>
          <p className="text-sm text-gray-500">Add, edit, structure, filter, and track vehicles across branches.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Tab Selection */}
          <div className="bg-gray-100 p-1.5 rounded-xl border border-gray-200 flex">
            <button 
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Settings size={14} /> Inventory Table
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'dashboard' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <BarChart2 size={14} /> Analytics Board
            </button>
          </div>

          <Link 
            to="/admin/cars/add" 
            className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-accent/20 hover:scale-[1.02]"
          >
            <Plus size={18} /> Add Vehicle
          </Link>
        </div>
      </div>

      {/* Analytics Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Stat Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {[
              { label: 'Total Stock', val: totalVehicles, color: 'text-gray-900', bg: 'bg-white' },
              { label: 'Available', val: availableVehicles, color: 'text-green-600', bg: 'bg-white' },
              { label: 'Reserved', val: reservedVehicles, color: 'text-blue-600', bg: 'bg-white' },
              { label: 'Sold Out', val: soldVehicles, color: 'text-purple-600', bg: 'bg-white' },
              { label: 'Draft Mode', val: draftVehicles, color: 'text-yellow-600', bg: 'bg-white' },
              { label: 'Featured List', val: featuredVehicles, color: 'text-amber-600', bg: 'bg-white' },
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between`}>
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                <h3 className={`text-3xl font-black mt-2 ${stat.color}`}>{stat.val}</h3>
              </div>
            ))}
          </div>

          {/* Value analytics cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Available Value</span>
              <h3 className="text-2xl font-black text-gray-900 mt-2">${totalInventoryValue.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Average Price</span>
              <h3 className="text-2xl font-black text-gray-900 mt-2">${Math.round(averagePrice).toLocaleString()}</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Sales (Sold)</span>
              <h3 className="text-2xl font-black text-green-600 mt-2">${totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="bg-green-50 p-6 rounded-2xl border border-green-200 shadow-sm">
              <span className="text-green-700 text-xs font-bold uppercase tracking-wider">Total Profit Made</span>
              <h3 className="text-2xl font-black text-green-900 mt-2">${totalProfit.toLocaleString()}</h3>
            </div>
          </div>

          {/* Visualizations row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Brand analysis */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm col-span-1">
              <h4 className="font-bold text-gray-800 mb-4">Stock by Brand</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={brandChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fill: '#888', fontSize: 10}} />
                    <YAxis allowDecimals={false} tick={{fill: '#888', fontSize: 10}} />
                    <Tooltip cursor={{fill: '#f5f5f5'}} />
                    <Bar dataKey="value" fill="#e22020" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status distribution */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm col-span-1">
              <h4 className="font-bold text-gray-800 mb-4">Status Distribution</h4>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconSize={10} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Body Configuration Analysis */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm col-span-1">
              <h4 className="font-bold text-gray-800 mb-4">Stock by Body Type</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bodyChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" tick={{fill: '#555', fontSize: 11, fontWeight: 'bold'}} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#111111" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory List View Tab */}
      {activeTab === 'list' && (
        <div className="space-y-4 animate-in fade-in duration-355">
          
          {/* Main List Toolbar */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            
            {/* Search inputs & Filter trigger */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search brand, model, VIN, or RC..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-accent text-sm"
                />
              </div>
              <button 
                onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold transition-colors ${
                  showFilterDrawer ? 'bg-accent/10 border-accent text-accent' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter size={16} /> Extended Filters
              </button>
            </div>

            {/* Quick Sort / Export features */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
              {savedFilters.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-gray-400 uppercase">Presets:</span>
                  <div className="flex gap-1">
                    {savedFilters.map((saved, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleApplySavedFilter(saved)}
                        className="px-2.5 py-1 text-xs border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-md font-bold"
                      >
                        {saved.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => dispatch(clearFilters())}
                className="p-2.5 text-gray-400 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50"
                title="Reset Filters"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                onClick={() => exportToCSV(filteredItems)}
                className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                <Download size={16} /> CSV Export
              </button>
            </div>
          </div>

          {/* Collapsible Filter Panel */}
          {showFilterDrawer && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top-4 duration-200">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Make / Brand</label>
                <select 
                  value={filters.make}
                  onChange={(e) => dispatch(setFilters({ make: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none bg-white"
                >
                  <option value="">All Brands</option>
                  <option value="Tata">Tata</option>
                  <option value="Mahindra">Mahindra</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Kia">Kia</option>
                  <option value="Toyota">Toyota</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Model Name</label>
                <input 
                  type="text" 
                  value={filters.model}
                  onChange={(e) => dispatch(setFilters({ model: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
                  placeholder="e.g. Harrier"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Body Type</label>
                <select 
                  value={filters.bodyType}
                  onChange={(e) => dispatch(setFilters({ bodyType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none bg-white"
                >
                  <option value="">All Bodies</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Fuel Type</label>
                <select 
                  value={filters.fuelType}
                  onChange={(e) => dispatch(setFilters({ fuelType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none bg-white"
                >
                  <option value="">All Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Transmission</label>
                <select 
                  value={filters.transmission}
                  onChange={(e) => dispatch(setFilters({ transmission: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none bg-white"
                >
                  <option value="">All Transmissions</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Inventory Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none bg-white"
                >
                  <option value="">All Statuses</option>
                  <option value="Draft">Draft</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Price Range</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={filters.priceMin}
                    onChange={(e) => dispatch(setFilters({ priceMin: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
                  />
                  <span className="text-gray-400">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={filters.priceMax}
                    onChange={(e) => dispatch(setFilters({ priceMax: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex items-end gap-2">
                <button 
                  onClick={() => setShowSaveFilterModal(true)}
                  className="w-full py-2 bg-gray-50 border border-gray-300 hover:bg-gray-150 rounded-lg text-xs font-bold text-gray-700 flex items-center justify-center gap-1.5"
                >
                  <Save size={12} /> Save Preset
                </button>
              </div>
            </div>
          )}

          {/* Bulk Operations Toolbar */}
          {selectedIds.length > 0 && (
            <div className="bg-gray-900 text-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 animate-in slide-in-from-bottom-4 shadow-lg">
              <span className="text-sm font-bold">Selected <span className="bg-accent px-2 py-0.5 rounded-full text-xs ml-1">{selectedIds.length}</span> vehicles</span>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => {
                    dispatch(bulkPublish(selectedIds));
                    setSelectedIds([]);
                  }}
                  className="px-3.5 py-1.5 bg-green-600 hover:bg-green-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Globe size={12} /> Bulk Publish
                </button>
                <button 
                  onClick={() => {
                    dispatch(bulkArchive(selectedIds));
                    setSelectedIds([]);
                  }}
                  className="px-3.5 py-1.5 bg-gray-700 hover:bg-gray-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Archive size={12} /> Bulk Archive
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete selected records?")) {
                      dispatch(bulkDelete(selectedIds));
                      setSelectedIds([]);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 size={12} /> Bulk Delete
                </button>
                <button 
                  onClick={() => setSelectedIds([])}
                  className="px-3.5 py-1.5 border border-gray-700 text-gray-400 hover:text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-left text-sm whitespace-nowrap relative">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="p-4 w-10 text-center bg-gray-50">
                      <button onClick={toggleSelectAll} className="text-gray-400 hover:text-gray-600">
                        {selectedIds.length === filteredItems.length && filteredItems.length > 0 ? (
                          <CheckSquare size={18} className="text-accent" />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                    </th>
                    <th className="px-6 py-4 font-bold bg-gray-50">Vehicle Profile</th>
                    <th className="px-6 py-4 font-bold bg-gray-50">Branch / Reg No</th>
                    <th className="px-6 py-4 font-bold bg-gray-50">Status</th>
                    <th className="px-6 py-4 font-bold bg-gray-50 cursor-pointer" onClick={() => dispatch(setSort({ key: 'price', order: sortOrder === 'asc' ? 'desc' : 'asc' }))}>
                      Selling Price <ArrowUpDown size={12} className="inline ml-1" />
                    </th>
                    <th className="px-6 py-4 font-bold bg-gray-50 cursor-pointer" onClick={() => dispatch(setSort({ key: 'profit', order: sortOrder === 'asc' ? 'desc' : 'asc' }))}>
                      Margin <ArrowUpDown size={12} className="inline ml-1" />
                    </th>
                    <th className="px-6 py-4 font-bold bg-gray-50">Specs / Mileage</th>
                    <th className="px-6 py-4 font-bold bg-gray-50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {filteredItems.map(car => {
                    const isSelected = selectedIds.includes(car.id);
                    const statusColors = {
                      'Draft': 'bg-gray-100 text-gray-700',
                      'Available': 'bg-green-100 text-green-700',
                      'Reserved': 'bg-blue-100 text-blue-700',
                      'Sold': 'bg-purple-100 text-purple-700',
                      'Archived': 'bg-red-100 text-red-700'
                    };

                    return (
                      <tr key={car.id} className={`hover:bg-gray-50/50 transition-colors group ${isSelected ? 'bg-accent/5' : ''}`}>
                        {/* Checkbox */}
                        <td className="p-4 w-10 text-center">
                          <button onClick={() => toggleSelect(car.id)} className="text-gray-400 hover:text-gray-600">
                            {isSelected ? (
                              <CheckSquare size={18} className="text-accent" />
                            ) : (
                              <Square size={18} />
                            )}
                          </button>
                        </td>

                        {/* Vehicle Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                              <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-gray-900">{car.year} {car.make} {car.model}</span>
                                {car.featured && <Sparkles size={12} className="text-amber-500" fill="currentColor" />}
                              </div>
                              <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{car.vin || 'NO VIN'}</p>
                            </div>
                          </div>
                        </td>

                        {/* Branch / Reg */}
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-800 text-sm">{car.location || 'Main Showroom'}</p>
                          <p className="text-xs text-gray-500 font-semibold">{car.registrationNumber || 'No Plate'}</p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 relative">
                          <button 
                            onClick={() => setActiveStatusMenu(activeStatusMenu === car.id ? null : car.id)}
                            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border ${
                              statusColors[car.status] || 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {car.status} <ChevronDown size={10} />
                          </button>
                          
                          {activeStatusMenu === car.id && (
                            <div className="absolute left-6 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                              {Object.keys(statusColors).map(st => (
                                <button
                                  key={st}
                                  onClick={() => {
                                    if (st === 'Sold') {
                                      handleOpenSellModal(car);
                                    } else {
                                      dispatch(changeCarStatus({ id: car.id, status: st }));
                                    }
                                    setActiveStatusMenu(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 font-semibold text-gray-700"
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Selling Price */}
                        <td className="px-6 py-4 font-black text-gray-950">
                          ${car.price.toLocaleString()}
                          {car.status === 'Sold' && (
                            <span className="block text-[10px] font-bold text-green-600">Sold: ${car.soldPrice?.toLocaleString()}</span>
                          )}
                        </td>

                        {/* Margin */}
                        <td className="px-6 py-4 font-bold text-green-700">
                          ${(car.sellingPrice - car.purchasePrice).toLocaleString()}
                        </td>

                        {/* Specs */}
                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-700 font-bold">{car.fuelType} • {car.transmission}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{car.mileage?.toLocaleString()} mi • {car.bodyType}</p>
                        </td>

                        {/* Row Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => navigate(`/admin/cars/${car.id}`)}
                              className="p-2 text-gray-400 hover:text-accent hover:bg-red-50 rounded-lg transition-colors"
                              title="Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => navigate(`/admin/cars/edit/${car.id}`)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this listing?")) {
                                  dispatch(deleteCar(car.id));
                                }
                              }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination / Total count bar */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 font-bold bg-gray-50/50">
              <div>Showing <span className="text-gray-900">{filteredItems.length}</span> of <span className="text-gray-900">{items.length}</span> inventory items</div>
            </div>
          </div>

        </div>
      )}

      {/* Save Filter Preset Modal */}
      {showSaveFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Save Filter Preset</h3>
            <input 
              type="text" 
              placeholder="Preset Name (e.g. SUVs in Delhi)" 
              value={saveFilterName}
              onChange={(e) => setSaveFilterName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-accent text-sm"
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSaveFilterModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 font-bold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveFilter}
                className="flex-1 px-4 py-2.5 bg-accent text-white rounded-lg text-sm font-bold hover:bg-accent-hover"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mark as Sold Modal */}
      {isSellModalOpen && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Mark Vehicle as Sold</h3>
              <button type="button" onClick={() => setIsSellModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleMarkAsSold} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-600 mb-1">{selectedCar.year} {selectedCar.make} {selectedCar.model}</p>
                <p className="text-xs text-gray-500">Listed Price: ${selectedCar.price.toLocaleString()}</p>
              </div>
              
              <h4 className="text-sm font-bold text-gray-900 mb-2 border-b pb-2">Sale Details</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Final Selling Price ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="number"
                      required
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent font-bold text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder="Rahul Sharma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Customer Phone</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none"
                    placeholder="+91 99999 99999"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsSellModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover"
                >
                  Confirm Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarsList;
