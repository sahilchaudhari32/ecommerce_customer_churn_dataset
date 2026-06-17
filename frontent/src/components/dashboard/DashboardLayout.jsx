import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F6FA' }}>
      {/* Sidebar - Fixed width */}
      <div style={{ 
        width: sidebarOpen ? 228 : 0, 
        transition: 'width 0.3s ease', 
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        minWidth: 0,
        height: '100vh',
        overflow: 'hidden'
      }}>
        <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '28px 32px',
          background: '#F5F6FA'
        }}>
          <Outlet />
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
           /* On mobile, sidebar should probably be a drawer or absolute positioned */
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
