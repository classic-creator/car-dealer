import React from 'react';
import { X, Printer, Download, User, Car, Shield, DollarSign, Calendar, IndianRupee, MapPin } from 'lucide-react';

const ReportDetailsModal = ({ isOpen, onClose, sale }) => {
  if (!isOpen || !sale) return null;

  const handlePrint = () => {
    const win = window.open('', '_blank');
    const additionalRev = sale.additionalRevenue || {};
    const basePrice = sale.sellingPrice - sale.discount;
    const addRevTotal = Object.values(additionalRev).reduce((a, b) => a + b, 0);
    const grandTotal = basePrice + addRevTotal;

    win.document.write(`
      <html>
        <head>
          <title>Invoice - ${sale.invoiceNumber}</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              body { font-size: 12px; }
            }
          </style>
        </head>
        <body class="p-8 bg-white text-gray-800">
          <div class="max-w-4xl mx-auto border p-8 rounded-xl shadow-sm">
            <div class="flex justify-between items-center border-b pb-6 mb-6">
              <div>
                <h1 class="text-3xl font-black text-indigo-900 tracking-tighter">AUTOELITE</h1>
                <p class="text-xs text-gray-500 font-bold uppercase mt-1">Supercars & Premium Dealership Network</p>
              </div>
              <div class="text-right">
                <h2 class="text-xl font-bold text-gray-900">INVOICE</h2>
                <p class="text-sm font-bold text-gray-600">${sale.invoiceNumber}</p>
                <p class="text-xs text-gray-400">Date: ${sale.saleDate}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-8 mb-8 border-b pb-6">
              <div>
                <h3 class="text-xs font-bold text-gray-400 uppercase mb-2">Dealership Location</h3>
                <p class="font-bold text-gray-800">${sale.branch}</p>
                <p class="text-xs text-gray-500">AutoElite Premium Hub, Main Link Road</p>
                <p class="text-xs text-gray-500">Executive: ${sale.salesExecutive}</p>
              </div>
              <div>
                <h3 class="text-xs font-bold text-gray-400 uppercase mb-2">Billed To</h3>
                <p class="font-bold text-gray-800">${sale.customerName}</p>
                <p class="text-xs text-gray-500">Contact: ${sale.customerContact}</p>
                <p class="text-xs text-gray-500">Invoice Status: <span class="font-bold text-green-600">${sale.invoiceStatus}</span></p>
              </div>
            </div>

            <div class="mb-8">
              <h3 class="text-sm font-bold text-gray-800 mb-3 border-b pb-1">Vehicle Details</h3>
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500">
                    <th class="p-3">Item Description</th>
                    <th class="p-3">VIN / Registration</th>
                    <th class="p-3 text-right">Base Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b">
                    <td class="p-3">
                      <p class="font-bold text-gray-800">${sale.vehicle}</p>
                      <p class="text-xs text-gray-500">${sale.year} • ${sale.brand} • ${sale.fuelType}</p>
                    </td>
                    <td class="p-3">
                      <p class="font-mono text-xs">${sale.vin}</p>
                      <p class="text-xs text-gray-600">${sale.registrationNumber || 'N/A'}</p>
                    </td>
                    <td class="p-3 text-right font-bold">₹${sale.sellingPrice.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="grid grid-cols-2 gap-8 mb-6">
              <div>
                <h3 class="text-sm font-bold text-gray-800 mb-2 border-b pb-1">Payment & Finance Info</h3>
                <p class="text-sm">Method: <strong class="text-gray-800">${sale.paymentMethod}</strong></p>
                <p class="text-sm">Finance Status: <strong class="text-gray-800">${sale.financeStatus}</strong></p>
                <p class="text-xs text-gray-500 mt-2">All transactions are processed securely under dealership compliance regulations.</p>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800 mb-2 border-b pb-1">Pricing Summary</h3>
                <div class="space-y-1 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Selling Price:</span>
                    <span class="font-semibold">₹${sale.sellingPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Discount Applied:</span>
                    <span class="font-semibold text-red-600">-₹${sale.discount.toLocaleString('en-IN')}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Local Taxes & GST (18%):</span>
                    <span class="font-semibold">+₹${sale.tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div class="flex justify-between border-t pt-1 font-bold text-gray-900">
                    <span>Grand Total:</span>
                    <span>₹${grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t pt-6 text-center text-xs text-gray-400">
              <p>Thank you for choosing AutoElite Premium. We appreciate your business!</p>
              <p class="mt-1">Generated electronically on ${new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    win.document.close();
    setTimeout(() => {
      win.print();
    }, 500);
  };

  const additionalRev = sale.additionalRevenue || {};
  const basePrice = sale.sellingPrice - sale.discount;
  const addRevTotal = Object.values(additionalRev).reduce((a, b) => a + b, 0);
  const grandTotal = basePrice + addRevTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 md:pl-16">
          <div className="pointer-events-auto w-screen max-w-2xl transform bg-white transition-transform duration-300 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-150 px-6 bg-gray-50">
              <div className="space-y-0.5">
                <h2 className="text-lg font-black text-gray-950 flex items-center gap-2">
                  <span>Invoice Details</span>
                  <span className="text-xs bg-accent/10 text-accent font-extrabold px-2 py-0.5 rounded-full">{sale.invoiceNumber}</span>
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrint}
                  className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 rounded-xl transition-all"
                  title="Print Invoice"
                >
                  <Printer size={18} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-150 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable details wrapper */}
            <div className="flex h-[calc(100vh-64px)] flex-col overflow-y-auto p-6 space-y-6">
              
              {/* Top status bar */}
              <div className="grid grid-cols-3 gap-4 border border-gray-150 rounded-2xl p-4 bg-gray-50/50">
                <div className="text-center">
                  <span className="text-gray-400 text-[10px] font-bold uppercase block">Payment Status</span>
                  <span className={`inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${
                    sale.invoiceStatus === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' :
                    sale.invoiceStatus === 'Partial' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>{sale.invoiceStatus}</span>
                </div>
                <div className="text-center border-x border-gray-200">
                  <span className="text-gray-400 text-[10px] font-bold uppercase block">Delivery Status</span>
                  <span className={`inline-block mt-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${
                    sale.deliveryStatus === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                    sale.deliveryStatus === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }`}>{sale.deliveryStatus}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-400 text-[10px] font-bold uppercase block">Grand Total</span>
                  <span className="text-base font-black text-gray-900 block mt-1.5 flex items-center justify-center gap-0.5">
                    <IndianRupee size={14} className="text-gray-500" />
                    {grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Customer and Executive Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={14} className="text-gray-400" /> Customer & Transaction Info
                </h3>
                <div className="border border-gray-150 rounded-2xl p-4 divide-y divide-gray-100 space-y-3 bg-white">
                  <div className="grid grid-cols-2 gap-4 pb-2">
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Customer Name</span>
                      <span className="text-sm font-bold text-gray-800">{sale.customerName}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Contact Number</span>
                      <span className="text-sm font-bold text-gray-800">{sale.customerContact}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3 pb-1">
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Dealership Branch</span>
                      <span className="text-sm font-bold text-gray-800">{sale.branch}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Sales Executive</span>
                      <span className="text-sm font-bold text-gray-800">{sale.salesExecutive}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Specs */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Car size={14} className="text-gray-400" /> Vehicle Specs
                </h3>
                <div className="border border-gray-150 rounded-2xl p-4 space-y-3 bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-black text-gray-900">{sale.vehicle}</h4>
                      <p className="text-xs text-gray-500 font-bold mt-1 uppercase">{sale.brand} • {sale.fuelType} • {sale.bodyType}</p>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded font-bold border border-gray-200">{sale.year} Model</span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">VIN (Vehicle Identification)</span>
                      <span className="font-mono text-xs block text-gray-700 font-bold mt-0.5">{sale.vin}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Original Purchase Price</span>
                      <span className="text-xs block text-gray-700 font-bold mt-0.5">₹{sale.purchasePrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Matrix details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign size={14} className="text-gray-400" /> Financial Matrix & Additional Revenue
                </h3>
                <div className="border border-gray-150 rounded-2xl overflow-hidden bg-white">
                  {/* Vehicle base price breakdown */}
                  <div className="p-4 border-b border-gray-150 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Selling Price:</span>
                      <span className="font-bold text-gray-900">₹{sale.sellingPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Discount Applied:</span>
                      <span className="font-bold text-red-600">-₹{sale.discount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Taxes (GST & Local):</span>
                      <span className="font-bold text-gray-900">+₹{sale.tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-dashed pt-2 font-bold text-gray-900">
                      <span>Vehicle Subtotal:</span>
                      <span>₹{basePrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Ancillary commissions breakdown */}
                  <div className="p-4 bg-gray-50/50 space-y-2 border-b border-gray-150">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Add-on Commissions</span>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Financing Commission:</span>
                      <span className="font-semibold">₹{(additionalRev.financingCommission || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Insurance Premium Share:</span>
                      <span className="font-semibold">₹{(additionalRev.insuranceCommission || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Extended Warranty Sales:</span>
                      <span className="font-semibold">₹{(additionalRev.extendedWarranty || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Accessories Commissions:</span>
                      <span className="font-semibold">₹{(additionalRev.accessories || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Service Package Value:</span>
                      <span className="font-semibold">₹{(additionalRev.servicePackages || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-900 font-bold border-t border-dashed pt-2">
                      <span>Total Ancillary Add-ons:</span>
                      <span>₹{addRevTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Profit calculations */}
                  <div className="p-4 bg-green-50/80 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-green-700 uppercase block">Total Net Profit Generated</span>
                      <span className="text-xs text-green-600 font-medium">Formulated: Selling price - Purchase price + Commissions</span>
                    </div>
                    <span className="text-lg font-black text-green-950 flex items-center gap-0.5">
                      <IndianRupee size={16} />
                      {(sale.profit + addRevTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={14} className="text-gray-400" /> Payments & Compliance
                </h3>
                <div className="border border-gray-150 rounded-2xl p-4 bg-white divide-y divide-gray-100 space-y-3">
                  <div className="grid grid-cols-2 gap-4 pb-2">
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Payment Mode</span>
                      <span className="text-sm font-bold text-gray-800">{sale.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block font-medium">Finance Partner Approval</span>
                      <span className="text-sm font-bold text-gray-800">{sale.financeStatus}</span>
                    </div>
                  </div>
                  {sale.notes && (
                    <div className="pt-3">
                      <span className="text-xs text-gray-400 block font-medium mb-1">Dealership Log Notes</span>
                      <p className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-xl p-3 leading-relaxed">{sale.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Activity Timeline */}
              {sale.timeline && sale.timeline.length > 0 && (
                <div className="space-y-3 pb-8">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" /> Timeline of Activities
                  </h3>
                  <div className="border border-gray-150 rounded-2xl p-5 bg-white space-y-5">
                    {sale.timeline.map((log, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="relative flex flex-col items-center shrink-0">
                          <div className="w-3.5 h-3.5 rounded-full bg-accent border-2 border-white ring-4 ring-accent/15 z-10"></div>
                          {i !== sale.timeline.length - 1 && (
                            <div className="w-[1.5px] bg-gray-250 absolute top-3.5 bottom-0 -z-0"></div>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs text-gray-400 font-semibold">{log.date}</p>
                          <p className="text-sm font-bold text-gray-855">{log.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
