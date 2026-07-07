import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart2, Mail, Lock, Eye, EyeOff, User, ShieldCheck, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import AuthLeftPanel from '../components/AuthLeftPanel';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/authSlice';

// ── Password strength ──────────────────────────────────────────────────────────
const getStrength = (pw) => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  return score;
};
const strengthMeta = [
  { label: 'Weak',   color: '#dc2626', bg: '#fef2f2' },
  { label: 'Medium', color: '#f97316', bg: '#fff7ed' },
  { label: 'Strong', color: '#16a34a', bg: '#f0fdf4' },
];

// ── Toast ──────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, visible }) => (
  <div style={{
    position: 'fixed', top: 24, right: 24, zIndex: 9999,
    background: type === 'success' ? '#16a34a' : '#dc2626',
    color: '#fff', borderRadius: 10, padding: '12px 20px',
    fontFamily: '"Inter", system-ui, sans-serif', fontSize: 14, fontWeight: 600,
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(-16px)',
    transition: 'opacity 0.3s, transform 0.3s',
    pointerEvents: 'none', maxWidth: 380
  }}>
    {message}
  </div>
);

// ── Input Field ────────────────────────────────────────────────────────────────
const Field = ({ label, type = 'text', value, onChange, placeholder, icon: Icon, rightEl, error, onFocus, onBlur }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#374151', marginBottom:5 }}>{label}</label>
    <div style={{ position:'relative' }}>
      {Icon && <Icon size={15} color="#9ca3af" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          width:'100%', height:44, border:`1.5px solid ${error ? '#dc2626' : '#e5e7eb'}`,
          borderRadius:10, paddingLeft: Icon ? 38 : 14, paddingRight: rightEl ? 42 : 14,
          fontSize:13, color:'#1a1a2e', outline:'none', boxSizing:'border-box',
          transition:'border-color 0.2s, box-shadow 0.2s', fontFamily:'inherit', background:'#fff'
        }}
        onFocus={e => { e.target.style.borderColor='#3b45cc'; e.target.style.boxShadow='0 0 0 3px rgba(59,69,204,0.1)'; onFocus && onFocus(e); }}
        onBlur={e => { e.target.style.borderColor= error ? '#dc2626' : '#e5e7eb'; e.target.style.boxShadow='none'; onBlur && onBlur(e); }}
      />
      {rightEl && <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', display:'flex', alignItems:'center' }}>{rightEl}</div>}
    </div>
    {error && <p style={{ margin:'4px 0 0', fontSize:12, color:'#dc2626' }}>{error}</p>}
  </div>
);

