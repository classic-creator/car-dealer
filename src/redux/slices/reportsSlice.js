import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportsService from '../../services/reportsService';

// Async Thunks
export const fetchReportsDashboard = createAsyncThunk(
  'reports/fetchReportsDashboard',
  async (filters, { rejectWithValue }) => {
    try {
      const [kpis, insights, goals, breakdown] = await Promise.all([
        reportsService.getDashboardKPIs(filters),
        reportsService.getBusinessInsights(filters),
        reportsService.getSalesGoals(),
        reportsService.getRevenueBreakdown(filters)
      ]);
      return { kpis, insights, goals, breakdown };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchReportsCharts = createAsyncThunk(
  'reports/fetchReportsCharts',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await reportsService.getAnalyticsCharts(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch charts data');
    }
  }
);

export const fetchReportsTable = createAsyncThunk(
  'reports/fetchReportsTable',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await reportsService.getSalesReportsTable(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch sales records');
    }
  }
);

const initialState = {
  kpis: null,
  charts: null,
  reportsList: [],
  insights: null,
  goals: null,
  revenueBreakdown: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  chartsStatus: 'idle',
  tableStatus: 'idle',
  error: null,
  filters: {
    dateRange: 'all',
    startDate: '',
    endDate: '',
    branch: 'All Branches',
    paymentMethod: 'All Methods',
    salesExecutive: 'All Executives',
    brand: 'All Brands',
    deliveryStatus: 'All'
  }
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = { ...initialState.filters };
    }
  },
  extraReducers: (builder) => {
    builder
      // Dashboard KPI & Insight Fetching
      .addCase(fetchReportsDashboard.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchReportsDashboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.kpis = action.payload.kpis;
        state.insights = action.payload.insights;
        state.goals = action.payload.goals;
        state.revenueBreakdown = action.payload.breakdown;
      })
      .addCase(fetchReportsDashboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Charts Fetching
      .addCase(fetchReportsCharts.pending, (state) => {
        state.chartsStatus = 'loading';
      })
      .addCase(fetchReportsCharts.fulfilled, (state, action) => {
        state.chartsStatus = 'succeeded';
        state.charts = action.payload;
      })
      .addCase(fetchReportsCharts.rejected, (state) => {
        state.chartsStatus = 'failed';
      })

      // Table Records Fetching
      .addCase(fetchReportsTable.pending, (state) => {
        state.tableStatus = 'loading';
      })
      .addCase(fetchReportsTable.fulfilled, (state, action) => {
        state.tableStatus = 'succeeded';
        state.reportsList = action.payload;
      })
      .addCase(fetchReportsTable.rejected, (state) => {
        state.tableStatus = 'failed';
      });
  }
});

export const { setFilters, resetFilters } = reportsSlice.actions;

export default reportsSlice.reducer;
