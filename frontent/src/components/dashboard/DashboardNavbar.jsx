import { Menu, Search, Bell, ChevronDown, LogOut } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';

const DashboardNavbar = ({ onMenuClick }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('profile')) return 'Profile Management';
    if (path.includes('users')) return 'Users Management';
    if (path.includes('churn-data')) return 'Churn Dataset';
    if (path.includes('analytics')) return 'Analytics Dashboard';
    if (path.includes('settings')) return 'System Settings';
    return 'Admin Control Panel';
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header style={{
      height: 70, background: '#fff', borderBottom: '1px solid #f1f5f9',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', position: 'sticky', top: 0, zIndex: 50,
      fontFamily: '"Inter", sans-serif', boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button 
          onClick={onMenuClick}
          style={{ 
            background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a2e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 8, borderRadius: 8, transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Menu size={24} />
        </button>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', margin: 0 }}>
          {getPageTitle()}
        </h1>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button style={{ 
          background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280',
          padding: 8, borderRadius: '50%', transition: 'background 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Search size={20} />
        </button>

        <div style={{ position: 'relative' }}>
          <button style={{ 
            background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280',
            padding: 8, borderRadius: '50%', transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute', top: 6, right: 6, background: '#ef4444',
              color: '#fff', fontSize: 9, fontWeight: 700, width: 14, height: 14,
              borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', border: '2px solid #fff'
            }}>
              12
            </span>
          </button>
        </div>

        <Link 
          to="/admin/profile"
          style={{ 
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
            padding: '4px 8px', borderRadius: 8, transition: 'background 0.2s',
            textDecoration: 'none'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 13, lineHeight: '1.2' }}>{user?.username || 'Loading...'}</div>
            <div style={{ color: '#6b7280', fontSize: 11 }}>{user?.role || 'User'}</div>
          </div>
          <div style={{ 
            width: 38, height: 38, borderRadius: '50%', 
            background: '#7C3AED', color: '#fff', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, border: '2px solid #f1f5f9'
          }}>
            {user?.username?.substring(0, 2).toUpperCase() || '??'}
          </div>
        </Link>
        
        <button 
          onClick={handleLogout}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444',
            padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700, transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;
