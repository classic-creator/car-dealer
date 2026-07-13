import { mockCars } from '../utils/mockData';

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate rich mock sales data spanning January 2026 to July 2026
export const mockSales = [
  {
    invoiceNumber: 'INV-2026-0001',
    saleDate: '2026-01-12',
    customerName: 'Aarav Mehta',
    customerContact: '+91 98200 12345',
    vehicleId: '1',
    vehicle: '2023 Tata Harrier XZ+',
    vin: 'MAT456983A890123L',
    brand: 'Tata',
    model: 'Harrier',
    year: 2023,
    bodyType: 'SUV',
    fuelType: 'Diesel',
    salesExecutive: 'Rajesh Sharma',
    purchasePrice: 2000000,
    sellingPrice: 2500000,
    discount: 50000,
    tax: 150000,
    profit: 450000,
    paymentMethod: 'Finance - HDFC Bank',
    financeStatus: 'Approved',
    branch: 'Mumbai Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 35000,
      extendedWarranty: 15000,
      insuranceCommission: 25000,
      accessories: 12000,
      servicePackages: 10000
    },
    timeline: [
      { date: '2026-01-08 10:00', event: 'Lead Created' },
      { date: '2026-01-10 14:00', event: 'Test Drive Completed' },
      { date: '2026-01-12 11:30', event: 'Payment Confirmed & Delivered' }
    ],
    notes: 'Customer requested quick delivery. Opted for standard 2-year warranty extension.'
  },
  {
    invoiceNumber: 'INV-2026-0002',
    saleDate: '2026-02-18',
    customerName: 'Aditya Patel',
    customerContact: '+91 98790 65432',
    vehicleId: '2',
    vehicle: '2022 Mahindra XUV700 AX7',
    vin: 'MAM789123A781298K',
    brand: 'Mahindra',
    model: 'XUV700',
    year: 2022,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    salesExecutive: 'Amit Patel',
    purchasePrice: 2300000,
    sellingPrice: 2800000,
    discount: 0,
    tax: 180000,
    profit: 500000,
    paymentMethod: 'Finance - ICICI Bank',
    financeStatus: 'Approved',
    branch: 'Delhi Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 40000,
      extendedWarranty: 20000,
      insuranceCommission: 28000,
      accessories: 18000,
      servicePackages: 12000
    },
    timeline: [
      { date: '2026-02-12 11:00', event: 'Lead Created' },
      { date: '2026-02-18 16:30', event: 'Payment Received & Handover' }
    ],
    notes: 'AWD Variant. Sold at list retail value with premium accessory package.'
  },
  {
    invoiceNumber: 'INV-2026-0003',
    saleDate: '2026-03-25',
    customerName: 'Karan Nair',
    customerContact: '+91 80560 98765',
    vehicleId: '3',
    vehicle: '2021 Hyundai Creta SX',
    vin: 'MAL245193B678901M',
    brand: 'Hyundai',
    model: 'Creta',
    year: 2021,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    salesExecutive: 'Priya Nair',
    purchasePrice: 1500000,
    sellingPrice: 1800000,
    discount: 30000,
    tax: 120000,
    profit: 270000,
    paymentMethod: 'Cash - Bank Transfer',
    financeStatus: 'Approved',
    branch: 'Bangalore Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 0,
      extendedWarranty: 12000,
      insuranceCommission: 18000,
      accessories: 8000,
      servicePackages: 8000
    },
    timeline: [
      { date: '2026-03-20 15:00', event: 'Inspection Completed' },
      { date: '2026-03-25 12:00', event: 'Invoice Paid' }
    ],
    notes: 'Single owner, city-driven vehicle. Smooth transaction, quick cash transfer.'
  },
  {
    invoiceNumber: 'INV-2026-0004',
    saleDate: '2026-04-05',
    customerName: 'Sneha Rao',
    customerContact: '+91 94440 11223',
    vehicleId: '4',
    vehicle: '2022 Kia Seltos GTX+',
    vin: 'MAK418902A910398D',
    brand: 'Kia',
    model: 'Seltos',
    year: 2022,
    bodyType: 'SUV',
    fuelType: 'Diesel',
    salesExecutive: 'Sneha Rao',
    purchasePrice: 1650000,
    sellingPrice: 1950000,
    discount: 50000,
    tax: 130000,
    profit: 250000,
    paymentMethod: 'Finance - Axis Bank',
    financeStatus: 'Approved',
    branch: 'Mumbai Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 25000,
      extendedWarranty: 15000,
      insuranceCommission: 20000,
      accessories: 10000,
      servicePackages: 10000
    },
    timeline: [
      { date: '2026-03-28 10:30', event: 'Lead assigned' },
      { date: '2026-04-05 14:00', event: 'Completed' }
    ],
    notes: 'Sold to repeat buyer. Extended service pack included.'
  },
  {
    invoiceNumber: 'INV-2026-0005',
    saleDate: '2026-05-15',
    customerName: 'Vikram Singh',
    customerContact: '+91 99100 88776',
    vehicleId: '5',
    vehicle: '2020 Toyota Fortuner Legender',
    vin: 'MAT908312B901398M',
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2020,
    bodyType: 'SUV',
    fuelType: 'Diesel',
    salesExecutive: 'Vikram Singh',
    purchasePrice: 3200000,
    sellingPrice: 3800000,
    discount: 0,
    tax: 250000,
    profit: 600000,
    paymentMethod: 'Finance - SBI',
    financeStatus: 'Approved',
    branch: 'Chennai Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 55000,
      extendedWarranty: 25000,
      insuranceCommission: 38000,
      accessories: 25000,
      servicePackages: 15000
    },
    notes: 'Premium Fortuner Legender model. Retained listing price due to high demand.'
  },
  {
    invoiceNumber: 'INV-2026-0006',
    saleDate: '2026-06-02',
    customerName: 'Ananya Deshmukh',
    customerContact: '+91 98199 88888',
    vehicleId: '1',
    vehicle: '2023 Toyota Camry Hybrid',
    vin: 'TOY569218E129381A',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    bodyType: 'Sedan',
    fuelType: 'Hybrid',
    salesExecutive: 'Rajesh Sharma',
    purchasePrice: 3500000,
    sellingPrice: 4100000,
    discount: 100000,
    tax: 300000,
    profit: 500000,
    paymentMethod: 'Cash - Bank Transfer',
    financeStatus: 'Approved',
    branch: 'Mumbai Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 0,
      extendedWarranty: 30000,
      insuranceCommission: 45000,
      accessories: 15000,
      servicePackages: 20000
    },
    notes: 'Camry Hybrid. High margins, prompt cashier clearance.'
  },
  {
    invoiceNumber: 'INV-2026-0007',
    saleDate: '2026-06-18',
    customerName: 'Rahul Verma',
    customerContact: '+91 99999 11111',
    vehicleId: '2',
    vehicle: '2021 BMW 3 Series 330i',
    vin: 'BMW330I48102948AB',
    brand: 'BMW',
    model: '3 Series',
    year: 2021,
    bodyType: 'Luxury',
    fuelType: 'Petrol',
    salesExecutive: 'Amit Patel',
    purchasePrice: 2800000,
    sellingPrice: 3400000,
    discount: 50000,
    tax: 220000,
    profit: 550000,
    paymentMethod: 'Finance - HDFC Bank',
    financeStatus: 'Approved',
    branch: 'Delhi Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 48000,
      extendedWarranty: 35000,
      insuranceCommission: 40000,
      accessories: 12000,
      servicePackages: 25000
    },
    notes: 'BMW M Sport Package. Negotiated minor discount. Delivery executed on time.'
  },
  {
    invoiceNumber: 'INV-2026-07-01',
    saleDate: '2026-07-01',
    customerName: 'Deepak Joshi',
    customerContact: '+91 98888 22222',
    vehicleId: '3',
    vehicle: '2022 Porsche Taycan Electric',
    vin: 'POR911TAYCAN789AB',
    brand: 'Porsche',
    model: 'Taycan',
    year: 2022,
    bodyType: 'Electric',
    fuelType: 'Electric',
    salesExecutive: 'Priya Nair',
    purchasePrice: 8500000,
    sellingPrice: 9900000,
    discount: 200000,
    tax: 600000,
    profit: 1200000,
    paymentMethod: 'Finance - ICICI Bank',
    financeStatus: 'Approved',
    branch: 'Bangalore Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 120000,
      extendedWarranty: 80000,
      insuranceCommission: 95000,
      accessories: 50000,
      servicePackages: 40000
    },
    notes: 'Premium electric vehicle sale. High financing and warranty commission gains.'
  },
  {
    invoiceNumber: 'INV-2026-07-08',
    saleDate: '2026-07-08',
    customerName: 'Meera Iyer',
    customerContact: '+91 97777 33333',
    vehicleId: '4',
    vehicle: '2023 Tesla Model Y Long Range',
    vin: 'TSLMY98492819AB12',
    brand: 'Tesla',
    model: 'Model Y',
    year: 2023,
    bodyType: 'Electric',
    fuelType: 'Electric',
    salesExecutive: 'Sneha Rao',
    purchasePrice: 4200000,
    sellingPrice: 4900000,
    discount: 50000,
    tax: 350000,
    profit: 650000,
    paymentMethod: 'Finance - HDFC Bank',
    financeStatus: 'Approved',
    branch: 'Mumbai Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 65000,
      extendedWarranty: 40000,
      insuranceCommission: 55000,
      accessories: 20000,
      servicePackages: 25000
    },
    notes: 'Imported vehicle. Financed through preferred partner HDFC.'
  },
  {
    invoiceNumber: 'INV-2026-07-10',
    saleDate: '2026-07-10',
    customerName: 'Sanjay Dutt',
    customerContact: '+91 96666 44444',
    vehicleId: '5',
    vehicle: '2024 Honda City Hybrid ZX',
    vin: 'HONCITYH20249821A',
    brand: 'Honda',
    model: 'City',
    year: 2024,
    bodyType: 'Sedan',
    fuelType: 'Hybrid',
    salesExecutive: 'Vikram Singh',
    purchasePrice: 1600000,
    sellingPrice: 1950000,
    discount: 20000,
    tax: 110000,
    profit: 330000,
    paymentMethod: 'Cash - Self Cheque',
    financeStatus: 'Approved',
    branch: 'Chennai Branch',
    deliveryStatus: 'Pending',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 0,
      extendedWarranty: 15000,
      insuranceCommission: 22000,
      accessories: 10000,
      servicePackages: 10000
    },
    notes: 'Delivery scheduled for next week. Registration plates pending.'
  },
  {
    invoiceNumber: 'INV-2026-07-12',
    saleDate: '2026-07-12',
    customerName: 'Vikram Malhotra',
    customerContact: '+91 95555 55555',
    vehicleId: '1',
    vehicle: '2022 Hyundai Tucson Signature',
    vin: 'HYUTUC2022987123A',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    bodyType: 'SUV',
    fuelType: 'Diesel',
    salesExecutive: 'Rajesh Sharma',
    purchasePrice: 2400000,
    sellingPrice: 2850000,
    discount: 50000,
    tax: 170000,
    profit: 400000,
    paymentMethod: 'Finance - ICICI Bank',
    financeStatus: 'Approved',
    branch: 'Mumbai Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 38000,
      extendedWarranty: 20000,
      insuranceCommission: 30000,
      accessories: 15000,
      servicePackages: 12000
    },
    notes: 'Sold on the weekend. Delivery completed. Registration plate attached.'
  },
  {
    invoiceNumber: 'INV-2026-07-13',
    saleDate: '2026-07-13',
    customerName: 'Prakash Raj',
    customerContact: '+91 94444 66666',
    vehicleId: '2',
    vehicle: '2023 Mahindra Thar LX 4x4',
    vin: 'MAHTHAR202319028A',
    brand: 'Mahindra',
    model: 'Thar',
    year: 2023,
    bodyType: 'SUV',
    fuelType: 'Petrol',
    salesExecutive: 'Amit Patel',
    purchasePrice: 1300000,
    sellingPrice: 1650000,
    discount: 10000,
    tax: 95000,
    profit: 340000,
    paymentMethod: 'Cash - Bank Transfer',
    financeStatus: 'Approved',
    branch: 'Delhi Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 0,
      extendedWarranty: 12000,
      insuranceCommission: 18000,
      accessories: 25000,
      servicePackages: 8000
    },
    notes: 'Thar Petrol LX AT. Loaded with off-road accessories.'
  },
  {
    invoiceNumber: 'INV-2026-0008',
    saleDate: '2026-05-20',
    customerName: 'Sunita Krishnan',
    customerContact: '+91 93333 77777',
    vehicleId: '3',
    vehicle: '2021 Audi A6 Technology',
    vin: 'AUDIA6TECH202198A',
    brand: 'Audi',
    model: 'A6',
    year: 2021,
    bodyType: 'Luxury',
    fuelType: 'Petrol',
    salesExecutive: 'Priya Nair',
    purchasePrice: 3800000,
    sellingPrice: 4400000,
    discount: 50000,
    tax: 270000,
    profit: 550000,
    paymentMethod: 'Finance - SBI',
    financeStatus: 'Approved',
    branch: 'Bangalore Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 50000,
      extendedWarranty: 35000,
      insuranceCommission: 42000,
      accessories: 15000,
      servicePackages: 25000
    },
    notes: 'Premium executive sedan. Retained high profit margin.'
  },
  {
    invoiceNumber: 'INV-2026-0009',
    saleDate: '2026-04-14',
    customerName: 'Kunal Kapoor',
    customerContact: '+91 92222 88888',
    vehicleId: '4',
    vehicle: '2022 Lexus ES 300h',
    vin: 'LEXUSES20227718A98',
    brand: 'Lexus',
    model: 'ES',
    year: 2022,
    bodyType: 'Luxury',
    fuelType: 'Hybrid',
    salesExecutive: 'Sneha Rao',
    purchasePrice: 4800000,
    sellingPrice: 5600000,
    discount: 100000,
    tax: 380000,
    profit: 700000,
    paymentMethod: 'Finance - HDFC Bank',
    financeStatus: 'Approved',
    branch: 'Mumbai Branch',
    deliveryStatus: 'Delivered',
    invoiceStatus: 'Paid',
    additionalRevenue: {
      financingCommission: 75000,
      extendedWarranty: 45000,
      insuranceCommission: 60000,
      accessories: 25000,
      servicePackages: 30000
    },
    notes: 'Lexus Hybrid Luxury Sedan. Client highly satisfied with test drive experience.'
  },
  {
    invoiceNumber: 'INV-2026-0010',
    saleDate: '2026-06-25',
    customerName: 'Nisha Gupta',
    customerContact: '+91 91111 99999',
    vehicleId: '5',
    vehicle: '2023 Kia EV6 GT-Line',
    vin: 'KIAEV62023GT908A1B',
    brand: 'Kia',
    model: 'EV6',
    year: 2023,
    bodyType: 'Electric',
    fuelType: 'Electric',
    salesExecutive: 'Vikram Singh',
    purchasePrice: 5200000,
    sellingPrice: 5900000,
    discount: 0,
    tax: 420000,
    profit: 700000,
    paymentMethod: 'Finance - Axis Bank',
    financeStatus: 'Approved',
    branch: 'Chennai Branch',
    deliveryStatus: 'Cancelled',
    invoiceStatus: 'Refunded',
    additionalRevenue: {
      financingCommission: 0,
      extendedWarranty: 0,
      insuranceCommission: 0,
      accessories: 0,
      servicePackages: 0
    },
    notes: 'Sale cancelled by customer due to personal reasons. Complete refund processed.'
  }
];

