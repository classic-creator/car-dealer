import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, Legend
} from 'recharts';
import { Car, IndianRupee, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹12,45,00,000', trend: '+12.5%', isUp: true, icon: <IndianRupee size={24} /> },
    { title: 'Cars Sold', value: '142', trend: '+8.2%', isUp: true, icon: <Car size={24} /> },
    { title: 'Available Inventory', value: '356', trend: '-2.4%', isUp: false, icon: <Car size={24} /> },
    { title: 'New Leads', value: '89', trend: '+24.1%', isUp: true, icon: <Users size={24} /> },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 400000, profit: 240000 },
    { name: 'Feb', revenue: 300000, profit: 139800 },
    { name: 'Mar', revenue: 200000, profit: 98000 },
    { name: 'Apr', revenue: 278000, profit: 390800 },
    { name: 'May', revenue: 189000, profit: 480000 },
    { name: 'Jun', revenue: 239000, profit: 380000 },
    { name: 'Jul', revenue: 349000, profit: 430000 },
  ];

  const salesByBrand = [
    { name: 'Tesla', sales: 45 },
    { name: 'BMW', sales: 30 },
    { name: 'Porsche', sales: 25 },
    { name: 'Audi', sales: 20 },
    { name: 'Toyota', sales: 60 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-gray-50 text-accent">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend}
                {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm font-semibold mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Revenue Overview</h3>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none font-medium">
              <option>This Year</option>
              <option>Last Year</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#e22020" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800">Sales by Brand</h3>
            <p className="text-sm text-gray-500">Top performing brands this month</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByBrand} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#444', fontWeight: 600}} />
                <RechartsTooltip cursor={{fill: '#f9f9f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="sales" fill="#111" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Table Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
          <button className="text-sm font-bold text-accent hover:text-accent-hover">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Vehicle</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: '#TRX-8234', name: 'Alex Johnson', car: '2023 Tata Harrier', amount: '₹25,00,000', status: 'Completed' },
                { id: '#TRX-8235', name: 'Sarah Williams', car: '2022 Mahindra XUV700', amount: '₹28,00,000', status: 'Processing' },
                { id: '#TRX-8236', name: 'Mike Brown', car: '2021 Hyundai Creta', amount: '₹18,00,000', status: 'Completed' },
                { id: '#TRX-8237', name: 'Emily Davis', car: '2022 Kia Seltos', amount: '₹19,50,000', status: 'Pending' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{row.id}</td>
                  <td className="px-6 py-4 text-gray-600">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{row.car}</td>
                  <td className="px-6 py-4 text-gray-900 font-bold">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      row.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      row.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
