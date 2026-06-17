import React from 'react';
import { BarChart2, Target, Users, TrendingUp, Building2 } from 'lucide-react';

// ── Mini Dashboard Mockup ──────────────────────────────────────────────────────
const DashboardMockup = () => (
  <div style={{
    background: '#fff', borderRadius: 10, overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)', fontSize: 8,
    userSelect: 'none', width: '100%', height: '100%',
    display: 'flex', flexDirection: 'column',
  }}>
    {/* Title bar */}
    <div style={{ background: '#f3f4f6', borderBottom: '1px solid #e5e7eb', padding: '5px 8px', display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'block' }} />
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f59e0b', display: 'block' }} />
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'block' }} />
      <span style={{ marginLeft: 6, color: '#6b7280', fontWeight: 500, fontSize: 7.5, display: 'flex', alignItems: 'center', gap: 4 }}>
        <BarChart2 size={8} color="#6366f1" /> CustomerPulse AI
      </span>
    </div>
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      {/* Sidebar */}
      <div style={{ width: 75, background: '#1e1e3f', padding: '8px 0', flexShrink: 0, overflowY: 'hidden' }}>
        {[
          { label: 'Dashboard', active: true },
          { label: 'Customers', active: false },
          { label: 'Churn Prediction', active: false },
          { label: 'Analytics', active: false },
          { label: 'Segments', active: false },
          { label: 'Campaigns', active: false },
          { label: 'Reports', active: false },
          { label: 'Settings', active: false },
        ].map(({ label, active }) => (
          <div key={label} style={{
            padding: '4px 7px',
            color: active ? '#fff' : 'rgba(255,255,255,0.45)',
            background: active ? 'rgba(99,102,241,0.3)' : 'transparent',
            borderLeft: active ? '2px solid #6366f1' : '2px solid transparent',
            fontWeight: active ? 700 : 400, fontSize: 7.5,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>{label}</div>
        ))}
      </div>
      {/* Main content */}
      <div style={{ flex: 1, padding: '8px 10px', overflow: 'hidden', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontWeight: 700, fontSize: 10, color: '#1a1a2e', marginBottom: 7 }}>Dashboard</div>
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4, marginBottom: 7, flexShrink: 0 }}>
          {[
            { label: 'Customer Churn Rate', value: '12.4%', change: '↓4.6%', neg: false },
            { label: 'Retention Rate', value: '87.6%', change: '↑5.2%', neg: false },
            { label: 'Customers at Risk', value: '1,250', change: '↑8.1%', neg: true },
            { label: 'Revenue Impact', value: '$24,500', change: '↓3.4%', neg: true },
          ].map(({ label, value, change, neg }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 5, padding: '4px 5px', border: '1px solid #e5e7eb' }}>
              <div style={{ color: '#9ca3af', fontSize: 6.5, marginBottom: 2 }}>{label}</div>
              <div style={{ fontWeight: 800, color: '#1a1a2e', fontSize: 9.5 }}>{value}</div>
              <div style={{ color: neg ? '#ef4444' : '#22c55e', fontSize: 6.5, fontWeight: 600 }}>{change}</div>
            </div>
          ))}
        </div>
        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, flex: 1, minHeight: 0 }}>
          {/* Line chart */}
          <div style={{ background: '#fff', borderRadius: 5, padding: '5px 6px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 7.5, marginBottom: 4 }}>Churn Rate Over Time</div>
            <svg viewBox="0 0 110 52" style={{ width: '100%' }}>
              <defs>
                <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {['20%','15%','10%','5%'].map((l, i) => (
                <text key={l} x="2" y={5 + i * 11} fontSize="4.5" fill="#9ca3af">{l}</text>
              ))}
              {[5,16,27,38].map(y => (
                <line key={y} x1="18" y1={y} x2="108" y2={y} stroke="#f3f4f6" strokeWidth="0.5"/>
              ))}
              <polyline points="18,38 30,33 43,28 55,30 68,20 80,15 93,10 108,8" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <polygon points="18,38 30,33 43,28 55,30 68,20 80,15 93,10 108,8 108,44 18,44" fill="url(#lg2)"/>
              <rect x="60" y="14" width="32" height="12" rx="2" fill="#1e293b"/>
              <text x="76" y="20" fontSize="4" fill="white" textAnchor="middle" fontWeight="600">June 2024</text>
              <text x="76" y="24" fontSize="3.5" fill="rgba(255,255,255,0.7)" textAnchor="middle">Churn Rate: 12.4%</text>
              {['Jan','Feb','Mar','Apr','May','Jun','Jul'].map((m, i) => (
                <text key={m} x={18 + i * 15} y="50" fontSize="4.5" fill="#9ca3af">{m}</text>
              ))}
            </svg>
          </div>
          {/* Donut chart */}
          <div style={{ background: '#fff', borderRadius: 5, padding: '5px 6px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ color: '#1a1a2e', fontWeight: 700, fontSize: 7.5, marginBottom: 3 }}>Customers at Risk</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg viewBox="0 0 54 54" style={{ width: 52, flexShrink: 0 }}>
                <circle cx="27" cy="27" r="20" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                <circle cx="27" cy="27" r="20" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="65 60" strokeDashoffset="0" strokeLinecap="round"/>
                <circle cx="27" cy="27" r="20" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="40 85" strokeDashoffset="-65" strokeLinecap="round"/>
                <circle cx="27" cy="27" r="20" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray="20 105" strokeDashoffset="-105" strokeLinecap="round"/>
                <text x="27" y="25" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#1a1a2e">1,250</text>
                <text x="27" y="31" textAnchor="middle" fontSize="4.5" fill="#6b7280">Total</text>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                {[
                  { color: '#ef4444', label: 'High Risk', val: '650 (52%)' },
                  { color: '#f59e0b', label: 'Medium Risk', val: '400 (32%)' },
                  { color: '#22c55e', label: 'Low Risk', val: '200 (16%)' },
                ].map(({ color, label, val }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, display: 'block' }}/>
                    <span style={{ fontSize: 6.5, color: '#6b7280', flex: 1 }}>{label}</span>
                    <span style={{ fontSize: 6.5, color: '#1a1a2e', fontWeight: 700 }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Stat Card ──────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, line1, line2 }) => (
  <div style={{
    background: 'rgba(255,255,255,0.10)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 10, padding: '10px 12px', flex: 1, minWidth: 0
  }}>
    <Icon size={14} color="rgba(255,255,255,0.75)" style={{ marginBottom: 5 }}/>
    <div style={{ color: '#fff', fontWeight: 800, fontSize: 18, lineHeight: 1 }}>{value}</div>
    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 9, fontWeight: 500, marginTop: 2 }}>{line1}</div>
    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9 }}>{line2}</div>
  </div>
);