const reportsService = {
  // Fetch detailed summary metrics based on filters
  getDashboardKPIs: async (filters = {}) => {
    await delay(600);
    const sales = filterSales(mockSales, filters);

    // Filter active sales (not cancelled)
    const activeSales = sales.filter(s => s.deliveryStatus !== 'Cancelled');

    // Calculations
    const totalVehiclesSold = activeSales.length;

    let totalRevenue = 0;
    let grossProfit = 0;
    let totalTax = 0;
    let additionalRevSum = 0;

    activeSales.forEach(s => {
      const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
      additionalRevSum += addRev;
      totalRevenue += s.sellingPrice - s.discount + addRev;
      grossProfit += s.sellingPrice - s.purchasePrice - s.discount;
      totalTax += s.tax;
    });

    const netProfit = grossProfit + additionalRevSum - totalTax * 0.15; // Operating deduction

    const averageSellingPrice = totalVehiclesSold > 0 ? Math.round((totalRevenue - additionalRevSum) / totalVehiclesSold) : 0;
    const averageProfitPerVehicle = totalVehiclesSold > 0 ? Math.round(grossProfit / totalVehiclesSold) : 0;

    const pendingDeliveries = activeSales.filter(s => s.deliveryStatus === 'Pending').length;
    const cancelledSales = sales.filter(s => s.deliveryStatus === 'Cancelled').length;
    const refundedSales = sales.filter(s => s.invoiceStatus === 'Refunded').length;

    // Filter current date sales vs historic
    const today = new Date('2026-07-13').toISOString().split('T')[0];
    const todaySales = activeSales.filter(s => s.saleDate === today);
    const todayRevenue = todaySales.reduce((sum, s) => {
      const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
      return sum + s.sellingPrice - s.discount + addRev;
    }, 0);

    // Week's sales (July 7 to July 13, 2026)
    const thisWeekSales = activeSales.filter(s => {
      const d = new Date(s.saleDate);
      return d >= new Date('2026-07-07') && d <= new Date('2026-07-13');
    });
    const weekRevenue = thisWeekSales.reduce((sum, s) => {
      const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
      return sum + s.sellingPrice - s.discount + addRev;
    }, 0);

    // Month's sales (July 2026)
    const thisMonthSales = activeSales.filter(s => s.saleDate.startsWith('2026-07'));
    const monthRevenue = thisMonthSales.reduce((sum, s) => {
      const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
      return sum + s.sellingPrice - s.discount + addRev;
    }, 0);

    // Year's sales (2026)
    const thisYearSales = activeSales.filter(s => s.saleDate.startsWith('2026'));
    const yearRevenue = thisYearSales.reduce((sum, s) => {
      const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
      return sum + s.sellingPrice - s.discount + addRev;
    }, 0);

    return {
      totalSales: totalVehiclesSold,
      totalRevenue,
      grossProfit,
      netProfit,
      totalVehiclesSold,
      averageSellingPrice,
      averageProfitPerVehicle,
      pendingDeliveries,
      cancelledSales,
      refundedSales,
      todayRevenue,
      weekRevenue,
      monthRevenue,
      yearRevenue,
      todaySalesCount: todaySales.length,
      weekSalesCount: thisWeekSales.length,
      monthSalesCount: thisMonthSales.length,
      yearSalesCount: thisYearSales.length,
      // Target statistics
      trends: {
        totalRevenue: { pct: 14.8, isUp: true, label: 'vs last month' },
        totalSales: { pct: 8.5, isUp: true, label: 'vs last month' },
        grossProfit: { pct: 11.2, isUp: true, label: 'vs last month' },
        netProfit: { pct: 15.4, isUp: true, label: 'vs last month' }
      }
    };
  },

  // Fetch charts breakdown
  getAnalyticsCharts: async (filters = {}) => {
    await delay(700);
    const sales = filterSales(mockSales, filters).filter(s => s.deliveryStatus !== 'Cancelled');

    // 1. Revenue Analytics (Monthly)
    const monthlyRevMap = {
      'Jan': { revenue: 0, profit: 0, units: 0 },
      'Feb': { revenue: 0, profit: 0, units: 0 },
      'Mar': { revenue: 0, profit: 0, units: 0 },
      'Apr': { revenue: 0, profit: 0, units: 0 },
      'May': { revenue: 0, profit: 0, units: 0 },
      'Jun': { revenue: 0, profit: 0, units: 0 },
      'Jul': { revenue: 0, profit: 0, units: 0 }
    };

    sales.forEach(s => {
      const d = new Date(s.saleDate);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mLabel = months[d.getMonth()];
      if (monthlyRevMap[mLabel]) {
        const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
        const rev = s.sellingPrice - s.discount + addRev;
        const prof = s.sellingPrice - s.purchasePrice - s.discount + addRev;
        monthlyRevMap[mLabel].revenue += rev;
        monthlyRevMap[mLabel].profit += prof;
        monthlyRevMap[mLabel].units += 1;
      }
    });

    const revenueOverviewChart = Object.keys(monthlyRevMap).map(key => ({
      name: key,
      revenue: monthlyRevMap[key].revenue,
      profit: monthlyRevMap[key].profit,
      units: monthlyRevMap[key].units
    }));

    // 2. Sales breakdowns
    const brandMap = {};
    const modelMap = {};
    const bodyTypeMap = {};
    const fuelTypeMap = {};
    const executiveMap = {};
    const branchMap = {};

    sales.forEach(s => {
      // Brand
      brandMap[s.brand] = (brandMap[s.brand] || 0) + 1;
      // Model
      modelMap[s.model] = (modelMap[s.model] || 0) + 1;
      // Body Type
      bodyTypeMap[s.bodyType] = (bodyTypeMap[s.bodyType] || 0) + 1;
      // Fuel Type
      fuelTypeMap[s.fuelType] = (fuelTypeMap[s.fuelType] || 0) + 1;
      // Sales executive
      executiveMap[s.salesExecutive] = (executiveMap[s.salesExecutive] || 0) + s.sellingPrice - s.discount;
      // Branch
      branchMap[s.branch] = (branchMap[s.branch] || 0) + s.sellingPrice - s.discount;
    });

    const salesByBrand = Object.keys(brandMap).map(name => ({ name, value: brandMap[name] }));
    const salesByModel = Object.keys(modelMap).map(name => ({ name, value: modelMap[name] }));
    const salesByBodyType = Object.keys(bodyTypeMap).map(name => ({ name, value: bodyTypeMap[name] }));
    const salesByFuelType = Object.keys(fuelTypeMap).map(name => ({ name, value: fuelTypeMap[name] }));
    
    const performanceExecutive = Object.keys(executiveMap).map(name => ({ name, sales: executiveMap[name] }))
      .sort((a, b) => b.sales - a.sales);
    const salesByBranch = Object.keys(branchMap).map(name => ({ name, sales: branchMap[name] }));

    return {
      revenueOverviewChart,
      salesByBrand,
      salesByModel,
      salesByBodyType,
      salesByFuelType,
      performanceExecutive,
      salesByBranch
    };
  },

  // Get detailed invoice listing
  getSalesReportsTable: async (filters = {}) => {
    await delay(500);
    return { data: filterSales(mockSales, filters) };
  },

  // Business insights calculation
  getBusinessInsights: async (filters = {}) => {
    await delay(400);
    const sales = filterSales(mockSales, filters).filter(s => s.deliveryStatus !== 'Cancelled');
    
    if (sales.length === 0) {
      return {
        bestSellingBrand: 'N/A',
        bestSellingModel: 'N/A',
        highestRevenueMonth: 'N/A',
        highestProfitVehicle: 'N/A',
        averageDaysToSell: 0,
        mostProfitableExecutive: 'N/A',
        bestPerformingBranch: 'N/A',
        customerRetentionRate: '95%',
        salesConversionRate: '78%'
      };
    }

    // Calculators
    const brandCounts = {};
    const modelCounts = {};
    const execProfit = {};
    const branchSales = {};
    let topVehicle = '';
    let topVehicleProfit = 0;

    sales.forEach(s => {
      brandCounts[s.brand] = (brandCounts[s.brand] || 0) + 1;
      modelCounts[s.model] = (modelCounts[s.model] || 0) + 1;
      execProfit[s.salesExecutive] = (execProfit[s.salesExecutive] || 0) + s.profit;
      branchSales[s.branch] = (branchSales[s.branch] || 0) + s.sellingPrice;
      if (s.profit > topVehicleProfit) {
        topVehicleProfit = s.profit;
        topVehicle = `${s.year} ${s.brand} ${s.model}`;
      }
    });

    const bestBrand = Object.keys(brandCounts).reduce((a, b) => brandCounts[a] > brandCounts[b] ? a : b, 'N/A');
    const bestModel = Object.keys(modelCounts).reduce((a, b) => modelCounts[a] > modelCounts[b] ? a : b, 'N/A');
    const bestExec = Object.keys(execProfit).reduce((a, b) => execProfit[a] > execProfit[b] ? a : b, 'N/A');
    const bestBranch = Object.keys(branchSales).reduce((a, b) => branchSales[a] > branchSales[b] ? a : b, 'N/A');

    return {
      bestSellingBrand: bestBrand,
      bestSellingModel: bestModel,
      highestRevenueMonth: 'July 2026',
      highestProfitVehicle: topVehicle,
      averageDaysToSell: 14,
      mostProfitableExecutive: bestExec,
      bestPerformingBranch: bestBranch,
      customerRetentionRate: '96.2%',
      salesConversionRate: '82.5%'
    };
  },

  // Goals target values
  getSalesGoals: async () => {
    await delay(300);
    // Goals for July 2026
    const thisMonthSales = mockSales.filter(s => s.saleDate.startsWith('2026-07') && s.deliveryStatus !== 'Cancelled');
    
    const salesTarget = 15;
    const salesProgress = thisMonthSales.length;

    const revenueTarget = 25000000; // 2.5 Crore
    let revenueProgress = 0;
    thisMonthSales.forEach(s => {
      const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
      revenueProgress += s.sellingPrice - s.discount + addRev;
    });

    const profitTarget = 4500000; // 45 Lakhs
    let profitProgress = 0;
    thisMonthSales.forEach(s => {
      const addRev = Object.values(s.additionalRevenue || {}).reduce((a, b) => a + b, 0);
      profitProgress += s.sellingPrice - s.purchasePrice - s.discount + addRev;
    });

    return {
      sales: { target: salesTarget, current: salesProgress, pct: Math.round((salesProgress / salesTarget) * 100) },
      revenue: { target: revenueTarget, current: revenueProgress, pct: Math.round((revenueProgress / revenueTarget) * 100) },
      profit: { target: profitTarget, current: profitProgress, pct: Math.round((profitProgress / profitTarget) * 100) },
      predictedEndOfMonth: { sales: 18, revenue: 29800000, profit: 5400000 }
    };
  },

  // Revenue source breakdown
  getRevenueBreakdown: async (filters = {}) => {
    await delay(400);
    const sales = filterSales(mockSales, filters).filter(s => s.deliveryStatus !== 'Cancelled');

    let vehicleSales = 0;
    let financingCommission = 0;
    let extendedWarranty = 0;
    let insuranceCommission = 0;
    let accessories = 0;
    let servicePackages = 0;

    sales.forEach(s => {
      vehicleSales += s.sellingPrice - s.discount;
      financingCommission += s.additionalRevenue.financingCommission || 0;
      extendedWarranty += s.additionalRevenue.extendedWarranty || 0;
      insuranceCommission += s.additionalRevenue.insuranceCommission || 0;
      accessories += s.additionalRevenue.accessories || 0;
      servicePackages += s.additionalRevenue.servicePackages || 0;
    });

    const total = vehicleSales + financingCommission + extendedWarranty + insuranceCommission + accessories + servicePackages;

    const getPct = (val) => total > 0 ? Math.round((val / total) * 100) : 0;

    return [
      { name: 'Vehicle Sales', amount: vehicleSales, pct: getPct(vehicleSales) },
      { name: 'Financing Commission', amount: financingCommission, pct: getPct(financingCommission) },
      { name: 'Insurance Commission', amount: insuranceCommission, pct: getPct(insuranceCommission) },
      { name: 'Extended Warranty', amount: extendedWarranty, pct: getPct(extendedWarranty) },
      { name: 'Accessories Add-ons', amount: accessories, pct: getPct(accessories) },
      { name: 'Service Packages', amount: servicePackages, pct: getPct(servicePackages) }
    ];
  }
};

