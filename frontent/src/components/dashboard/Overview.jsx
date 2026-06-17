import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Users, TrendingDown, Calendar, ExternalLink, 
  TrendingUp, FileText, ShieldCheck, Monitor, Smartphone, 
  ArrowUpRight, Clock, Database, User, LogOut, Search, Bell, ChevronDown, Menu
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { fetchDashboard } from '../../store/dashboardSlice';

// ── Components ───────────────────────────────────────────────────────────────

const KPICard = ({ title, sub, value, subValue, icon: Icon, colorBg, colorText, trendIcon: TrendIcon }) => (
  <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 h-full">
    <div className="flex items-center gap-4 mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorBg}`}>
        <Icon size={24} className={colorText} />
      </div>
      <div>
        <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{title}</h4>
        <p className="text-[12px] text-gray-500">{sub}</p>
      </div>
    </div>
    <div className="space-y-1">
      <h3 className="text-[28px] font-extrabold text-gray-900">{value}</h3>
      <div className={`flex items-center gap-1 text-[13px] font-medium ${colorText}`}>
        {TrendIcon && <TrendIcon size={14} />}
        {subValue}
      </div>
    </div>
  </div>
);

const InsightItem = ({ label, stat, desc, icon: Icon, colorBg, colorText }) => (
  <div className={`flex items-center gap-4 p-4 rounded-xl ${colorBg}`}>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm`}>
      <Icon size={20} className={colorText} />
    </div>
    <div>
      <p className="text-[11px] font-semibold text-gray-900 uppercase tracking-wider">{label}</p>
      <h5 className={`text-[18px] font-bold ${colorText} my-0.5`}>{stat}</h5>
      <p className="text-[12px] text-gray-600">{desc}</p>
    </div>
  </div>
);

const Overview = () => {
  const dispatch = useDispatch();
  const { overview, monthlyTrend, byCategory, topStats, recentChurned, loading } = useSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  if (loading && !overview) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Loading dashboard intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-12">
      
      {/* 3. Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-[24px] p-8 overflow-hidden shadow-lg shadow-blue-200"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-white">
          <div className="space-y-6 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-extrabold flex items-center gap-3">
                Good morning, John Doe <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-blue-100 mt-2 text-lg">Here's your churn analytics overview for today.</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
              <Calendar size={16} />
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' })}
            </div>
          </div>
          
          <div className="hidden md:block w-[300px]">
            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl transform rotate-3">
                <div className="space-y-3">
                  <div className="h-4 w-2/3 bg-white/40 rounded-full"></div>
                  <div className="flex items-end gap-2 h-24 pt-4 px-2">
                    <div className="flex-1 bg-white/60 rounded-t-lg h-1/2"></div>
                    <div className="flex-1 bg-white/80 rounded-t-lg h-3/4"></div>
                    <div className="flex-1 bg-white/40 rounded-t-lg h-1/3"></div>
                    <div className="flex-1 bg-white/90 rounded-t-lg h-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-12 w-12 bg-white/20 rounded-full -mr-4 -mt-4 animate-bounce"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Three KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard 
          title="Total Customers"
          sub="in Dataset"
          value={overview?.totalCustomers?.toLocaleString() || '0'}
          subValue={`${overview?.trends?.total}% vs last month`}
          icon={Users}
          colorBg="bg-blue-50"
          colorText="text-blue-600"
          trendIcon={TrendingUp}
        />
        <KPICard 
          title="Churn Rate"
          sub="Overall"
          value={`${overview?.churnRate}%`}
          subValue={`${overview?.trends?.rate}% vs previous period`}
          icon={TrendingDown}
          colorBg="bg-red-50"
          colorText="text-red-600"
          trendIcon={TrendingDown}
        />
        <KPICard 
          title="Retained Rate"
          sub="Active Customers"
          value={`${(100 - (overview?.churnRate || 0)).toFixed(1)}%`}
          subValue={`${overview?.trends?.retained}% uplift`}
          icon={ShieldCheck}
          colorBg="bg-green-50"
          colorText="text-green-600"
          trendIcon={TrendingUp}
        />
      </div>

      {/* 5. Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card A: Line Chart */}
        <div className="lg:col-span-8 bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">Monthly Churn Trend</h3>
              <p className="text-sm text-gray-500">Churn Percentage Over Time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-sm font-medium text-gray-600">Churn Rate (%)</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                  formatter={(v) => [`${v}%`, 'Churn Rate']}
                />
                <Line 
                  type="monotone" 
                  dataKey="churnRate" 
                  stroke="#2563eb" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                  label={{ position: 'top', fontSize: 10, fill: '#2563eb', offset: 10, formatter: (v) => `${v}%` }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card B: Donut Chart */}
        <div className="lg:col-span-4 bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">By Category</h3>
            <p className="text-sm text-gray-500">Churn count distribution</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-[240px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="category"
                    strokeWidth={0}
                  >
                    {byCategory?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-2xl font-black text-gray-900">{(overview?.churnedCustomers || 0).toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Total Churned</div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-3 w-full">
              {byCategory?.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-bold text-gray-600 truncate">{item.category}</span>
                  </div>
                  <span className="text-[11px] font-black text-gray-900">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Bottom Section Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card C: Recent Records Table */}
        <div className="lg:col-span-8 bg-white rounded-[16px] p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">Recent Churned Customers</h3>
            <button className="text-blue-600 text-sm font-bold flex items-center gap-1.5 hover:underline transition-all">
              See All <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider rounded-l-lg">Name</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Contract</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(recentChurned || []).map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-4 py-4 text-sm font-bold text-gray-900">{row.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{row.email}</td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] bg-red-50 text-red-600 font-bold border border-red-100">
                        {row.contractType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-bold text-gray-700">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              <Database size={16} className="text-blue-600" />
              View Database Records
            </button>
          </div>
        </div>

        {/* Card D: Key Insights */}
        <div className="lg:col-span-4 bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 leading-tight">System Insights</h3>
          </div>
          <div className="space-y-4">
            <InsightItem 
              label="Avg Tenure (Churned)"
              stat={`${topStats?.avgTenureChurned} Months`}
              desc={`Compared to ${topStats?.avgTenureRetained} mo for active customers`}
              icon={Clock}
              colorBg="bg-blue-50"
              colorText="text-blue-600"
            />
            <InsightItem 
              label="Primary Churn Driver"
              stat={topStats?.topChurnReason}
              desc={`Accounts for ${topStats?.topChurnReasonPct}% of total churn`}
              icon={TrendingUp}
              colorBg="bg-red-50"
              colorText="text-red-500"
            />
            <InsightItem 
              label="Churn Prediction"
              stat="85% Accuracy"
              desc="System confidence in latest projections"
              icon={ShieldCheck}
              colorBg="bg-green-50"
              colorText="text-green-600"
            />
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 italic text-[11px] text-gray-400">
            Analytics kernel last synced: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Overview;
