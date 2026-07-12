import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  MoreHorizontal, MessageSquare, Phone, Mail, Calendar, Plus, 
  Trash, Edit2, CheckCircle, ChevronRight, X, User, DollarSign, Tag
} from 'lucide-react';

const LeadsPipeline = () => {
  const { cars: inventory = [] } = useSelector(state => state.cars);
  
  const columns = [
    { id: 'new', title: 'New Leads', color: 'bg-blue-500', text: 'text-blue-500' },
    { id: 'contacted', title: 'Contacted', color: 'bg-yellow-500', text: 'text-yellow-500' },
    { id: 'test_drive', title: 'Test Drive', color: 'bg-purple-500', text: 'text-purple-500' },
    { id: 'negotiation', title: 'Negotiation', color: 'bg-orange-500', text: 'text-orange-500' },
    { id: 'won', title: 'Won', color: 'bg-green-500', text: 'text-green-500' },
  ];

  // Initialize leads using some of our real inventory cars
  const [leads, setLeads] = useState([
    { 
      id: 'L-101', 
      name: 'Aarav Sharma', 
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      carId: '1', // Tata Harrier
      source: 'Website', 
      date: '2026-07-10', 
      status: 'new',
      notes: 'Interested in Tata Harrier Dark Edition. Prefers Diesel Automatic.'
    },
    { 
      id: 'L-102', 
      name: 'Priya Patel', 
      email: 'priya.patel@example.com',
      phone: '+91 87654 32109',
      carId: '2', // XUV700
      source: 'Walk-in', 
      date: '2026-07-11', 
      status: 'contacted',
      notes: 'Came to showroom to check XUV700 AX7. Wants AWD model.'
    },
    { 
      id: 'L-103', 
      name: 'Rohan Mehta', 
      email: 'rohan.mehta@example.com',
      phone: '+91 76543 21098',
      carId: '3', // Hyundai Creta
      source: 'WhatsApp', 
      date: '2026-07-09', 
      status: 'test_drive',
      notes: 'Creta test drive completed. Highly satisfied with panoramic sunroof.'
    },
    { 
      id: 'L-104', 
      name: 'Sneha Reddy', 
      email: 'sneha.reddy@example.com',
      phone: '+91 95432 10987',
      carId: '5', // Toyota Fortuner
      source: 'Phone Call', 
      date: '2026-07-08', 
      status: 'negotiation',
      notes: 'Negotiating price on Toyota Fortuner. Offered $36,500.'
    }
  ]);

  // Modals & State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentLeadId, setCurrentLeadId] = useState(null);
  
  // Form fields
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCarId, setLeadCarId] = useState('');
  const [leadSource, setLeadSource] = useState('Website');
  const [leadStatus, setLeadStatus] = useState('new');
  const [leadNotes, setLeadNotes] = useState('');

  // Drag and Drop handlers
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      setLeads(prevLeads => prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, status: targetStatus } : lead
      ));
    }
  };

  const handleMoveStatus = (leadId, targetStatus) => {
    setLeads(prevLeads => prevLeads.map(lead => 
      lead.id === leadId ? { ...lead, status: targetStatus } : lead
    ));
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(prevLeads => prevLeads.filter(lead => lead.id !== leadId));
    }
  };

  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setLeadName('');
    setLeadEmail('');
    setLeadPhone('');
    setLeadCarId(inventory[0]?.id || '');
    setLeadSource('Website');
    setLeadStatus('new');
    setLeadNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setIsEditMode(true);
    setCurrentLeadId(lead.id);
    setLeadName(lead.name);
    setLeadEmail(lead.email);
    setLeadPhone(lead.phone);
    setLeadCarId(lead.carId || '');
    setLeadSource(lead.source);
    setLeadStatus(lead.status);
    setLeadNotes(lead.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmitLead = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setLeads(prevLeads => prevLeads.map(lead => 
        lead.id === currentLeadId ? {
          ...lead,
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          carId: leadCarId,
          source: leadSource,
          status: leadStatus,
          notes: leadNotes
        } : lead
      ));
    } else {
      const newLead = {
        id: `L-${Math.floor(100 + Math.random() * 900)}`,
        name: leadName,
        email: leadEmail,
        phone: leadPhone,
        carId: leadCarId,
        source: leadSource,
        date: new Date().toISOString().split('T')[0],
        status: leadStatus,
        notes: leadNotes
      };
      setLeads(prevLeads => [...prevLeads, newLead]);
    }
    setIsModalOpen(false);
  };

  // Helper to find car details from inventory
  const getCarDetails = (carId) => {
    const car = inventory.find(c => c.id === carId);
    return car ? `${car.year} ${car.make} ${car.model}` : 'Unknown Vehicle';
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Showroom Lead Manager</h2>
          <p className="text-sm text-gray-500">Track and manage prospective buyers in real time. Drag and drop to update lead status.</p>
        </div>
        <button 
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-accent/20"
        >
          <Plus size={20} />
          Create Lead
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto select-none">
        <div className="flex gap-6 min-w-max h-[calc(100vh-220px)] pb-4">
          {columns.map(column => {
            const columnLeads = leads.filter(l => l.status === column.id);
            return (
              <div 
                key={column.id} 
                className="w-80 bg-gray-50 rounded-2xl flex flex-col max-h-full border border-gray-200/80 shadow-sm"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-gray-200/60 flex justify-between items-center bg-white rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                    <h3 className="font-bold text-gray-800 text-sm tracking-wide uppercase">{column.title}</h3>
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    {columnLeads.length}
                  </span>
                </div>
                
                {/* Leads List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {columnLeads.map(lead => (
                    <div 
                      key={lead.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-grab active:cursor-grabbing group relative"
                    >
                      {/* Edit/Delete Actions overlay */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white pl-2">
                        <button 
                          onClick={() => handleOpenEditModal(lead)}
                          className="p-1.5 text-gray-400 hover:text-accent hover:bg-gray-50 rounded-md transition-colors"
                          title="Edit Lead"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Lead"
                        >
                          <Trash size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{lead.id}</span>
                          <h4 className="font-bold text-gray-900 pr-12">{lead.name}</h4>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs font-bold text-accent mb-3 bg-accent/5 py-1 px-2.5 rounded-lg w-fit">
                        <Tag size={12} />
                        {getCarDetails(lead.carId)}
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-2 mb-4 bg-gray-50 p-2 rounded-lg border border-gray-100/50">
                        {lead.notes || "No notes captured."}
                      </p>
                      
                      {/* Contact Info Details */}
                      <div className="border-t border-gray-100 pt-3 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Mail size={12} className="text-gray-400" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Phone size={12} className="text-gray-400" />
                          <span>{lead.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                        <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {lead.source}
                        </span>
                        
                        {/* Manual Status Navigation Select dropdown for quick switching (accessible & mobile-friendly) */}
                        <select 
                          value={lead.status}
                          onChange={(e) => handleMoveStatus(lead.id, e.target.value)}
                          className="text-[10px] font-bold bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 py-1 px-2 rounded-md outline-none transition-colors"
                        >
                          {columns.map(col => (
                            <option key={col.id} value={col.id}>Move to {col.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {columnLeads.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400 bg-gray-50/50">
                      Drop leads here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create / Edit Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">
                {isEditMode ? 'Edit Lead Profile' : 'Add Showroom Lead'}
              </h3>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitLead} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Customer Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Interested Vehicle</label>
                  <select
                    value={leadCarId}
                    onChange={(e) => setLeadCarId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm bg-white"
                  >
                    {inventory.map(car => (
                      <option key={car.id} value={car.id}>
                        {car.year} {car.make} {car.model} (${car.price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm"
                      placeholder="e.g. +91 99999 99999"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Lead Source</label>
                  <select
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm bg-white"
                  >
                    <option value="Website">Website Form</option>
                    <option value="Walk-in">Showroom Walk-in</option>
                    <option value="WhatsApp">WhatsApp Chat</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Funnel Stage</label>
                  <select
                    value={leadStatus}
                    onChange={(e) => setLeadStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm bg-white"
                  >
                    {columns.map(col => (
                      <option key={col.id} value={col.id}>{col.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Conversation Notes</label>
                <textarea
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-sm"
                  rows="4"
                  placeholder="Capture buyer intent, negotiation comments, scheduled test drives..."
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent-hover transition-colors shadow-md shadow-accent/20 text-sm"
                >
                  {isEditMode ? 'Save Changes' : 'Create Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPipeline;
