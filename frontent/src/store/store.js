import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboardSlice';
import usersReducer from './usersSlice';
import churnDataReducer from './churnDataSlice';
import analyticsReducer from './analyticsSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    users: usersReducer,
    churnData: churnDataReducer,
    analytics: analyticsReducer,
  },
});
