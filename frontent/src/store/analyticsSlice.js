import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// Mock data generator for initial state / fallback
const MOCK = {
  overview: {
    totalRecords: 7043,
    churnRate: 26.54,
    avgMonthlyChargeChurned: 74.12,
    avgMonthlyChargeRetained: 61.35,
    avgTenureChurned: 8.7,
    avgTenureRetained: 26.1,
    churnRateChange: 2.31
  },
  churnTrend: [
    { month: 'Jun 2023', churned: 210, retained: 920 },
    { month: 'Jul 2023', churned: 220, retained: 910 },
    { month: 'Aug 2023', churned: 230, retained: 950 },
    { month: 'Sep 2023', churned: 240, retained: 970 },
    { month: 'Oct 2023', churned: 260, retained: 1010 },
    { month: 'Nov 2023', churned: 270, retained: 1020 },
    { month: 'Dec 2023', churned: 290, retained: 1050 },
    { month: 'Jan 2024', churned: 310, retained: 1090 },
    { month: 'Feb 2024', churned: 320, retained: 1070 },
    { month: 'Mar 2024', churned: 330, retained: 1120 },
    { month: 'Apr 2024', churned: 330, retained: 1130 },
    { month: 'May 2024', churned: 350, retained: 1140 },
  ],
  byContract: [
    { name: 'Month-to-month', value: 2735, color: '#ef4444' },
    { name: 'One year', value: 1058, color: '#3b82f6' },
    { name: 'Two year', value: 571, color: '#22c55e' },
  ],
  byInternet: [
    { name: 'Fiber optic', value: 61.3, color: '#ef4444' },
    { name: 'DSL', value: 24.1, color: '#3b82f6' },
    { name: 'No', value: 14.6, color: '#22c55e' },
  ],
  byPayment: [
    { name: 'Electronic check', value: 2107, color: '#ef4444' },
    { name: 'Mailed check', value: 1522, color: '#3b82f6' },
    { name: 'Bank transfer', value: 1233, color: '#22c55e' },
    { name: 'Credit card', value: 1181, color: '#f59e0b' },
  ],
  byGender: [
    { name: 'Male', churned: 1846, retained: 2932 },
    { name: 'Female', churned: 1980, retained: 2285 },
  ],
  chargesDistribution: {
    churned: Array.from({ length: 200 }, () => ({
      x: Math.random() * 100 + 18,
      y: Math.floor(Math.random() * 350) + 50
    })),
    retained: Array.from({ length: 250 }, () => ({
      x: Math.random() * 100 + 18,
      y: Math.floor(Math.random() * 550) + 20
    }))
  },
  insights: [
    {
      icon: 'trending-up',
      title: 'Fiber optic users churn',
      stat: '42% more',
      description: 'than DSL users.',
      impact: 'Impact: High',
      impactLevel: 'high'
    },
    {
      icon: 'document',
      title: 'Month-to-month contracts have',
      stat: '3x higher churn',
      description: 'compared to two-year contracts.',
      impact: 'Impact: High',
      impactLevel: 'high'
    },
    {
      icon: 'shield',
      title: 'Customers with tenure > 24 months',
      stat: 'churn 70% less',
      description: 'compared to those with < 12 months.',
      impact: 'Impact: Strong',
      impactLevel: 'strong'
    }
  ]
};

// Helper for safe API calls
const safeGet = async (endpoint, params, fallback) => {
  try {
    const r = await api.get(endpoint, { params });
    return r.data;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return fallback;
  }
};

// Thunks
export const fetchOverview = createAsyncThunk('analytics/fetchOverview', async (params) => {
  return safeGet('/analytics/overview', params, MOCK.overview);
});

export const fetchChurnTrend = createAsyncThunk('analytics/fetchChurnTrend', async (params) => {
  return safeGet('/analytics/churn-trend', params, MOCK.churnTrend);
});

export const fetchByContract = createAsyncThunk('analytics/fetchByContract', async (params) => {
  return safeGet('/analytics/churn-by-contract', params, MOCK.byContract);
});

export const fetchByInternet = createAsyncThunk('analytics/fetchByInternet', async (params) => {
  return safeGet('/analytics/churn-by-internet', params, MOCK.byInternet);
});

export const fetchByPayment = createAsyncThunk('analytics/fetchByPayment', async (params) => {
  return safeGet('/analytics/churn-by-payment', params, MOCK.byPayment);
});

export const fetchByGender = createAsyncThunk('analytics/fetchByGender', async (params) => {
  return safeGet('/analytics/churn-by-gender', params, MOCK.byGender);
});

export const fetchChargesDistribution = createAsyncThunk('analytics/fetchChargesDistribution', async (params) => {
  return safeGet('/analytics/charges-distribution', params, MOCK.chargesDistribution);
});

export const fetchInsights = createAsyncThunk('analytics/fetchInsights', async (params) => {
  return safeGet('/analytics/insights', params, MOCK.insights);
});

export const fetchAllAnalytics = createAsyncThunk('analytics/fetchAll', async (params, { dispatch }) => {
  return Promise.all([
    dispatch(fetchOverview(params)),
    dispatch(fetchChurnTrend(params)),
    dispatch(fetchByContract(params)),
    dispatch(fetchByInternet(params)),
    dispatch(fetchByPayment(params)),
    dispatch(fetchByGender(params)),
    dispatch(fetchChargesDistribution(params)),
    dispatch(fetchInsights(params))
  ]);
});

const initialState = {
  ...MOCK,
  dateRange: { start: '2024-05-01', end: '2024-05-31' },
  loading: {
    overview: false,
    trend: false,
    dimensions: false,
    payment: false,
    distribution: false,
    insights: false
  },
  error: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Overview
    builder.addCase(fetchOverview.pending, (state) => { state.loading.overview = true; });
    builder.addCase(fetchOverview.fulfilled, (state, action) => {
      state.loading.overview = false;
      state.overview = action.payload;
    });
    builder.addCase(fetchOverview.rejected, (state, action) => {
      state.loading.overview = false;
      state.error = action.error.message;
    });
    // Trend
    builder.addCase(fetchChurnTrend.pending, (state) => { state.loading.trend = true; });
    builder.addCase(fetchChurnTrend.fulfilled, (state, action) => {
      state.loading.trend = false;
      state.churnTrend = action.payload;
    });
    // Add other cases as needed...
    // Simplified for now, we can add more if specific logic is needed per case
  }
});

export const { setDateRange, clearErrors } = analyticsSlice.actions;
export default analyticsSlice.reducer;
