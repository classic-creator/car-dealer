import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ArrowLeft, Edit, Copy, Trash2, Calendar, ShieldCheck, FileText, 
  Wrench, Activity, ChevronRight, Save, MessageSquare, AlertCircle, 
  MapPin, User, CheckCircle2, TrendingUp, Info
} from 'lucide-react';
import { fetchCars, duplicateCar, deleteCar, changeCarStatus } from '../../redux/slices/carsSlice';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cars = [], status } = useSelector((state) => state.cars);
  const car = cars.find((c) => c.id === id);

  const [activeTab, setActiveTab] = useState('specs');
  const [adminNotes, setAdminNotes] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (car) {
      setAdminNotes(car.notes || '');
    }
  }, [car]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Vehicle Not Found</h3>
        <p className="text-gray-500 mb-6">The vehicle with ID "{id}" does not exist in the database.</p>
        <Link to="/admin/cars" className="bg-accent text-white px-6 py-2 rounded-xl font-bold">
          Go Back to Inventory
        </Link>
      </div>
    );
  }

  const handleDuplicate = () => {
    dispatch(duplicateCar(car.id));
    alert('Vehicle duplicated successfully! Check the top of the inventory.');
    navigate('/admin/cars');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this vehicle from the database?')) {
      dispatch(deleteCar(car.id));
      navigate('/admin/cars');
    }
  };

  const handleStatusChange = (newStatus) => {
    dispatch(changeCarStatus({ id: car.id, status: newStatus }));
    setShowStatusMenu(false);
  };

  // Profit Margin Calculation
  const profitMargin = car.sellingPrice - car.purchasePrice - (car.tax || 0) - (car.additionalCharges || 0);
  const profitPercentage = ((profitMargin / car.purchasePrice) * 100).toFixed(1);

  const statusColors = {
    'Draft': 'bg-gray-100 text-gray-700 border-gray-200',
    'Pending Inspection': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Available': 'bg-green-100 text-green-700 border-green-200',
    'Reserved': 'bg-blue-100 text-blue-700 border-blue-200',
    'Sold': 'bg-purple-100 text-purple-700 border-purple-200',
    'Archived': 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/cars')} 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[car.status]}`}>
                {car.status}
              </span>
              {car.featured && (
                <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-200 uppercase">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">
              {car.year} {car.make} {car.model} <span className="text-gray-500 text-lg font-medium">{car.variant}</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              VIN: <span className="font-mono font-bold text-gray-700 uppercase">{car.vin || 'N/A'}</span> • Reg: <span className="font-bold text-gray-700">{car.registrationNumber || 'N/A'}</span>
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Change Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-1"
            >
              Status: {car.status}
            </button>
            {showStatusMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                {Object.keys(statusColors).map((st) => (
                  <button 
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-50 text-gray-700 flex items-center justify-between"
                  >
                    {st}
                    {car.status === st && <CheckCircle2 size={12} className="text-accent" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link 
            to={`/admin/cars/edit/${car.id}`}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold text-gray-700"
          >
            <Edit size={16} /> Edit
          </Link>
          <button 
            onClick={handleDuplicate}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-xl text-sm font-bold text-gray-700"
          >
            <Copy size={16} /> Duplicate
          </button>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold border border-red-100"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery Block */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Media Gallery</h3>
            <div className="aspect-[16/9] w-full bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
              <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
            </div>
            {car.images && car.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {car.images.map((img, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-100 hover:opacity-80 transition-opacity cursor-pointer bg-gray-50">
                    <img src={img} alt={`${car.model} ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 flex bg-gray-50/50 px-4">
              {[
                { id: 'specs', label: 'Specifications', icon: <Info size={16} /> },
                { id: 'pricing', label: 'Financial Matrix', icon: <TrendingUp size={16} /> },
                { id: 'documents', label: 'Documents & RC', icon: <FileText size={16} /> },
                { id: 'service', label: 'Service History', icon: <Wrench size={16} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? 'border-accent text-accent' 
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* Specs Tab */}
              {activeTab === 'specs' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Engine Type</span>
                      <span className="text-sm font-bold text-gray-800">{car.specs?.engine || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Power Output</span>
                      <span className="text-sm font-bold text-gray-800">{car.specs?.power || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Engine Torque</span>
                      <span className="text-sm font-bold text-gray-800">{car.specs?.torque || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Mileage</span>
                      <span className="text-sm font-bold text-gray-800">{car.mileage?.toLocaleString()} mi</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Fuel System</span>
                      <span className="text-sm font-bold text-gray-800">{car.fuelType}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Transmission</span>
                      <span className="text-sm font-bold text-gray-800">{car.transmission}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Body Configuration</span>
                      <span className="text-sm font-bold text-gray-800">{car.bodyType}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Exterior Paint</span>
                      <span className="text-sm font-bold text-gray-800">{car.color}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase">Seating Capacity</span>
                      <span className="text-sm font-bold text-gray-800">{car.seatingCapacity} Seater</span>
                    </div>
                  </div>

                  {/* Features List */}
                  {car.features && (
                    <div className="border-t border-gray-100 pt-6 space-y-4">
                      <h4 className="font-bold text-gray-900">Installed Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Safety</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {car.features.safety?.map((f, i) => (
                              <span key={i} className="bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-md">{f}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-gray-400 uppercase mb-2">Comfort</h5>
                          <div className="flex flex-wrap gap-1.5">
                            {car.features.comfort?.map((f, i) => (
                              <span key={i} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md">{f}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-xs font-bold text-gray-400 uppercase">Purchase Price</span>
                      <span className="text-lg font-black text-gray-900">${car.purchasePrice?.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-xs font-bold text-gray-400 uppercase">Listed Retail</span>
                      <span className="text-lg font-black text-gray-900">${car.sellingPrice?.toLocaleString()}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="block text-xs font-bold text-gray-400 uppercase">Discounts / Tax</span>
                      <span className="text-sm font-bold text-red-600">-${car.discount || 0} / +${car.tax || 0}</span>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <span className="block text-xs font-bold text-green-700 uppercase">Projected Profit</span>
                      <span className="text-lg font-black text-green-900">${profitMargin?.toLocaleString()} ({profitPercentage}%)</span>
                    </div>
                  </div>

                  {/* Pricing Adjustment History */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-900">Pricing Updates Timeline</h4>
                    <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                      {car.pricingHistory?.map((hist, i) => (
                        <div key={i} className="flex justify-between items-center p-3 text-sm bg-white hover:bg-gray-50/50">
                          <div>
                            <p className="font-bold text-gray-800">{hist.type}</p>
                            <p className="text-xs text-gray-400">{hist.date}</p>
                          </div>
                          <span className="font-black text-gray-900">${hist.price?.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* RC details */}
                    <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-4 shadow-sm">
                      <h4 className="font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                        <FileText size={18} className="text-accent" />
                        Registration Certificate (RC) Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">RC Status</span>
                          <span className="font-bold text-green-600">{car.documents?.rcStatus || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">Registration Number</span>
                          <span className="font-bold text-gray-800">{car.registrationNumber || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">Ownership History</span>
                          <span className="font-bold text-gray-800">{car.ownerHistory?.ownerCount || 1} Owner(s)</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">Category</span>
                          <span className="font-bold text-gray-800">{car.ownerHistory?.type || 'Individual'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Insurance details */}
                    <div className="bg-white p-5 border border-gray-200 rounded-xl space-y-4 shadow-sm">
                      <h4 className="font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
                        <ShieldCheck size={18} className="text-accent" />
                        Insurance Policy Overview
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">Provider</span>
                          <span className="font-bold text-gray-800">{car.documents?.insuranceProvider || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">Coverage Type</span>
                          <span className="font-bold text-gray-800">{car.documents?.insuranceType || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">Valid Until</span>
                          <span className="font-bold text-gray-800">{car.documents?.insuranceValidity || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-gray-400 font-semibold">PUC Expiry</span>
                          <span className="font-bold text-gray-800">{car.documents?.pucValidity || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Service Tab */}
              {activeTab === 'service' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-bold text-gray-900">Service Record Logs</h4>
                  {car.serviceHistory && car.serviceHistory.length > 0 ? (
                    <div className="space-y-4">
                      {car.serviceHistory.map((service, i) => (
                        <div key={i} className="flex gap-4 p-4 border border-gray-150 rounded-xl hover:bg-gray-50/30">
                          <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent border border-accent/10 shrink-0">
                            <Wrench size={16} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-gray-900 text-sm">{service.type}</span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">{service.mileage} mi</span>
                            </div>
                            <p className="text-xs text-gray-500">{service.date} • Cost: <span className="font-semibold text-gray-700">${service.cost}</span></p>
                            <p className="text-xs text-gray-600 mt-1">{service.description || 'Routine checks completed.'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm">No service records added.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Inspection Score Card */}
          {car.inspectionStatus && (
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Inspection Rating</h4>
                <p className="text-xs text-gray-500 mt-0.5">Tested on {car.inspectionStatus.inspectionDate}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                    {car.inspectionStatus.result}
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center bg-green-50 shrink-0">
                <span className="text-lg font-black text-green-700">{car.inspectionStatus.score}</span>
              </div>
            </div>
          )}

          {/* Branch / Dealer Details */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
              <MapPin size={18} className="text-accent" />
              Branch Distribution
            </h4>
            <div className="text-sm space-y-3">
              <div>
                <span className="block text-xs text-gray-400 font-bold uppercase">Assigned Hub</span>
                <span className="font-bold text-gray-800">{car.location || 'Main Showroom'}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-bold uppercase">Listed Date</span>
                <span className="font-bold text-gray-800">{car.addedDate}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-400 font-bold uppercase">Last Mod Date</span>
                <span className="font-bold text-gray-800">{car.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Internal Notes Notepad */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
              <MessageSquare size={18} className="text-accent" />
              Internal Admin Notes
            </h4>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full text-xs text-gray-700 border border-gray-250 p-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent outline-none bg-gray-50/50"
              rows={4}
              placeholder="Jot down notes about customer bids, negotiation comments, scheduled test drives..."
            />
            <button 
              onClick={() => alert('Notes updated successfully!')}
              className="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Save size={14} /> Save Notes
            </button>
          </div>

          {/* Activity Logs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-900 flex items-center gap-2 border-b pb-2">
              <Activity size={18} className="text-accent" />
              Activity Log
            </h4>
            <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
              {car.activityLog && car.activityLog.length > 0 ? (
                car.activityLog.map((act, i) => (
                  <div key={i} className="text-xs space-y-0.5 border-l-2 border-gray-200 pl-3 relative ml-1">
                    <div className="absolute w-2 h-2 rounded-full bg-gray-300 -left-[5px] top-1"></div>
                    <p className="font-semibold text-gray-800">{act.action}</p>
                    <p className="text-[10px] text-gray-400">{act.date} • {act.user}</p>
                  </div>
                ))
              ) : (
                <div className="text-xs text-gray-400">No activity logged.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
