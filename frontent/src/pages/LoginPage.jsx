import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLeftPanel from '../components/AuthLeftPanel';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

// ── Main Login Page ───────────────────────────────────────────────────────────
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div style={{
      height: '100vh', width: '100vw', display: 'flex',
      fontFamily: '"Inter", system-ui, sans-serif',
      overflow: 'hidden', position: 'fixed', top: 0, left: 0,
    }}>
      {/* Shared Left Panel */}
      <AuthLeftPanel />

      {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
      <div
        className="auth-right-panel"
        style={{
          flex: '0 0 50%', background: '#f5f6ff',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '24px 32px', overflow: 'hidden',
        }}
      >
        {/* Form Card */}
        <div style={{
          background: '#fff', borderRadius: 18,
          padding: '36px 44px 28px',
          width: '100%', maxWidth: 440,
          boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(59,69,204,0.08)',
        }}>
          {/* Mobile logo */}
          <div className="mobile-only-logo" style={{ display: 'none', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ 
              background: '#fff', borderRadius: 10, padding: 4,
              width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59,69,204,0.15)'
            }}>
              <img src="https://cdn.corenexis.com/f/pPeXd8lUyZu.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: '#1a1a2e', letterSpacing: '-0.02em' }}>CustomerPulse AI</span>
          </div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 26, color: '#1a1a2e', marginBottom: 7 }}>Welcome Back 👋</h2>
            <p style={{ margin: 0, color: '#6b7280', fontSize: 13.5 }}>Sign in to your CustomerPulse AI account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: '#dc2626', background: '#fef2f2', padding: '10px', borderRadius: '10px', marginBottom: '16px', fontSize: '13px', textAlign: 'center', border: '1px solid #fecaca' }}>
                {error}
              </div>
            )}
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="#9ca3af" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{
                    width: '100%', height: 46, border: '1.5px solid #e5e7eb', borderRadius: 10,
                    paddingLeft: 40, paddingRight: 14, fontSize: 13.5, color: '#1a1a2e', outline: 'none',
                    boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
                    fontFamily: 'inherit', background: '#fff'
                  }}
                  onFocus={e => { e.target.style.borderColor = '#3b45cc'; e.target.style.boxShadow = '0 0 0 3px rgba(59,69,204,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#9ca3af" style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%', height: 46, border: '1.5px solid #e5e7eb', borderRadius: 10,
                    paddingLeft: 40, paddingRight: 44, fontSize: 13.5, color: '#1a1a2e', outline: 'none',
                    boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
                    fontFamily: 'inherit', background: '#fff'
                  }}
                  onFocus={e => { e.target.style.borderColor = '#3b45cc'; e.target.style.boxShadow = '0 0 0 3px rgba(59,69,204,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#6b7280', userSelect: 'none' }}>
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                  style={{ accentColor: '#3b45cc', width: 14, height: 14 }} />
                Remember me
              </label>
              <Link to="/forgot-password" style={{ color: '#3b45cc', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>

            {/* Sign In */}
            <button type="submit" disabled={loading}
              style={{
                width: '100%', height: 48, background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b45cc 0%, #5a5fe8 100%)',
                color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 15,
                cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, transition: 'opacity 0.2s, transform 0.15s', fontFamily: 'inherit', marginBottom: 18
              }}
              onMouseEnter={e => { if(!loading) { e.currentTarget.style.opacity = '0.92'; e.currentTarget.style.transform = 'scale(1.01)'; } }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
            <span style={{ color: '#9ca3af', fontSize: 12.5 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
          </div>

          {/* Google */}
          <button type="button"
            style={{
              width: '100%', height: 48, background: '#fff', border: '1.5px solid #e5e7eb',
              borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10, fontSize: 13.5, fontWeight: 500, color: '#374151',
              marginBottom: 22, transition: 'background 0.2s', fontFamily: 'inherit'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer link */}
          <p style={{ textAlign: 'center', fontSize: 13.5, color: '#6b7280', margin: 0 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#3b45cc', fontWeight: 700, textDecoration: 'none' }}>Register</Link>
          </p>
        </div>

        {/* Copyright */}
        <p style={{ marginTop: 16, color: '#9ca3af', fontSize: 11.5, textAlign: 'center' }}>
          © 2026 CustomerPulse AI. All rights reserved.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
          .auth-right-panel { flex: 0 0 100% !important; }
          .mobile-only-logo { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
