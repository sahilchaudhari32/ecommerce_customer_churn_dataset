import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Database, BarChart2,
  Settings, LogOut, TrendingUp, Waves, Calendar,
  Download, Search, Bell, ChevronDown, Menu,
  DollarSign, User, Info, FileText, Shield, PieChart as PieIcon,
  ArrowUpRight, MoreHorizontal
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  fetchAllAnalytics, setDateRange
} from '../../store/analyticsSlice';
import CountUp from 'react-countup';

// ── Components ───────────────────────────────────────────────────────────────

const KPICard = ({ title, value, sub, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ translateY: -2, boxShadow: '0 8px 20px rgba(0,0,0,0.09)' }}
    className="bg-white border border-[#f1f5f9] rounded-[12px] p-[18px_20px] shadow-[0_2px_6px_rgba(0,0,0,0.05)] transition-all duration-200"
  >
    <div className="flex items-center gap-4">
      <div 
        className="w-[50px] h-[50px] rounded-full flex items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[12px] text-[#6b7280]">{title}</p>
        <h3 className="text-[32px] font-bold text-[#1a1a2e]">
          {typeof value === 'number' ? (
            <CountUp end={value} duration={1.5} separator="," decimals={value % 1 !== 0 ? 2 : 0} suffix={title.includes('Rate') ? '%' : ''} />
          ) : value}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          {sub}
        </div>
      </div>
    </div>
  </motion.div>
);

const ChartCard = ({ title, children, className = "" }) => (
  <div className={`bg-white border border-[#f1f5f9] rounded-[12px] p-[20px] ${className}`}>
    <h3 className="text-[15px] font-bold text-[#1a1a2e] mb-4">{title}</h3>
    {children}
  </div>
);

const InsightCard = ({ icon: Icon, title, stat, desc, impact, impactLevel, delay }) => {
  const getStyles = () => {
    switch (impactLevel) {
      case 'high': return { bg: '#fef2f2', text: '#dc2626', circleBg: '#fef2f2' };
      case 'strong': return { bg: '#f0fdf4', text: '#16a34a', circleBg: '#f0fdf4' };
      default: return { bg: '#fff7ed', text: '#ea580c', circleBg: '#fff7ed' };
    }
  };
  const s = getStyles();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white border border-[#f1f5f9] rounded-[12px] p-[20px] flex flex-col justify-between"
    >
      <div>
        <div 
          className="w-[44px] h-[44px] rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: s.bg }}
        >
          <Icon size={22} color={s.text} />
        </div>
        <p className="text-[13px] text-[#6b7280]">{title}</p>
        <h4 className="text-[22px] font-bold text-[#1a1a2e] my-1">{stat}</h4>
        <p className="text-[13px] text-[#6b7280]">{desc}</p>
      </div>
      <div 
        className="mt-4 px-2.5 py-0.5 rounded-[4px] text-[11px] font-semibold inline-block w-fit"
        style={{ backgroundColor: s.bg, color: s.text }}
      >
        {impact}
      </div>
    </motion.div>
  );
};