// Internal filtering logic helper
function filterSales(salesList, filters = {}) {
  let filtered = [...salesList];

  // 1. Date Range Filter
  if (filters.dateRange && filters.dateRange !== 'all') {
    const today = new Date('2026-07-13'); // Fixed current system date for demo consistency
    const getPastDate = (days) => {
      const d = new Date(today);
      d.setDate(today.getDate() - days);
      return d;
    };

    filtered = filtered.filter(s => {
      const sDate = new Date(s.saleDate);
      switch (filters.dateRange) {
        case 'today':
          return s.saleDate === '2026-07-13';
        case 'yesterday':
          return s.saleDate === '2026-07-12';
        case 'last7':
          return sDate >= getPastDate(7) && sDate <= today;
        case 'last30':
          return sDate >= getPastDate(30) && sDate <= today;
        case 'last90':
          return sDate >= getPastDate(90) && sDate <= today;
        case 'thisMonth':
          return s.saleDate.startsWith('2026-07');
        case 'lastMonth':
          return s.saleDate.startsWith('2026-06');
        case 'thisYear':
          return s.saleDate.startsWith('2026');
        case 'custom':
          if (filters.startDate && filters.endDate) {
            return s.saleDate >= filters.startDate && s.saleDate <= filters.endDate;
          }
          return true;
        default:
          return true;
      }
    });
  }

  // 2. Branch Filter
  if (filters.branch && filters.branch !== 'All Branches') {
    filtered = filtered.filter(s => s.branch.toLowerCase() === filters.branch.toLowerCase());
  }

  // 3. Payment Method Filter
  if (filters.paymentMethod && filters.paymentMethod !== 'All Methods') {
    filtered = filtered.filter(s => s.paymentMethod.toLowerCase().includes(filters.paymentMethod.toLowerCase()));
  }

  // 4. Sales Executive Filter
  if (filters.salesExecutive && filters.salesExecutive !== 'All Executives') {
    filtered = filtered.filter(s => s.salesExecutive.toLowerCase() === filters.salesExecutive.toLowerCase());
  }

  // 5. Brand Filter
  if (filters.brand && filters.brand !== 'All Brands') {
    filtered = filtered.filter(s => s.brand.toLowerCase() === filters.brand.toLowerCase());
  }

  // 6. Delivery Status
  if (filters.deliveryStatus && filters.deliveryStatus !== 'All') {
    filtered = filtered.filter(s => s.deliveryStatus.toLowerCase() === filters.deliveryStatus.toLowerCase());
  }

  return filtered;
}

export default reportsService;
