import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Overview from './components/dashboard/Overview';
import UsersPage from './components/dashboard/UsersPage';
import ChurnDatasetPage from './pages/admin/ChurnDatasetPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import ProfilePage from './pages/admin/ProfilePage';

// Simple placeholders for other pages
const AuthPlaceholder = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-6">This page is under development.</p>
      <a href="/" className="text-blue-600 hover:underline font-medium">Return Home</a>
    </div>
  </div>
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#f59e0b', // Orange accent
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif' },
    h2: { fontFamily: '"Outfit", sans-serif' },
    h3: { fontFamily: '"Outfit", sans-serif' },
    h4: { fontFamily: '"Outfit", sans-serif' },
    h5: { fontFamily: '"Outfit", sans-serif' },
    h6: { fontFamily: '"Outfit", sans-serif' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<AuthPlaceholder title="Forgot Password" />} />
            <Route path="/terms" element={<AuthPlaceholder title="Terms of Service" />} />
            <Route path="/privacy" element={<AuthPlaceholder title="Privacy Policy" />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Overview />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="churn-data" element={<ChurnDatasetPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