// ── Main Page ───────────────────────────────────────────────────────────────

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { 
    overview, churnTrend, byContract, byInternet, 
    byPayment, byGender, chargesDistribution, insights,
    loading, dateRange 
  } = useSelector(state => state.analytics);

  useEffect(() => {
    dispatch(fetchAllAnalytics(dateRange));
  }, [dispatch, dateRange]);

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Row */}
      <motion.div 
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-[28px] font-bold text-[#1a1a2e]">Analytics</h1>
          <p className="text-[13px] text-[#6b7280] mt-0.5">Data-driven insights from your customer base</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border-[1.5px] border-[#e5e7eb] rounded-[8px] text-[13px] text-[#1a1a2e] hover:bg-gray-50 transition-colors">
            <Calendar size={16} className="text-[#6b7280]" />
            May 01, 2024 — May 31, 2024
            <ChevronDown size={14} className="ml-1" />
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-white border-[1.5px] border-[#e5e7eb] rounded-[8px] text-[13px] font-medium text-[#1a1a2e] hover:bg-gray-50 transition-colors"
          >
            <Download size={16} className="text-[#6b7280]" />
            Export PDF
          </button>
        </div>
      </motion.div>

      {/* Section 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <KPICard 
          title="Total Records in DB"
          value={overview.totalRecords}
          color="#3b82f6"
          delay={0.1}
          sub={<><span className="text-[#3b45cc] font-bold text-[12px]">100%</span> <span className="text-[#6b7280] text-[12px]">of all records</span></>}
          icon={Database}
        />
        <KPICard 
          title="Overall Churn Rate"
          value={overview.churnRate}
          color="#f43f5e"
          delay={0.2}
          sub={<><span className="text-[#f43f5e] font-bold text-[12px] flex items-center">▲ {overview.churnRateChange}%</span> <span className="text-[#6b7280] text-[12px]">vs previous period</span></>}
          icon={TrendingUp}
        />
        <KPICard 
          title="Avg Monthly Charge"
          value={<div className="flex items-center gap-2">
            <span className="text-[#dc2626] font-bold text-[26px]">${overview.avgMonthlyChargeChurned}</span>
            <span className="text-[#6b7280] text-[13px]">vs</span>
            <span className="text-[#16a34a] font-bold text-[26px]">${overview.avgMonthlyChargeRetained}</span>
          </div>}
          color="#10b981"
          delay={0.3}
          sub={
            <div className="flex gap-10">
              <span className="text-[#dc2626] text-[11px]">Churned</span>
              <span className="text-[#16a34a] text-[11px]">Retained</span>
            </div>
          }
          icon={DollarSign}
        />
        <KPICard 
          title="Avg Tenure (Months)"
          value={<div className="flex items-center gap-2">
            <span className="text-[#dc2626] font-bold text-[26px]">{overview.avgTenureChurned}</span>
            <span className="text-[#6b7280] text-[13px]">vs</span>
            <span className="text-[#16a34a] font-bold text-[26px]">{overview.avgTenureRetained}</span>
          </div>}
          color="#8b5cf6"
          delay={0.4}
          sub={
            <div className="flex gap-10">
              <span className="text-[#dc2626] text-[11px]">Churned</span>
              <span className="text-[#16a34a] text-[11px]">Retained</span>
            </div>
          }
          icon={User}
        />
      </div>

      {/* Section 2: Churn Trend */}
      <div className="mt-7">
        <ChartCard title="Churn Trend Over Time (Monthly)">
          <div className="flex gap-5 mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="text-[13px] text-[#6b7280]">Churned Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
              <span className="text-[13px] text-[#6b7280]">Retained Customers</span>
            </div>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={churnTrend} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#6b7280' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                  label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11, dx: -5 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="churned" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                  animationDuration={1800}
                  label={{ position: 'top', fontSize: 10, fill: '#ef4444' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="retained" 
                  stroke="#16a34a" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                  animationDuration={1800}
                  label={{ position: 'top', fontSize: 10, fill: '#16a34a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Section 3: Analysis by Dimensions */}
      <div className="mt-7">
        <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">3. Churn Analysis by Key Dimensions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Churn by Contract Type" className="h-full">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byContract} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={5} />
                  <YAxis 
                    axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }}
                    label={{ value: 'Churned Customers', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }}
                  />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1000}
                    label={{ position: 'top', fontSize: 12, fontWeight: 'bold', fill: '#1a1a2e' }}
                  >
                    {byContract.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Churn by Internet Service" className="h-full">
            <div className="h-[260px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byInternet}
                    cx="40%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    animationDuration={1200}
                  >
                    {byInternet.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    formatter={(value, entry) => (
                      <div className="inline-flex justify-between w-[140px]">
                        <span className="text-[12px] text-[#6b7280]">{value}</span>
                        <span className="text-[12px] font-semibold">{entry.payload.value}%</span>
                      </div>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Section 4: Payment & Gender */}
      <div className="mt-7">
        <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">4. Churn by Payment Method & Gender</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartCard title="Churn by Payment Method">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byPayment} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#6b7280' }} 
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} label={{ value: 'Churned Customers', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1000} label={{ position: 'top', fontSize: 11 }}>
                    {byPayment.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Churn by Gender">
            <div className="flex justify-end gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#ef4444]" />
                <span className="text-[11px] text-[#6b7280]">Churned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#22c55e]" />
                <span className="text-[11px] text-[#6b7280]">Retained</span>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byGender} barCategoryGap="30%" barGap={4} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} label={{ value: 'Customers', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} animationDuration={1000} label={{ position: 'top', fontSize: 10 }} />
                  <Bar dataKey="retained" fill="#22c55e" radius={[4, 4, 0, 0]} animationDuration={1000} label={{ position: 'top', fontSize: 10 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Section 5: Monthly Charges Distribution */}
      <div className="mt-7">
        <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">5. Monthly Charges Distribution</h2>
        <ChartCard title="Monthly Charges Distribution (Churned vs Retained)">
          <div className="flex gap-5 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="text-[12px] text-[#6b7280]">Churned Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span className="text-[12px] text-[#6b7280]">Retained Customers</span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Monthly Charges" 
                  unit="$" 
                  axisLine={false} 
                  tickLine={false}
                  label={{ value: 'Monthly Charges (USD)', position: 'bottom', fill: '#6b7280', fontSize: 12 }}
                  domain={[0, 120]}
                  ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Count" 
                  axisLine={false} 
                  tickLine={false}
                  label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }}
                  domain={[0, 600]}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Retained" data={chargesDistribution.retained} fill="#22c55e" shape="circle" line={false} />
                <Scatter name="Churned" data={chargesDistribution.churned} fill="#ef4444" shape="circle" line={false} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Section 6: Key Insights */}
      <div className="mt-7">
        <h2 className="text-[16px] font-bold text-[#1a1a2e] mb-4">6. Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InsightCard 
            icon={TrendingUp}
            title="Fiber optic users churn"
            stat="42% more"
            desc="than DSL users."
            impact="Impact: High"
            impactLevel="high"
            delay={0.1}
          />
          <InsightCard 
            icon={FileText}
            title="Month-to-month contracts have"
            stat="3x higher churn"
            desc="compared to two-year contracts."
            impact="Impact: High"
            impactLevel="high"
            delay={0.2}
          />
          <InsightCard 
            icon={Shield}
            title="Customers with tenure > 24 months"
            stat="churn 70% less"
            desc="compared to those with < 12 months."
            impact="Impact: Strong"
            impactLevel="strong"
            delay={0.3}
          />
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="mt-6 mb-8 flex items-center gap-2">
        <Info size={16} className="text-[#3b82f6]" />
        <p className="text-[12px] text-[#6b7280] italic">
          Insights are generated from aggregation data and may vary based on the selected date range.
        </p>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .min-h-screen { min-height: auto !important; height: auto !important; overflow: visible !important; }
        }
      `}</style>
    </div>
  );
};

export default AnalyticsPage;
