import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Upload, Plus, X, Save, ArrowRight, ArrowLeft, Check, CheckCircle2, DollarSign, Eye, Info, Sparkles } from 'lucide-react';
import { addCar, updateCar, fetchCars } from '../../redux/slices/carsSlice';

const AddCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isEditMode = Boolean(id);
  const { cars = [], status } = useSelector(state => state.cars);
  const carToEdit = isEditMode ? cars.find(c => c.id === id) : null;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      make: '',
      model: '',
      variant: '',
      year: new Date().getFullYear(),
      vin: '',
      registrationNumber: '',
      purchasePrice: '',
      price: '',
      discount: 0,
      tax: 0,
      additionalCharges: 0,
      mileage: '',
      bodyType: 'SUV',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      color: '',
      seatingCapacity: 5,
      location: 'Main Showroom',
      status: 'Available',
      featured: false,
      description: '',
      ownerCount: 1,
      ownerType: 'Individual',
      rcStatus: 'Active',
      insuranceProvider: '',
      insuranceType: 'Comprehensive',
      insuranceValidity: '',
      pucValidity: '',
      inspectionScore: 90,
      inspectionResult: 'Excellent'
    }
  });

  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);
  
  // Watch prices to compute profit margin dynamically
  const watchPurchasePrice = watch('purchasePrice');
  const watchSellingPrice = watch('price');
  const watchTax = watch('tax');
  const watchCharges = watch('additionalCharges');
  
  const profitMargin = (parseFloat(watchSellingPrice) || 0) - (parseFloat(watchPurchasePrice) || 0) - (parseFloat(watchTax) || 0) - (parseFloat(watchCharges) || 0);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCars());
    }
  }, [status, dispatch]);

  // Load existing details for edit mode
  useEffect(() => {
    if (isEditMode && carToEdit) {
      setValue('make', carToEdit.make || '');
      setValue('model', carToEdit.model || '');
      setValue('variant', carToEdit.variant || '');
      setValue('year', carToEdit.year || 2023);
      setValue('vin', carToEdit.vin || '');
      setValue('registrationNumber', carToEdit.registrationNumber || '');
      setValue('purchasePrice', carToEdit.purchasePrice || '');
      setValue('price', carToEdit.price || '');
      setValue('discount', carToEdit.discount || 0);
      setValue('tax', carToEdit.tax || 0);
      setValue('additionalCharges', carToEdit.additionalCharges || 0);
      setValue('mileage', carToEdit.mileage || '');
      setValue('bodyType', carToEdit.bodyType || 'SUV');
      setValue('transmission', carToEdit.transmission || 'Automatic');
      setValue('fuelType', carToEdit.fuelType || 'Petrol');
      setValue('color', carToEdit.color || '');
      setValue('seatingCapacity', carToEdit.seatingCapacity || 5);
      setValue('location', carToEdit.location || 'Main Showroom');
      setValue('status', carToEdit.status || 'Available');
      setValue('featured', carToEdit.featured || false);
      setValue('description', carToEdit.description || '');
      
      if (carToEdit.ownerHistory) {
        setValue('ownerCount', carToEdit.ownerHistory.ownerCount || 1);
        setValue('ownerType', carToEdit.ownerHistory.type || 'Individual');
      }
      if (carToEdit.documents) {
        setValue('rcStatus', carToEdit.documents.rcStatus || 'Active');
        setValue('insuranceProvider', carToEdit.documents.insuranceProvider || '');
        setValue('insuranceType', carToEdit.documents.insuranceType || 'Comprehensive');
        setValue('insuranceValidity', carToEdit.documents.insuranceValidity || '');
        setValue('pucValidity', carToEdit.documents.pucValidity || '');
      }
      if (carToEdit.inspectionStatus) {
        setValue('inspectionScore', carToEdit.inspectionStatus.score || 90);
        setValue('inspectionResult', carToEdit.inspectionStatus.result || 'Excellent');
      }

      if (carToEdit.image) {
        setImages(carToEdit.images || [carToEdit.image]);
      }
    }
  }, [isEditMode, carToEdit, setValue]);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      const newImages = fileList.map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    const finalCarData = {
      make: data.make,
      model: data.model,
      variant: data.variant,
      year: parseInt(data.year),
      vin: data.vin,
      registrationNumber: data.registrationNumber,
      price: parseFloat(data.price),
      purchasePrice: parseFloat(data.purchasePrice),
      sellingPrice: parseFloat(data.price),
      discount: parseFloat(data.discount),
      tax: parseFloat(data.tax),
      additionalCharges: parseFloat(data.additionalCharges),
      mileage: parseInt(data.mileage),
      bodyType: data.bodyType,
      transmission: data.transmission,
      fuelType: data.fuelType,
      color: data.color,
      seatingCapacity: parseInt(data.seatingCapacity),
      location: data.location,
      status: data.status,
      featured: data.featured,
      description: data.description,
      image: images[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800'],
      features: {
        safety: ['ABS', 'EBD', '6 Airbags'],
        comfort: ['Panoramic Sunroof', 'Ventilated Seats'],
        entertainment: ['Touchscreen Infotainment'],
        accessories: ['Floor Mats']
      },
      specs: {
        engine: '1.5L / 2.0L Engine Block',
        power: '150 hp',
        torque: '250 Nm',
        '0-60': '9.0s',
        drivetrain: 'FWD'
      },
      ownerHistory: {
        ownerCount: parseInt(data.ownerCount),
        type: data.ownerType,
        ownershipTransferDate: new Date().toISOString().split('T')[0]
      },
      documents: {
        rcStatus: data.rcStatus,
        insuranceProvider: data.insuranceProvider,
        insuranceType: data.insuranceType,
        insuranceValidity: data.insuranceValidity,
        pucValidity: data.pucValidity
      },
      inspectionStatus: {
        score: parseInt(data.inspectionScore),
        result: data.inspectionResult,
        inspectionDate: new Date().toISOString().split('T')[0]
      },
      serviceHistory: carToEdit?.serviceHistory || [],
      pricingHistory: carToEdit?.pricingHistory || [
        { date: new Date().toISOString().split('T')[0], price: parseFloat(data.price), type: 'Initial Listing' }
      ],
      activityLog: carToEdit?.activityLog || [
        { date: new Date().toISOString().replace('T', ' ').substring(0, 16), user: 'Admin User', action: 'Created vehicle profile' }
      ],
      addedDate: carToEdit?.addedDate || new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    if (isEditMode) {
      dispatch(updateCar({ id: carToEdit.id, carData: finalCarData }));
      alert('Vehicle profile updated successfully!');
    } else {
      const newId = `C-${Math.floor(1000 + Math.random() * 9000)}`;
      dispatch(addCar({ ...finalCarData, id: newId }));
      alert('New vehicle added to inventory!');
    }

    navigate('/admin/cars');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Form Top Navigation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {isEditMode ? 'Edit Vehicle Profile' : 'Add New Vehicle'}
          </h2>
          <p className="text-sm text-gray-500">Configure vehicle pricing, documents, engine specs, features, and media.</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
          {[1, 2, 3, 4, 5].map((s) => (
            <React.Fragment key={s}>
              {s > 1 && <div className={`w-6 h-0.5 ${step >= s ? 'bg-accent' : 'bg-gray-200'}`}></div>}
              <span className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold border transition-colors ${
                step === s ? 'bg-accent border-accent text-white' : 
                step > s ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 text-gray-400'
              }`}>
                {s}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div className="p-8 space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
              <Info className="text-accent" size={20} />
              Basic Vehicle Profiling
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Brand / Manufacturer</label>
                <select {...register('make', { required: true })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent focus:border-accent outline-none">
                  <option value="">Select Brand...</option>
                  <option value="Tata">Tata</option>
                  <option value="Mahindra">Mahindra</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Kia">Kia</option>
                  <option value="Toyota">Toyota</option>
                </select>
                {errors.make && <span className="text-xs text-red-500 font-bold mt-1 block">Brand is required</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Model</label>
                <input {...register('model', { required: true })} type="text" placeholder="e.g. Harrier" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
                {errors.model && <span className="text-xs text-red-500 font-bold mt-1 block">Model is required</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Variant / Trim</label>
                <input {...register('variant')} type="text" placeholder="e.g. XZ+ Dark Edition" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Manufacturing Year</label>
                <input {...register('year', { required: true })} type="number" placeholder="2023" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Chassis / VIN Number</label>
                <input {...register('vin', { required: true })} type="text" placeholder="17-char VIN" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none uppercase font-mono" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Registration Number</label>
                <input {...register('registrationNumber')} type="text" placeholder="e.g. MH-12-UX-4509" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none uppercase font-bold" />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pricing & Profits */}
        {step === 2 && (
          <div className="p-8 space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
              <DollarSign className="text-accent" size={20} />
              Financial Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Purchase Price (₹)</label>
                <input {...register('purchasePrice', { required: true })} type="number" placeholder="2000000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none font-bold" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Selling Price (₹)</label>
                <input {...register('price', { required: true })} type="number" placeholder="2500000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none font-bold text-green-600" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Flat Discount (₹)</label>
                <input {...register('discount')} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Local Taxes (₹)</label>
                <input {...register('tax')} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Additional Repair/Prep Charges (₹)</label>
                <input {...register('additionalCharges')} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              {/* Profit margin preview */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col justify-center">
                <span className="text-green-700 text-xs font-bold uppercase">Calculated Profit Margin</span>
                <span className="text-xl font-black text-green-900 mt-1">₹{profitMargin.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Back
              </button>
              <button type="button" onClick={() => setStep(3)} className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Specifications */}
        {step === 3 && (
          <div className="p-8 space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
              <Sparkles className="text-accent" size={20} />
              Technical Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Body Type</label>
                <select {...register('bodyType')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Transmission</label>
                <select {...register('transmission')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Fuel Type</label>
                <select {...register('fuelType')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Mileage (mi / km)</label>
                <input {...register('mileage', { required: true })} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Paint Color</label>
                <input {...register('color')} type="text" placeholder="e.g. Midnight Black" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Seating Capacity</label>
                <input {...register('seatingCapacity')} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Branch / Location Hub</label>
                <select {...register('location')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="Mumbai Branch">Mumbai Branch</option>
                  <option value="Delhi Branch">Delhi Branch</option>
                  <option value="Bangalore Branch">Bangalore Branch</option>
                  <option value="Chennai Branch">Chennai Branch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Initial Status</label>
                <select {...register('status')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="Draft">Draft</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input {...register('featured')} type="checkbox" id="featured" className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent" />
                <label htmlFor="featured" className="text-sm font-bold text-gray-700 cursor-pointer">Mark as Featured Vehicle</label>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Back
              </button>
              <button type="button" onClick={() => setStep(4)} className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Ownership & History */}
        {step === 4 && (
          <div className="p-8 space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
              <CheckCircle2 className="text-accent" size={20} />
              Documents, History & Inspections
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Owner Count</label>
                <input {...register('ownerCount')} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Ownership Type</label>
                <select {...register('ownerType')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="Individual">Individual</option>
                  <option value="Corporate">Corporate / Fleet</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">RC Validity Status</label>
                <select {...register('rcStatus')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="Active">Active / Valid</option>
                  <option value="Expired">Expired</option>
                  <option value="Transferred">Transferred</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Insurance Provider</label>
                <input {...register('insuranceProvider')} type="text" placeholder="e.g. HDFC Ergo" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Insurance Validity</label>
                <input {...register('insuranceValidity')} type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none text-xs" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">PUC Certificate Expiry</label>
                <input {...register('pucValidity')} type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none text-xs" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Inspection Score (1-100)</label>
                <input {...register('inspectionScore')} type="number" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Inspection Results</label>
                <select {...register('inspectionResult')} className="w-full px-3 py-2.5 border border-gray-300 rounded-xl outline-none bg-white">
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good / Well Maintained</option>
                  <option value="Fair">Fair / Needs Repairs</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <button type="button" onClick={() => setStep(3)} className="px-6 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Back
              </button>
              <button type="button" onClick={() => setStep(5)} className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Media Upload & Save */}
        {step === 5 && (
          <div className="p-8 space-y-6 animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b pb-3">
              <Upload className="text-accent" size={20} />
              Media Catalog & Gallery
            </h3>

            <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-100 hover:border-accent transition-all cursor-pointer relative">
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center text-accent mb-4 border border-gray-100">
                <Upload size={24} />
              </div>
              <h4 className="text-base font-bold text-gray-900">Click or Drag images here to upload</h4>
              <p className="text-gray-400 text-xs mt-1">First uploaded image will act as the catalog listing cover image.</p>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden group shadow-sm border border-gray-200">
                    <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => removeImage(idx)} className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                    {idx === 0 && (
                      <div className="absolute top-2 left-2 bg-accent text-white text-[9px] font-black px-2 py-0.5 rounded border border-accent">COVER IMAGE</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 pt-4">
              <label className="block text-xs font-bold text-gray-600 uppercase">Public Vehicle Description</label>
              <textarea {...register('description')} rows={4} placeholder="Write a public facing bio detailing condition, warranty, features..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-1 focus:ring-accent outline-none text-sm" />
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <button type="button" onClick={() => setStep(4)} className="px-6 py-2.5 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                Back
              </button>
              <button type="submit" className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md shadow-accent/20 hover:scale-[1.02]">
                <Save size={18} /> {isEditMode ? 'Update Vehicle' : 'Publish Vehicle'}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
};

export default AddCar;
