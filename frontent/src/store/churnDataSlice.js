import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchChurnData = createAsyncThunk(
  'churnData/fetchData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters, page, limit } = getState().churnData;
      const params = {
        page,
        limit,
        search: filters.search,
        churn: filters.churnStatus === 'All' ? '' : filters.churnStatus,
        contract: filters.contractType === 'All' ? '' : filters.contractType,
        internet: filters.internetService === 'All' ? '' : filters.internetService,
        minCharge: filters.minCharge,
        maxCharge: filters.maxCharge,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      };

      const response = await api.get('/customers', { params });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch churn data');
    }
  }
);

export const fetchSingleRecord = createAsyncThunk(
  'churnData/fetchSingle',
  async (customerID, { rejectWithValue }) => {
    try {
      const response = await api.get(`/customers/${customerID}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch customer details');
    }
  }
);

export const exportCSV = createAsyncThunk(
  'churnData/exportCSV',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().churnData;
      const params = {
        search: filters.search,
        churn: filters.churnStatus === 'All' ? '' : filters.churnStatus,
        contract: filters.contractType === 'All' ? '' : filters.contractType,
        internet: filters.internetService === 'All' ? '' : filters.internetService,
        minCharge: filters.minCharge,
        maxCharge: filters.maxCharge,
      };

      const response = await api.get('/customers/export/csv', { 
        params, 
        responseType: 'blob' 
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `churn_data_export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return true;
    } catch (err) {
      return rejectWithValue('Export failed. Please try again.');
    }
  }
);

const initialState = {
  records: [],
  total: 0,
  page: 1,
  totalPages: 0,
  limit: 25,
  filters: {
    search: "",
    churnStatus: "All",
    contractType: "All",
    internetService: "All",
    minCharge: 0,
    maxCharge: 120,
    sortBy: "",
    sortOrder: "asc"
  },
  selectedRecord: null,
  panelOpen: false,
  loading: false,
  exporting: false,
  error: null
};

const churnDataSlice = createSlice({
  name: 'churnData',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1; // Reset to first page on filter change
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },
    setSort: (state, action) => {
      if (state.filters.sortBy === action.payload) {
        state.filters.sortOrder = state.filters.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.filters.sortBy = action.payload;
        state.filters.sortOrder = 'asc';
      }
    },
    setSelectedRecord: (state, action) => {
      state.selectedRecord = action.payload;
    },
    togglePanel: (state, action) => {
      state.panelOpen = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.page = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Churn Data
      .addCase(fetchChurnData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChurnData.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload.data;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchChurnData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Record
      .addCase(fetchSingleRecord.fulfilled, (state, action) => {
        state.selectedRecord = action.payload.data;
      })
      // Export CSV
      .addCase(exportCSV.pending, (state) => {
        state.exporting = true;
      })
      .addCase(exportCSV.fulfilled, (state) => {
        state.exporting = false;
      })
      .addCase(exportCSV.rejected, (state) => {
        state.exporting = false;
      });
  }
});

export const { 
  setFilter, setPage, setLimit, setSort, 
  setSelectedRecord, togglePanel, clearFilters 
} = churnDataSlice.actions;

export default churnDataSlice.reducer;
