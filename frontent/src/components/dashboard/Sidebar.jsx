import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Database, BarChart2,
  Settings, LogOut, TrendingUp, Waves
} from 'lucide-react';

const NAV = [
  { to: '/admin/dashboard',  label: 'Dashboard',   Icon: LayoutDashboard },
  { to: '/admin/analytics',  label: 'Analytics',   Icon: BarChart2       },
  { to: '/admin/churn-data', label: 'Churn Data',  Icon: Database        },
  { to: '/admin/users',      label: 'Users',       Icon: Users           },
  { to: '/admin/settings',   label: 'Settings',    Icon: Settings        },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [hoveredLogout, setHoveredLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{
      width: 228, flexShrink: 0, 
      background: 'linear-gradient(180deg, #0B1437 0%, #1A2456 100%)',
      height: '100vh', display: 'flex', flexDirection: 'column',
      position: 'fixed', left: 0, top: 0, zIndex: 100,
      fontFamily: '"Inter", system-ui, sans-serif',
      boxShadow: '4px 0 24px rgba(0,0,0,0.05)'
    }}>
      {/* Logo */}
      <div style={{ padding: '24px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: 'linear-gradient(135deg, #2D5BFF 0%, #8B5CF6 100%)',
            borderRadius: 8,
            padding: '6px', display: 'flex',
            width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(45, 91, 255, 0.3)'
          }}>
            <Waves size={16} color="#fff" />
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: '1.2' }}>CustomerPulse AI</div>
            <div style={{ color: '#9ca3af', fontSize: 8, marginTop: 1, whiteSpace: 'nowrap' }}>E-commerce Churn Dashboard</div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin/dashboard'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', borderRadius: 12,
              textDecoration: 'none', fontSize: 14, fontWeight: isActive ? 600 : 400,
              color: isActive ? '#fff' : '#9ca3af',
              background: isActive ? '#2D5BFF' : 'transparent',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isActive ? '0 4px 12px rgba(45, 91, 255, 0.25)' : 'none'
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={18} color={isActive ? '#fff' : '#6b7280'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom User Section */}
      <div style={{ padding: '20px 14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ 
            width: 38, height: 38, borderRadius: '50%', 
            background: '#7C3AED', color: '#fff', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.1)'
          }}>
            JD
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>John Doe</div>
            <div style={{ 
              background: '#2D5BFF', color: '#fff', fontSize: 9, 
              padding: '1px 6px', borderRadius: 100, display: 'inline-block',
              marginTop: 2, fontWeight: 600
            }}>Admin</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', border: 'none', background: 'none',
            cursor: 'pointer', padding: '8px 4px',
            color: '#9ca3af',
            fontSize: 14, fontFamily: 'inherit',
            transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