// ── Shared Left Panel ──────────────────────────────────────────────────────────
const AuthLeftPanel = () => (
  <div
    className="auth-left-panel"
    style={{
      flex: '0 0 50%',
      background: 'linear-gradient(135deg, #1a1f8f 0%, #3b45cc 55%, #5b3fa0 100%)',
      display: 'flex', flexDirection: 'column',
      padding: '28px 36px 24px',
      position: 'relative', overflow: 'hidden',
    }}
  >
    {/* Decorative arcs */}
    <svg style={{ position:'absolute', top:'-10%', right:'-18%', width:'70%', opacity:0.07, pointerEvents:'none' }} viewBox="0 0 500 500">
      {[60,110,160,210,260,310].map(r => (
        <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="white" strokeWidth="1.5"/>
      ))}
    </svg>
    <svg style={{ position:'absolute', bottom:'-15%', left:'-10%', width:'55%', opacity:0.05, pointerEvents:'none' }} viewBox="0 0 400 400">
      {[50,100,150,200].map(r => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="white" strokeWidth="1.5"/>
      ))}
    </svg>

    <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:24, position:'relative', zIndex:1 }}>
      <div style={{ 
        background:'#fff', borderRadius:12, padding:'5px', 
        flexShrink:0, width: 44, height: 44, 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <img src="https://cdn.corenexis.com/f/pPeXd8lUyZu.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <div style={{ paddingTop: 2 }}>
        <div style={{ color:'#fff', fontWeight:800, fontSize:17, lineHeight:1.1, letterSpacing: '0.01em' }}>CustomerPulse AI</div>
        <div style={{ color:'rgba(255,255,255,0.7)', fontSize:11, fontWeight:400, marginTop: 4, lineHeight:1.3 }}>Intelligent Churn Prediction<br/>Platform</div>
      </div>
    </div>

    {/* Headline */}
    <div style={{ position:'relative', zIndex:1, marginBottom:20 }}>
      <h1 style={{ color:'#fff', fontWeight:800, fontSize:32, lineHeight:1.15, margin:0, marginBottom:10, letterSpacing:'-0.5px' }}>
        Predict Customer Churn<br/>Before It Happens
      </h1>
      <p style={{ color:'rgba(255,255,255,0.8)', fontSize:12.5, lineHeight:1.6, margin:0, maxWidth:360 }}>
        AI-powered insights that help businesses retain customers, increase loyalty, and maximize customer lifetime value.
      </p>
    </div>

    {/* Stats */}
    <div style={{ display:'flex', gap:8, marginBottom:20, position:'relative', zIndex:1 }}>
      <StatCard icon={Target}     value="94%"  line1="Prediction"       line2="Accuracy"/>
      <StatCard icon={Users}      value="10K+" line1="Customers"        line2="Analyzed"/>
      <StatCard icon={TrendingUp} value="3x"   line1="Retention"        line2="Improvement"/>
      <StatCard icon={Building2}  value="500+" line1="Businesses Using" line2="Platform"/>
    </div>

    {/* Dashboard Mockup */}
    <div style={{ flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:1, overflow:'hidden', minHeight:0 }}>
      <div style={{ flex:1, minHeight:0, transform:'perspective(1200px) rotateX(5deg)', transformOrigin:'bottom center', width:'100%', height:'100%', display:'flex', flexDirection:'column' }}>
        <DashboardMockup/>
      </div>
    </div>
  </div>
);

export default AuthLeftPanel;
