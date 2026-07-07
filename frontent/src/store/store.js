import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import usersReducer from './usersSlice';
import churnDataReducer from './churnDataSlice';
import analyticsReducer from './analyticsSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
    churnData: churnDataReducer,
    analytics: analyticsReducer,
  },
});
