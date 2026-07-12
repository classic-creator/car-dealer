export const mockCars = [
  {
    id: '1',
    make: 'Tata',
    model: 'Harrier',
    variant: 'XZ+ Dark Edition',
    year: 2023,
    registrationNumber: 'MH-12-UX-4509',
    vin: 'MAT456983A890123L',
    price: 25000,
    purchasePrice: 20000,
    sellingPrice: 25000,
    discount: 500,
    tax: 1500,
    additionalCharges: 300,
    mileage: 12000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Midnight Black',
    seatingCapacity: 5,
    location: 'Mumbai Branch',
    status: 'Available',
    featured: true,
    addedDate: '2024-10-12',
    lastUpdated: '2024-10-15',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      safety: ['ABS', 'EBD', '6 Airbags', 'ESP', 'Traction Control', 'ADAS'],
      comfort: ['Panoramic Sunroof', 'Ventilated Seats', 'Power Driver Seat', 'Auto Climator'],
      entertainment: ['10.25-inch Touchscreen', 'JBL 9-speaker system', 'Android Auto', 'Apple CarPlay'],
      accessories: ['Floor Mats', 'Scuff Plates', 'Mud Flaps']
    },
    specs: {
      engine: '2.0L Kryotec Turbocharged',
      power: '170 hp @ 3750 rpm',
      torque: '350 Nm @ 1750 rpm',
      '0-60': '9.5s',
      drivetrain: 'FWD'
    },
    description: 'Pristine condition Tata Harrier Dark Edition. Single owner, dealer serviced, comprehensive warranty coverage.',
    ownerHistory: {
      ownerCount: 1,
      type: 'Individual',
      ownershipTransferDate: '2023-04-12'
    },
    documents: {
      rcStatus: 'Active',
      insuranceProvider: 'HDFC Ergo',
      insuranceType: 'Comprehensive',
      insuranceValidity: '2025-04-11',
      pucValidity: '2025-01-10'
    },
    inspectionStatus: {
      score: 92,
      result: 'Excellent',
      inspectionDate: '2024-10-14'
    },
    serviceHistory: [
      { date: '2023-10-10', mileage: 5000, type: 'First Free Service', cost: 0, description: 'Engine oil replacement and general checkup.' },
      { date: '2024-04-15', mileage: 10000, type: 'General Maintenance', cost: 150, description: 'Wheel alignment and filter cleaning.' }
    ],
    pricingHistory: [
      { date: '2024-10-12', price: 25500, type: 'Initial Listing' },
      { date: '2024-10-15', price: 25000, type: 'Price Drop Promo' }
    ],
    activityLog: [
      { date: '2024-10-12 10:00', user: 'Admin User', action: 'Created vehicle listing' },
      { date: '2024-10-14 14:30', user: 'Inspector John', action: 'Added 120-point inspection report' }
    ],
    notes: 'Very high interest on WhatsApp. Do not negotiate beyond $24,500.',
    soldPrice: null
  },
  {
    id: '2',
    make: 'Mahindra',
    model: 'XUV700',
    variant: 'AX7 Luxury Pack',
    year: 2022,
    registrationNumber: 'DL-3C-CC-9812',
    vin: 'MAM789123A781298K',
    price: 28000,
    purchasePrice: 23000,
    sellingPrice: 28000,
    discount: 0,
    tax: 1800,
    additionalCharges: 500,
    mileage: 24000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Everest White',
    seatingCapacity: 7,
    location: 'Delhi Branch',
    status: 'Available',
    featured: true,
    addedDate: '2024-10-10',
    lastUpdated: '2024-10-10',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      safety: ['7 Airbags', 'ADAS Level 2', 'AEB', 'Lane Keep Assist', 'Hill Hold'],
      comfort: ['Skyroof Panoramic', 'Dual-Zone Climate Control', 'Memory Seats'],
      entertainment: ['Dual HD Screens', 'Sony 12-speaker 3D Sound', 'Alexa Built-in'],
      accessories: ['Side Steps', 'Roof Rails']
    },
    specs: {
      engine: '2.0L mStallion Turbo Petrol',
      power: '200 hp @ 5000 rpm',
      torque: '380 Nm @ 1750 rpm',
      '0-60': '8.5s',
      drivetrain: 'AWD'
    },
    description: 'Top of the line Luxury Pack with AWD capability. Mint condition, clean service history.',
    ownerHistory: { ownerCount: 1, type: 'Individual', ownershipTransferDate: '2022-08-20' },
    documents: {
      rcStatus: 'Active',
      insuranceProvider: 'ICICI Lombard',
      insuranceType: 'Comprehensive',
      insuranceValidity: '2025-08-19',
      pucValidity: '2025-02-15'
    },
    inspectionStatus: { score: 95, result: 'Excellent', inspectionDate: '2024-10-10' },
    serviceHistory: [
      { date: '2023-08-15', mileage: 10000, type: 'Scheduled Service', cost: 120, description: 'Routine engine check and fluids replacement.' },
      { date: '2024-08-10', mileage: 20000, type: 'Scheduled Service', cost: 220, description: 'Brake pads replacement and wheel alignment.' }
    ],
    pricingHistory: [{ date: '2024-10-10', price: 28000, type: 'Initial Listing' }],
    activityLog: [{ date: '2024-10-10 11:15', user: 'Admin User', action: 'Created vehicle listing' }],
    notes: 'Premium customer base looking at this. Keep pricing firm.',
    soldPrice: null
  },
  {
    id: '3',
    make: 'Hyundai',
    model: 'Creta',
    variant: 'SX (O) IVT',
    year: 2021,
    registrationNumber: 'KA-03-MP-1122',
    vin: 'MAL245193B678901M',
    price: 18000,
    purchasePrice: 15000,
    sellingPrice: 18000,
    discount: 300,
    tax: 1200,
    additionalCharges: 200,
    mileage: 35000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Titan Grey',
    seatingCapacity: 5,
    location: 'Bangalore Branch',
    status: 'Available',
    featured: false,
    addedDate: '2024-09-25',
    lastUpdated: '2024-09-28',
    image: 'https://images.unsplash.com/photo-1629898083812-42173167195c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1629898083812-42173167195c?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      safety: ['ABS', 'ESP', '6 Airbags', 'Tyre Pressure Monitor', 'Rear Camera'],
      comfort: ['Panoramic Sunroof', 'Ventilated Front Seats', 'Air Purifier'],
      entertainment: ['Bose Premium Sound', '10.25-inch Infotainment', 'Wireless Charger'],
      accessories: ['Window Visors', 'Chrome Trim']
    },
    specs: {
      engine: '1.5L MPi Petrol',
      power: '113 hp @ 6300 rpm',
      torque: '144 Nm @ 4500 rpm',
      '0-60': '10.5s',
      drivetrain: 'FWD'
    },
    description: 'City driven, well maintained Hyundai Creta automatic. Extremely comfortable and practical.',
    ownerHistory: { ownerCount: 1, type: 'Individual', ownershipTransferDate: '2021-06-15' },
    documents: {
      rcStatus: 'Active',
      insuranceProvider: 'Bajaj Allianz',
      insuranceType: 'Comprehensive',
      insuranceValidity: '2025-06-14',
      pucValidity: '2024-12-15'
    },
    inspectionStatus: { score: 88, result: 'Good', inspectionDate: '2024-09-25' },
    serviceHistory: [
      { date: '2022-06-10', mileage: 10000, type: 'Scheduled Service', cost: 90 },
      { date: '2023-06-12', mileage: 20000, type: 'Scheduled Service', cost: 130 },
      { date: '2024-06-15', mileage: 30000, type: 'Scheduled Service', cost: 180 }
    ],
    pricingHistory: [
      { date: '2024-09-25', price: 18300, type: 'Initial Listing' },
      { date: '2024-09-28', price: 18000, type: 'Price Adjustment' }
    ],
    activityLog: [{ date: '2024-09-25 09:30', user: 'Admin User', action: 'Created vehicle listing' }],
    notes: 'Good running car, low maintenance. High resale demand.',
    soldPrice: null
  },
  {
    id: '4',
    make: 'Kia',
    model: 'Seltos',
    variant: 'GTX+ Diesel AT',
    year: 2022,
    registrationNumber: 'MH-14-GH-2323',
    vin: 'MAK418902A910398D',
    price: 19500,
    purchasePrice: 16500,
    sellingPrice: 19500,
    discount: 500,
    tax: 1300,
    additionalCharges: 300,
    mileage: 18000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Intense Red',
    seatingCapacity: 5,
    location: 'Mumbai Branch',
    status: 'Sold',
    featured: false,
    addedDate: '2024-08-15',
    lastUpdated: '2024-09-01',
    image: 'https://images.unsplash.com/photo-1606016159991-eea4ffebe074?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1606016159991-eea4ffebe074?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      safety: ['6 Airbags', '360 View Camera', 'Blind Spot Monitor', 'ESC', 'VCS'],
      comfort: ['HUD Head-Up Display', 'Ventilated Front Seats', 'Drive Modes'],
      entertainment: ['Bose Sound System', 'UVO Connected Car', 'Ambient Lighting'],
      accessories: ['Side Steps', 'Premium seat covers']
    },
    specs: {
      engine: '1.5L CRDi VGT Diesel',
      power: '115 hp @ 4000 rpm',
      torque: '250 Nm @ 1500-2750 rpm',
      '0-60': '11.0s',
      drivetrain: 'FWD'
    },
    description: 'Kia Seltos diesel top spec. Sporty looks combined with efficient diesel engine.',
    ownerHistory: { ownerCount: 1, type: 'Individual', ownershipTransferDate: '2022-03-10' },
    documents: {
      rcStatus: 'Transferred',
      insuranceProvider: 'Tata AIG',
      insuranceType: 'Comprehensive',
      insuranceValidity: '2025-03-09',
      pucValidity: '2024-09-10'
    },
    inspectionStatus: { score: 90, result: 'Excellent', inspectionDate: '2024-08-14' },
    serviceHistory: [
      { date: '2023-03-10', mileage: 10000, type: 'Scheduled Service', cost: 110 }
    ],
    pricingHistory: [{ date: '2024-08-15', price: 19500, type: 'Initial Listing' }],
    activityLog: [
      { date: '2024-08-15 12:00', user: 'Admin User', action: 'Created vehicle listing' },
      { date: '2024-09-01 16:20', user: 'Admin User', action: 'Marked as Sold' }
    ],
    notes: 'Sold to Robert Fox. Paperwork completed successfully.',
    soldPrice: 19000
  },
  {
    id: '5',
    make: 'Toyota',
    model: 'Fortuner',
    variant: 'Legender 4x4 AT',
    year: 2020,
    registrationNumber: 'TN-01-BK-7777',
    vin: 'MAT908312B901398M',
    price: 38000,
    purchasePrice: 32000,
    sellingPrice: 38000,
    discount: 0,
    tax: 2500,
    additionalCharges: 800,
    mileage: 65000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    bodyType: 'SUV',
    color: 'Pearl White / Black Roof',
    seatingCapacity: 7,
    location: 'Chennai Branch',
    status: 'Available',
    featured: false,
    addedDate: '2024-10-18',
    lastUpdated: '2024-10-18',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800'
    ],
    features: {
      safety: ['7 Airbags', 'Vehicle Stability Control', 'Hill Assist Control', 'A-TRC'],
      comfort: ['Power Tailgate with Kick Sensor', 'Ventilated Front Seats', 'Dual Zone AC'],
      entertainment: ['JBL Premium Audio', '9-inch Infotainment', 'Apple CarPlay'],
      accessories: ['Legender Body Kit', 'Wireless Charger']
    },
    specs: {
      engine: '2.8L GD Turbo Diesel',
      power: '201 hp @ 3400 rpm',
      torque: '500 Nm @ 1600-2800 rpm',
      '0-60': '9.8s',
      drivetrain: '4WD'
    },
    description: 'Immaculate condition Fortuner Legender. Highly reliable SUV, handles off-roading with ease.',
    ownerHistory: { ownerCount: 2, type: 'Individual', ownershipTransferDate: '2022-11-05' },
    documents: {
      rcStatus: 'Active',
      insuranceProvider: 'National Insurance',
      insuranceType: 'Comprehensive',
      insuranceValidity: '2025-11-04',
      pucValidity: '2025-04-17'
    },
    inspectionStatus: { score: 86, result: 'Good', inspectionDate: '2024-10-17' },
    serviceHistory: [
      { date: '2021-10-10', mileage: 15000, type: 'Scheduled Service', cost: 150 },
      { date: '2022-10-15', mileage: 30000, type: 'Scheduled Service', cost: 180 },
      { date: '2023-10-18', mileage: 45000, type: 'Scheduled Service', cost: 320 },
      { date: '2024-10-05', mileage: 60000, type: 'Major Maintenance Service', cost: 650, description: 'All fluids changed, brake pads replaced.' }
    ],
    pricingHistory: [{ date: '2024-10-18', price: 38000, type: 'Initial Listing' }],
    activityLog: [{ date: '2024-10-18 15:45', user: 'Admin User', action: 'Created vehicle listing' }],
    notes: 'Very high resale value model. Price negotiations should be very tight.',
    soldPrice: null
  }
];

export const mockBrands = [
  { id: '1', name: 'Tata', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
  { id: '2', name: 'Mahindra', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
  { id: '3', name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Porsche_Wappen.svg/1200px-Porsche_Wappen.svg.png' },
  { id: '4', name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { id: '5', name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' }
];
