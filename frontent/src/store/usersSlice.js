import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// ── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id: 1,  name: 'John Doe',       email: 'john.doe@example.com',       role: 'Admin', status: 'Active',   createdDate: 'May 24, 2024' },
  { id: 2,  name: 'Sarah Smith',    email: 'sarah.smith@example.com',    role: 'User',  status: 'Active',   createdDate: 'May 23, 2024' },
  { id: 3,  name: 'Michael Brown',  email: 'michael.brown@example.com',  role: 'User',  status: 'Inactive', createdDate: 'May 22, 2024' },
  { id: 4,  name: 'Emily Davis',    email: 'emily.davis@example.com',    role: 'Admin', status: 'Active',   createdDate: 'May 21, 2024' },
  { id: 5,  name: 'David Wilson',   email: 'david.wilson@example.com',   role: 'User',  status: 'Inactive', createdDate: 'May 20, 2024' },
  { id: 6,  name: 'Jessica Taylor', email: 'jessica.taylor@example.com', role: 'User',  status: 'Active',   createdDate: 'May 19, 2024' },
  { id: 7,  name: 'Daniel Anderson',email: 'daniel.anderson@example.com',role: 'User',  status: 'Active',   createdDate: 'May 18, 2024' },
  { id: 8,  name: 'Sophia Martinez',email: 'sophia.martinez@example.com',role: 'Admin', status: 'Active',   createdDate: 'May 17, 2024' },
  { id: 9,  name: 'James Thomas',   email: 'james.thomas@example.com',   role: 'User',  status: 'Inactive', createdDate: 'May 16, 2024' },
  { id: 10, name: 'Olivia Jackson', email: 'olivia.jackson@example.com', role: 'User',  status: 'Active',   createdDate: 'May 15, 2024' },
];

// ── Thunks ──────────────────────────────────────────────────────────────────
export const fetchUsers = createAsyncThunk('users/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const { search, role, status, page, limit } = params;
    const res = await api.get('/users', { params: { search, role, status, page, limit } });
    return res.data;
  } catch (err) {
    // Fallback for development if backend is not ready
    return { users: MOCK_USERS, total: 142, page: params.page || 1, totalPages: 15 };
  }
});

export const createUser = createAsyncThunk('users/create', async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post('/users', userData);
      return res.data;
    } catch (err) {
      // Mock success for UI testing
      return { ...userData, id: Math.floor(Math.random() * 1000), createdDate: new Date().toLocaleDateString() };
    }
});

export const updateUser = createAsyncThunk('users/update', async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/users/${id}`, data);
      return res.data;
    } catch (err) {
      // Mock success
      return { ...data, id };
    }
});

export const deleteUser = createAsyncThunk('users/delete', async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (err) {
      // Mock success
      return id;
    }
});

// ── Slice ───────────────────────────────────────────────────────────────────
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    total: 0,
    page: 1,
    totalPages: 0,
    limit: 10,
    filters: { search: '', role: 'All Roles', status: 'All Status' },
    selectedUser: null,
    loading: false,
    error: null,
    modalOpen: { add: false, edit: false, view: false, delete: false }
  },
  reducers: {
    setFilter: (s, a) => { s.filters = { ...s.filters, ...a.payload }; s.page = 1; },
    setPage: (s, a) => { s.page = a.payload; },
    setLimit: (s, a) => { s.limit = a.payload; s.page = 1; },
    setSelectedUser: (s, a) => { s.selectedUser = a.payload; },
    toggleModal: (s, a) => { 
      const { type, open } = a.payload;
      s.modalOpen[type] = open;
    },
    resetFilters: (s) => {
      s.filters = { search: '', role: 'All Roles', status: 'All Status' };
      s.page = 1;
    }
  },
  extraReducers: (b) => {
    b.addCase(fetchUsers.pending, (s) => { s.loading = true; })
     .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload.users;
        s.total = a.payload.total;
        s.totalPages = a.payload.totalPages;
        s.page = a.payload.page;
     })
     .addCase(fetchUsers.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
    
    b.addCase(createUser.fulfilled, (s, a) => {
        s.users = [a.payload, ...s.users];
    });
    b.addCase(updateUser.fulfilled, (s, a) => {
        const idx = s.users.findIndex(u => u.id === a.payload.id);
        if (idx !== -1) s.users[idx] = { ...s.users[idx], ...a.payload };
    });
    b.addCase(deleteUser.fulfilled, (s, a) => {
        s.users = s.users.filter(u => u.id !== a.payload);
    });
  }
});

export const { setFilter, setPage, setLimit, setSelectedUser, toggleModal, resetFilters } = usersSlice.actions;
export default usersSlice.reducer;