// ── RegisterPage ───────────────────────────────────────────────────────────────
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: apiError } = useSelector(state => state.auth);

  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [toast, setToast] = useState({ visible:false, message:'', type:'success' });

  const strength = getStrength(form.password);
  const pwMatch = form.confirm && form.password === form.confirm;
  const pwMismatch = form.confirm && form.password !== form.confirm;

  const showToast = (message, type = 'success') => {
    setToast({ visible:true, message, type });
    setTimeout(() => setToast(t => ({ ...t, visible:false })), 3500);
  };

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Full name must be at least 2 characters';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.password || form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password))
      e.password = 'Password must be 8+ characters with 1 uppercase and 1 number';
    if (!form.confirm || form.confirm !== form.password) e.confirm = 'Passwords do not match';
    if (!agreed) e.terms = 'You must accept the terms to continue';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    if (!validate()) return;
    
    const result = await dispatch(register({ 
      username: form.name, 
      email: form.email, 
      password: form.password, 
      role: 'USER' 
    }));

    if (register.fulfilled.match(result)) {
      showToast('Account created successfully!', 'success');
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } else {
      showToast(result.payload || 'Registration failed', 'error');
    }
  };

  return (
    <div style={{
      height:'100vh', width:'100vw', display:'flex',
      fontFamily:'"Inter", system-ui, sans-serif', overflow:'hidden',
      position:'fixed', top:0, left:0
    }}>
      <Toast message={toast.message} type={toast.type} visible={toast.visible}/>

      {/* Left Panel */}
      <AuthLeftPanel/>

      {/* Right Panel */}
      <div
        className="auth-right-panel"
        style={{
          flex:'0 0 50%', background:'#f5f6ff',
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          padding:'20px 32px', overflow:'hidden',
        }}
      >
        {/* Form Card */}
        <div style={{
          background:'#fff', borderRadius:16,
          padding:'28px 44px 22px',
          width:'100%', maxWidth:440,
          boxShadow:'0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(59,69,204,0.08)',
          overflowY:'auto', maxHeight:'calc(100vh - 80px)'
        }}>
          {/* Mobile logo */}
          <div className="mobile-only-logo" style={{ display:'none', justifyContent:'center', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ 
              background:'#fff', borderRadius:10, padding:4,
              width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59,69,204,0.15)'
            }}>
              <img src="https://cdn.corenexis.com/f/pPeXd8lUyZu.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{ fontWeight:800, fontSize:17, color:'#1a1a2e', letterSpacing: '-0.02em' }}>CustomerPulse AI</span>
          </div>

          {/* Heading */}
          <div style={{ textAlign:'center', marginBottom:20 }}>
            <h2 style={{ margin:0, fontWeight:700, fontSize:22, color:'#1a1a2e', marginBottom:5 }}>Create Account 🚀</h2>
            <p style={{ margin:0, color:'#6b7280', fontSize:12.5 }}>Join CustomerPulse AI and start predicting churn today</p>
          </div>

          {/* API Error Banner */}
          {apiError && (
            <div style={{
              background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10,
              padding:'10px 14px', marginBottom:16, fontSize:13, color:'#dc2626',
              display:'flex', alignItems:'center', gap:8
            }}>
              <XCircle size={16} style={{ flexShrink:0 }}/> {apiError}{' '}
              <Link to="/login" style={{ color:'#3b45cc', fontWeight:700, textDecoration:'none' }}>Sign in</Link>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <Field
              label="Full Name" value={form.name} placeholder="Enter your full name"
              icon={User} error={errors.name}
              onChange={e => setForm(f => ({ ...f, name:e.target.value }))}
            />

            {/* Email */}
            <Field
              label="Email Address" type="email" value={form.email} placeholder="Enter your email address"
              icon={Mail} error={errors.email}
              onChange={e => setForm(f => ({ ...f, email:e.target.value }))}
            />

            {/* Password */}
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#374151', marginBottom:5 }}>Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={15} color="#9ca3af" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                <input
                  type={showPw ? 'text' : 'password'} value={form.password} placeholder="Create a password"
                  onChange={e => setForm(f => ({ ...f, password:e.target.value }))}
                  style={{
                    width:'100%', height:44, border:`1.5px solid ${errors.password ? '#dc2626' : '#e5e7eb'}`,
                    borderRadius:10, paddingLeft:38, paddingRight:42, fontSize:13, color:'#1a1a2e',
                    outline:'none', boxSizing:'border-box', transition:'border-color 0.2s', fontFamily:'inherit', background:'#fff'
                  }}
                  onFocus={e => { e.target.style.borderColor='#3b45cc'; e.target.style.boxShadow='0 0 0 3px rgba(59,69,204,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor= errors.password ? '#dc2626' : '#e5e7eb'; e.target.style.boxShadow='none'; }}
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', padding:0, color:'#9ca3af', display:'flex', alignItems:'center' }}>
                  {showPw ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>

              {/* Strength bar */}
              {form.password && (
                <div style={{ marginTop:8 }}>
                  <div style={{ display:'flex', gap:4, marginBottom:4 }}>
                    {[1,2,3].map(i => (
                      <div key={i} style={{
                        flex:1, height:4, borderRadius:4,
                        background: i <= strength ? strengthMeta[strength-1]?.color : '#e5e7eb',
                        transition:'background 0.3s'
                      }}/>
                    ))}
                  </div>
                  <div style={{ textAlign:'right', fontSize:11, color: strengthMeta[strength-1]?.color, fontWeight:600 }}>
                    {strengthMeta[strength-1]?.label || ''}
                  </div>
                </div>
              )}
              {errors.password && <p style={{ margin:'4px 0 0', fontSize:12, color:'#dc2626' }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'#374151', marginBottom:5 }}>Confirm Password</label>
              <div style={{ position:'relative' }}>
                <ShieldCheck size={15} color="#9ca3af" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                <input
                  type={showConfirm ? 'text' : 'password'} value={form.confirm} placeholder="Re-enter your password"
                  onChange={e => setForm(f => ({ ...f, confirm:e.target.value }))}
                  style={{
                    width:'100%', height:44, border:`1.5px solid ${errors.confirm ? '#dc2626' : pwMatch ? '#16a34a' : '#e5e7eb'}`,
                    borderRadius:10, paddingLeft:38, paddingRight:42, fontSize:13, color:'#1a1a2e',
                    outline:'none', boxSizing:'border-box', transition:'border-color 0.2s', fontFamily:'inherit', background:'#fff'
                  }}
                  onFocus={e => { e.target.style.borderColor='#3b45cc'; e.target.style.boxShadow='0 0 0 3px rgba(59,69,204,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor= errors.confirm ? '#dc2626' : pwMatch ? '#16a34a' : '#e5e7eb'; e.target.style.boxShadow='none'; }}
                />
                <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', display:'flex', alignItems:'center' }}>
                  {form.confirm ? (
                    pwMatch
                      ? <CheckCircle2 size={16} color="#16a34a"/>
                      : pwMismatch
                        ? <XCircle size={16} color="#dc2626"/>
                        : <button type="button" onClick={() => setShowConfirm(v => !v)} style={{ background:'none', border:'none', cursor:'pointer', padding:0, color:'#9ca3af', display:'flex' }}>
                            {showConfirm ? <EyeOff size={15}/> : <Eye size={15}/>}
                          </button>
                  ) : (
                    <button type="button" onClick={() => setShowConfirm(v => !v)} style={{ background:'none', border:'none', cursor:'pointer', padding:0, color:'#9ca3af', display:'flex' }}>
                      {showConfirm ? <EyeOff size={15}/> : <Eye size={15}/>}
                    </button>
                  )}
                </div>
              </div>
              {errors.confirm && <p style={{ margin:'4px 0 0', fontSize:12, color:'#dc2626' }}>{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'flex', alignItems:'flex-start', gap:9, cursor:'pointer', userSelect:'none' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  style={{ accentColor:'#3b45cc', width:14, height:14, marginTop:2, flexShrink:0 }}/>
                <span style={{ fontSize:12.5, color:'#6b7280', lineHeight:1.4 }}>
                  I agree to the{' '}
                  <Link to="/terms" style={{ color:'#3b45cc', fontWeight:600, textDecoration:'none' }}>Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" style={{ color:'#3b45cc', fontWeight:600, textDecoration:'none' }}>Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <p style={{ margin:'4px 0 0 23px', fontSize:12, color:'#dc2626' }}>{errors.terms}</p>}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              style={{
                width:'100%', height:46,
                background: loading ? 'rgba(59,69,204,0.7)' : 'linear-gradient(135deg, #3b45cc 0%, #5a5fe8 100%)',
                color:'#fff', border:'none', borderRadius:10,
                fontWeight:700, fontSize:14, cursor: loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                transition:'opacity 0.2s, transform 0.15s', fontFamily:'inherit', marginBottom:14
              }}
              onMouseEnter={e => { if(!loading) { e.currentTarget.style.opacity='0.92'; e.currentTarget.style.transform='scale(1.01)'; }}}
              onMouseLeave={e => { e.currentTarget.style.opacity='1'; e.currentTarget.style.transform='scale(1)'; }}
            >
              {loading ? <><Loader2 size={16} style={{ animation:'spin 1s linear infinite' }}/> Creating account...</> : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ flex:1, height:1, background:'#e5e7eb' }}/>
            <span style={{ color:'#9ca3af', fontSize:12 }}>OR</span>
            <div style={{ flex:1, height:1, background:'#e5e7eb' }}/>
          </div>

          {/* Google */}
          <button type="button"
            style={{
              width:'100%', height:44, background:'#fff', border:'1.5px solid #e5e7eb',
              borderRadius:10, cursor:'pointer', display:'flex', alignItems:'center',
              justifyContent:'center', gap:9, fontSize:13, fontWeight:500, color:'#374151',
              marginBottom:18, transition:'background 0.2s', fontFamily:'inherit'
            }}
            onMouseEnter={e => e.currentTarget.style.background='#f9fafb'}
            onMouseLeave={e => e.currentTarget.style.background='#fff'}
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* Footer link */}
          <p style={{ textAlign:'center', fontSize:13, color:'#6b7280', margin:0 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color:'#3b45cc', fontWeight:700, textDecoration:'none' }}>Sign In</Link>
          </p>
        </div>

        {/* Copyright */}
        <p style={{ marginTop:12, color:'#9ca3af', fontSize:11, textAlign:'center' }}>
          © 2026 CustomerPulse AI. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .auth-left-panel { display: none !important; }
          .auth-right-panel { flex: 0 0 100% !important; }
          .mobile-only-logo { display: flex !important; }
        }
        .auth-right-panel > div:first-child::-webkit-scrollbar { width: 4px; }
        .auth-right-panel > div:first-child::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default RegisterPage;
