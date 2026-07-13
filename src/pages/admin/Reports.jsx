import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  fetchReportsDashboard, fetchReportsCharts, fetchReportsTable,
  setFilters, resetFilters 
} from '../../redux/slices/reportsSlice';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { 
  IndianRupee, Calendar, TrendingUp, TrendingDown, RefreshCw, Download, 
  Printer, FileSpreadsheet, Eye, Edit, User, Car, Filter, CheckCircle2, 
  AlertCircle, ShieldCheck, HelpCircle, Target, Award, ArrowUpRight, Search
} from 'lucide-react';
import ReportDetailsModal from '../../components/sections/ReportDetailsModal';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

const Reports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Selectors
  const { 
    kpis, charts, reportsList, insights, goals, revenueBreakdown,
    status, chartsStatus, tableStatus, filters 
  } = useSelector(state => state.reports);

  // Local component states
  const [activeChartTab, setActiveChartTab] = useState('revenue'); // 'revenue' | 'sales' | 'staff' | 'breakdown'
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Initial Fetch on component mount or filter change
  useEffect(() => {
    dispatch(fetchReportsDashboard(filters));
    dispatch(fetchReportsCharts(filters));
    dispatch(fetchReportsTable(filters));
  }, [dispatch, filters]);

  // Handle filter changes
  const handleFilterChange = (updates) => {
    dispatch(setFilters(updates));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
    setSearchTerm('');
  };

  // CSV Export Utility
  const handleExportCSV = () => {
    if (!reportsList || reportsList.length === 0) return;
    
    const headers = [
      'Invoice Number', 'Sale Date', 'Customer Name', 'Customer Contact', 
      'Vehicle', 'VIN', 'Brand', 'Model', 'Year', 'Executive', 
      'Purchase Price', 'Selling Price', 'Discount', 'Tax', 'Profit', 
      'Payment Method', 'Finance Status', 'Branch', 'Delivery Status', 'Invoice Status'
    ];

    const rows = reportsList.map(r => [
      r.invoiceNumber, r.saleDate, r.customerName, r.customerContact,
      r.vehicle, r.vin, r.brand, r.model, r.year, r.salesExecutive,
      r.purchasePrice, r.sellingPrice, r.discount, r.tax, r.profit,
      r.paymentMethod, r.financeStatus, r.branch, r.deliveryStatus, r.invoiceStatus
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AutoElite_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Dashboard View
  const handlePrintDashboard = () => {
    window.print();
  };

  // Filtered List for Table search
  const searchedReports = reportsList?.filter(r => 
    r.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.salesExecutive.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.branch.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Sticky Header with Advanced Filters & Action Controls */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between transition-all">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span>Sales Reports & Analytics</span>
            {(status === 'loading' || chartsStatus === 'loading' || tableStatus === 'loading') && (
              <RefreshCw className="animate-spin text-accent" size={20} />
            )}
          </h1>
          <p className="text-xs text-gray-500 font-medium">Monitor financial metrics, profit margins, branch sales, and targets.</p>
        </div>
        
        {/* Export options */}
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FileSpreadsheet size={16} className="text-green-600" /> Export CSV
          </button>
          <button 
            onClick={handlePrintDashboard}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Printer size={16} className="text-indigo-600" /> Print Summary
          </button>
        </div>
      </div>

      {/* Advanced Sticky Filter Controls */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          <Filter size={14} className="text-gray-400" /> Filters Directory
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Date Range Picker */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Period</label>
            <select 
              value={filters.dateRange}
              onChange={(e) => handleFilterChange({ dateRange: e.target.value })}
              className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisYear">This Year</option>
              <option value="custom">Custom Date Range</option>
            </select>
          </div>

          {/* Branch Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Branch</label>
            <select 
              value={filters.branch}
              onChange={(e) => handleFilterChange({ branch: e.target.value })}
              className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:ring-1 focus:ring-accent"
            >
              <option>All Branches</option>
              <option>Mumbai Branch</option>
              <option>Delhi Branch</option>
              <option>Bangalore Branch</option>
              <option>Chennai Branch</option>
            </select>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Brand</label>
            <select 
              value={filters.brand}
              onChange={(e) => handleFilterChange({ brand: e.target.value })}
              className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:ring-1 focus:ring-accent"
            >
              <option>All Brands</option>
              <option>Tata</option>
              <option>Mahindra</option>
              <option>Hyundai</option>
              <option>Kia</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>BMW</option>
              <option>Porsche</option>
              <option>Lexus</option>
              <option>Audi</option>
            </select>
          </div>

          {/* Executive Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Sales Lead</label>
            <select 
              value={filters.salesExecutive}
              onChange={(e) => handleFilterChange({ salesExecutive: e.target.value })}
              className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:ring-1 focus:ring-accent"
            >
              <option>All Executives</option>
              <option>Rajesh Sharma</option>
              <option>Amit Patel</option>
              <option>Priya Nair</option>
              <option>Sneha Rao</option>
              <option>Vikram Singh</option>
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Payment Method</label>
            <select 
              value={filters.paymentMethod}
              onChange={(e) => handleFilterChange({ paymentMethod: e.target.value })}
              className="w-full text-xs font-bold bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 outline-none focus:ring-1 focus:ring-accent"
            >
              <option>All Methods</option>
              <option>Cash</option>
              <option>Finance</option>
            </select>
          </div>

        </div>

        {/* Custom Date Range Selectors */}
        {filters.dateRange === 'custom' && (
          <div className="flex gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl w-fit animate-in slide-in-from-top-4 duration-200">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Start Date</label>
              <input 
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange({ startDate: e.target.value })}
                className="text-xs font-bold bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">End Date</label>
              <input 
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange({ endDate: e.target.value })}
                className="text-xs font-bold bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button 
            onClick={handleResetFilters}
            className="text-xs font-bold text-gray-500 hover:text-accent flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw size={12} /> Reset Filter Layout
          </button>
        </div>
      </div>

      {/* Top Summary cards - High-level KPIs */}
      {kpis ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Revenue', value: `₹${kpis.totalRevenue.toLocaleString('en-IN')}`, trend: kpis.trends.totalRevenue, color: 'text-indigo-600', bg: 'bg-indigo-50/50 border-indigo-100' },
            { title: 'Gross profit', value: `₹${kpis.grossProfit.toLocaleString('en-IN')}`, trend: kpis.trends.grossProfit, color: 'text-green-600', bg: 'bg-green-50/50 border-green-100' },
            { title: 'Net profit', value: `₹${Math.round(kpis.netProfit).toLocaleString('en-IN')}`, trend: kpis.trends.netProfit, color: 'text-emerald-600', bg: 'bg-emerald-50/50 border-emerald-100' },
            { title: 'Total Sales (Units)', value: kpis.totalSales, trend: kpis.trends.totalSales, color: 'text-amber-600', bg: 'bg-amber-50/50 border-amber-100' }
          ].map((item, i) => (
            <div key={i} className={`bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md ${item.bg}`}>
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block">{item.title}</span>
                <span className={`flex items-center gap-0.5 text-xs font-black px-2 py-0.5 rounded-full ${
                  item.trend.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {item.trend.isUp ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                  {item.trend.pct}%
                </span>
              </div>
              <div>
                <h3 className={`text-2xl font-black ${item.color}`}>{item.value}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1.5">{item.trend.label}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white border border-gray-200 rounded-2xl p-6 h-32 animate-pulse"></div>
          ))}
        </div>
      )}

      {/* Secondary Metrics details Grid */}
      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Avg Sale Price', value: `₹${kpis.averageSellingPrice.toLocaleString('en-IN')}` },
            { label: 'Avg Profit / Car', value: `₹${kpis.averageProfitPerVehicle.toLocaleString('en-IN')}` },
            { label: 'Today\'s Revenue', value: `₹${kpis.todayRevenue.toLocaleString('en-IN')}` },
            { label: 'This Month Rev', value: `₹${kpis.monthRevenue.toLocaleString('en-IN')}` },
            { label: 'Pending Handover', value: kpis.pendingDeliveries },
            { label: 'Cancelled Deals', value: kpis.cancelledSales }
          ].map((metric, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider block">{metric.label}</span>
              <h4 className="text-sm font-black text-gray-900 mt-2">{metric.value}</h4>
            </div>
          ))}
        </div>
      )}

      {/* Goals, Progress, and Target forecasting */}
      {goals && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
              <Target className="text-accent" size={18} /> Performance Goals - July 2026
            </h3>
            
            <div className="space-y-4">
              {/* Sales Target */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Vehicles Sold Target ({goals.sales.current} / {goals.sales.target})</span>
                  <span className="text-accent">{goals.sales.pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${Math.min(goals.sales.pct, 100)}%` }}></div>
                </div>
              </div>

              {/* Revenue Target */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Revenue target (₹{goals.revenue.current.toLocaleString('en-IN')} / ₹{goals.revenue.target.toLocaleString('en-IN')})</span>
                  <span className="text-green-600">{goals.revenue.pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(goals.revenue.pct, 100)}%` }}></div>
                </div>
              </div>

              {/* Profit Target */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Profit Target (₹{goals.profit.current.toLocaleString('en-IN')} / ₹{goals.profit.target.toLocaleString('en-IN')})</span>
                  <span className="text-indigo-600">{goals.profit.pct}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min(goals.profit.pct, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Forecasting */}
          <div className="bg-indigo-50/40 border border-indigo-150/40 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-indigo-900 text-xs font-black uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Award size={14} /> Month-End Forecast
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">Based on current transaction velocities and approval margins, the predicted end-of-month financial margins are:</p>
            </div>
            
            <div className="mt-4 space-y-2 border-t border-indigo-100/50 pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Predicted Sales:</span>
                <span className="font-bold text-gray-900">{goals.predictedEndOfMonth.sales} Vehicles</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Predicted Revenue:</span>
                <span className="font-bold text-gray-900">₹{goals.predictedEndOfMonth.revenue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Predicted Net Profit:</span>
                <span className="font-bold text-green-700">₹{goals.predictedEndOfMonth.profit.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-4">
          <h3 className="text-base font-black text-gray-900">Interactive Analytics Graphs</h3>
          
          {/* Tabs */}
          <div className="flex gap-2 bg-gray-50 border border-gray-250 p-1 rounded-xl w-fit">
            {[
              { id: 'revenue', label: 'Revenue & Profits' },
              { id: 'sales', label: 'Sales Demographics' },
              { id: 'staff', label: 'Branch & Staff' },
              { id: 'breakdown', label: 'Add-on Shares' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveChartTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeChartTab === tab.id ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-96">
          {charts ? (
            <ResponsiveContainer width="100%" height="100%">
              {activeChartTab === 'revenue' ? (
                <AreaChart data={charts.revenueOverviewChart} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/100000}L`} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip 
                    formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, '']}
                    contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Area type="monotone" name="Revenue" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" name="Ancillary & Margin Profit" dataKey="profit" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorProf)" />
                </AreaChart>
              ) : activeChartTab === 'sales' ? (
                <BarChart data={charts.salesByBrand} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip 
                    contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar name="Vehicles Sold" dataKey="value" fill="#4F46E5" radius={[6, 6, 0, 0]} barSize={40}>
                    {charts.salesByBrand.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              ) : activeChartTab === 'staff' ? (
                <BarChart data={charts.performanceExecutive} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/100000}L`} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip 
                    formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Sales Generated']}
                    contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar name="Sales Volume" dataKey="sales" fill="#10B981" radius={[0, 6, 6, 0]} barSize={20} />
                </BarChart>
              ) : (
                <BarChart data={revenueBreakdown} layout="vertical" margin={{ top: 10, right: 10, left: 30, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val/100000}L`} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip 
                    formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Total Share']}
                    contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar name="Breakdown Share Value" dataKey="amount" fill="#F59E0B" radius={[0, 6, 6, 0]} barSize={20}>
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full bg-gray-50 border border-gray-150 rounded-2xl animate-pulse"></div>
          )}
        </div>
      </div>

      {/* Business Insights Panel */}
      {insights && (
        <div className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award size={14} className="text-gray-400" /> Analytical Business Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Best Selling Brand', val: insights.bestSellingBrand, desc: 'High resale model count.' },
              { title: 'Highest Revenue Month', val: insights.highestRevenueMonth, desc: 'Highest booking approvals.' },
              { title: 'Highest Profit Vehicle', val: insights.highestProfitVehicle, desc: 'Maximum transactional margins.' },
              { title: 'Top Sales Executive', val: insights.mostProfitableExecutive, desc: 'Highest net commissions generated.' },
              { title: 'Best Performing Branch', val: insights.bestPerformingBranch, desc: 'Total sales revenue volume leader.' },
              { title: 'Customer Retention Rate', val: insights.customerRetentionRate, desc: 'Repeat customer buyer percentage.' }
            ].map((card, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-2 hover:border-accent/30 transition-all duration-300">
                <span className="text-xs font-bold text-gray-400 block">{card.title}</span>
                <h4 className="text-base font-black text-gray-900 tracking-tight">{card.val}</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sales Invoices Data Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 gap-4">
          <div>
            <h3 className="text-base font-black text-gray-900">Invoiced Sales List</h3>
            <p className="text-xs text-gray-500">Browse detailed invoices and delivery records.</p>
          </div>
          
          {/* Searching bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search by customer, invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-xs font-bold outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto border border-gray-150 rounded-xl">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-150">
              <tr>
                <th className="px-6 py-4 font-bold uppercase">Invoice #</th>
                <th className="px-6 py-4 font-bold uppercase">Sale Date</th>
                <th className="px-6 py-4 font-bold uppercase">Customer</th>
                <th className="px-6 py-4 font-bold uppercase">Vehicle</th>
                <th className="px-6 py-4 font-bold uppercase text-right">Selling Price</th>
                <th className="px-6 py-4 font-bold uppercase text-right">Profit Margin</th>
                <th className="px-6 py-4 font-bold uppercase">Lead Executive</th>
                <th className="px-6 py-4 font-bold uppercase">Delivery Status</th>
                <th className="px-6 py-4 font-bold uppercase">Invoice Status</th>
                <th className="px-6 py-4 font-bold uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {searchedReports.length > 0 ? (
                searchedReports.map((row) => (
                  <tr key={row.invoiceNumber} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-gray-900">{row.invoiceNumber}</td>
                    <td className="px-6 py-4">{row.saleDate}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{row.customerName}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{row.customerContact}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{row.vehicle}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{row.branch}</p>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      ₹{row.sellingPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-green-700">
                      ₹{row.profit.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 font-medium">{row.salesExecutive}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                        row.deliveryStatus === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                        row.deliveryStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>{row.deliveryStatus}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                        row.invoiceStatus === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' :
                        row.invoiceStatus === 'Partial' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>{row.invoiceStatus}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => { setSelectedReport(row); setIsDetailsOpen(true); }}
                          className="p-1.5 text-gray-500 hover:text-accent hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Invoice Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => navigate(`/admin/cars/edit/${row.vehicleId}`)}
                          className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit Vehicle Details"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-400 font-bold">
                    No matching sales records found. Try modifying filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice slide-over drawer modal */}
      <ReportDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => { setIsDetailsOpen(false); setSelectedReport(null); }}
        sale={selectedReport}
      />

    </div>
  );
};

export default Reports;
