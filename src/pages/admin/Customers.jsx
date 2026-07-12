import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, ExternalLink } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { id: 'CUST-001', name: 'Robert Fox', email: 'robert.fox@example.com', phone: '+1 (555) 019-2839', totalPurchases: 2, lifetimeValue: '$85,000', lastActive: '2 days ago', status: 'Active' },
    { id: 'CUST-002', name: 'Esther Howard', email: 'esther.h@example.com', phone: '+1 (555) 014-9812', totalPurchases: 1, lifetimeValue: '$42,500', lastActive: '5 days ago', status: 'Active' },
    { id: 'CUST-003', name: 'Jenny Wilson', email: 'jenny.w@example.com', phone: '+1 (555) 012-4521', totalPurchases: 0, lifetimeValue: '$0', lastActive: 'Just now', status: 'Lead' },
    { id: 'CUST-004', name: 'Kristin Watson', email: 'kristin.w@example.com', phone: '+1 (555) 011-8273', totalPurchases: 3, lifetimeValue: '$145,000', lastActive: '1 week ago', status: 'VIP' },
    { id: 'CUST-005', name: 'Cameron Williamson', email: 'cameron.w@example.com', phone: '+1 (555) 016-9281', totalPurchases: 1, lifetimeValue: '$65,000', lastActive: '3 weeks ago', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-sm text-gray-500">View and manage your customer database, purchase history, and CRM profiles.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-bold transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search customers by name, email or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact Details</th>
                <th className="px-6 py-4 font-semibold text-center">Purchases</th>
                <th className="px-6 py-4 font-semibold">Lifetime Value</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Active</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 flex flex-col gap-1">
                      <div className="flex items-center gap-2"><Mail size={14} className="text-gray-400"/> {customer.email}</div>
                      <div className="flex items-center gap-2"><Phone size={14} className="text-gray-400"/> {customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-900">{customer.totalPurchases}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{customer.lifetimeValue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      customer.status === 'VIP' ? 'bg-purple-100 text-purple-700' :
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' :
                      customer.status === 'Lead' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{customer.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-accent hover:text-accent-hover font-semibold flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View Profile <ExternalLink size={14} />
                    </button>
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

export default Customers;
