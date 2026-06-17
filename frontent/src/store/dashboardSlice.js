import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// ── Mock data (used when API is unavailable) ─────────────────────────────────
const MOCK = {
  overview: {
    totalCustomers: 24532, churnedCustomers: 2845,
    retainedCustomers: 21687, churnRate: 11.59,
    trends: { total: 12.5, churned: -8.3, retained: 15.7, rate: 0.72 }
  },
  monthlyTrend: [
    { month: 'Jun 2023', churnRate: 9.8 }, { month: 'Jul 2023', churnRate: 10.1 },
    { month: 'Aug 2023', churnRate: 10.5 }, { month: 'Sep 2023', churnRate: 11.0 },
    { month: 'Oct 2023', churnRate: 11.3 }, { month: 'Nov 2023', churnRate: 10.7 },
    { month: 'Dec 2023', churnRate: 11.2 }, { month: 'Jan 2024', churnRate: 11.8 },
    { month: 'Feb 2024', churnRate: 12.6 }, { month: 'Mar 2024', churnRate: 13.4 },
    { month: 'Apr 2024', churnRate: 12.1 }, { month: 'May 2024', churnRate: 11.6 },
  ],
  byCategory: [
    { category: 'Electronics',   percentage: 35.4, count: 1007, color: '#3b82f6' },
    { category: 'Fashion',       percentage: 24.7, count: 703,  color: '#16a34a' },
    { category: 'Home & Kitchen',percentage: 18.6, count: 529,  color: '#f59e0b' },
    { category: 'Beauty',        percentage: 12.3, count: 350,  color: '#8b5cf6' },
    { category: 'Sports',        percentage: 9.0,  count: 256,  color: '#ef4444' },
  ],
  byContract: [
    { contractType: 'Month-to-Month', percentage: 45.2, color: '#3b45cc' },
    { contractType: 'One Year',       percentage: 28.7, color: '#16a34a' },
    { contractType: 'Two Year',       percentage: 26.1, color: '#f59e0b' },
  ],
  byInternet: [
    { serviceType: 'Fiber Optic', percentage: 41.3, color: '#3b45cc' },
    { serviceType: 'DSL',         percentage: 32.6, color: '#16a34a' },
    { serviceType: 'Cable',       percentage: 15.8, color: '#f59e0b' },
    { serviceType: 'No Internet', percentage: 10.3, color: '#8b5cf6' },
  ],
  topStats: {
    avgTenureChurned: 7.2, avgTenureRetained: 24.6,
    topChurnReason: 'High Prices', topChurnReasonPct: 32.6
  },
  recentChurned: [
    { id:1, name:'John Doe',      email:'johndoe@example.com',      contractType:'Month-to-Month', tenure:'6 Months',  churnLabel:'Churned', date:'May 24, 2024' },
    { id:2, name:'Sarah Smith',   email:'sarahsmith@example.com',   contractType:'Month-to-Month', tenure:'3 Months',  churnLabel:'Churned', date:'May 24, 2024' },
    { id:3, name:'Michael Brown', email:'michaelbrown@example.com', contractType:'One Year',       tenure:'12 Months', churnLabel:'Churned', date:'May 23, 2024' },
    { id:4, name:'Emily Davis',   email:'emilydavis@example.com',   contractType:'Month-to-Month', tenure:'2 Months',  churnLabel:'Churned', date:'May 23, 2024' },
    { id:5, name:'David Wilson',  email:'davidwilson@example.com',  contractType:'Two Year',       tenure:'20 Months', churnLabel:'Churned', date:'May 23, 2024' },
  ],
};

// ── Thunks ───────────────────────────────────────────────────────────────────
const safeGet = async (endpoint, fallback) => {
  try {
    const r = await api.get(endpoint);
    return r.data;
  } catch { return fallback; }
};

export const fetchDashboard = createAsyncThunk('dashboard/fetchAll', async (_, { getState }) => {
  const { lastFetched } = getState().dashboard;
  if (lastFetched && Date.now() - lastFetched < 5 * 60 * 1000) return null; // cached
  const [overview, monthlyTrend, byCategory, byContract, byInternet, topStats, recentChurned] = await Promise.all([
    safeGet('/analytics/overview', MOCK.overview),
    safeGet('/analytics/monthly-churn', MOCK.monthlyTrend),
    safeGet('/analytics/churn-by-category', MOCK.byCategory),
    safeGet('/analytics/churn-by-contract', MOCK.byContract),
    safeGet('/analytics/churn-by-internet', MOCK.byInternet),
    safeGet('/analytics/top-stats', MOCK.topStats),
    safeGet('/customers?limit=5&sort=date&order=desc', MOCK.recentChurned),
  ]);
  return { overview, monthlyTrend, byCategory, byContract, byInternet, topStats, recentChurned };
});

// ── Slice ────────────────────────────────────────────────────────────────────
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    ...MOCK, loading: false, error: null, lastFetched: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchDashboard.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(fetchDashboard.fulfilled, (s, a) => {
      s.loading = false;
      if (a.payload) { Object.assign(s, a.payload); s.lastFetched = Date.now(); }
    });
    b.addCase(fetchDashboard.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  },
});

export default dashboardSlice.reducer;
