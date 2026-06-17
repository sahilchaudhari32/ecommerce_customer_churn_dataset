import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Database, BarChart2,
  Settings, LogOut, Search, Bell, ChevronDown, Menu,
  Palette, User, Shield, BellRing, Server, Check,
  Camera, Lock, Monitor, ArrowRight, Download, Activity, Trash2,
  Info
} from 'lucide-react';

// ── Components ───────────────────────────────────────────────────────────────

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`${
      enabled ? 'bg-[#2D5BFF]' : 'bg-gray-200'
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
  >
    <span
      className={`${
        enabled ? 'translate-x-5' : 'translate-x-0'
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
    />
  </button>
);

const SegmentedControl = ({ options, selected, onChange }) => (
  <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
          selected === opt.value
            ? 'bg-[#2D5BFF] text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

const SettingRow = ({ title, desc, children }) => (
  <div className="flex items-center justify-between py-6 border-b border-gray-100 last:border-0">
    <div className="max-w-[60%]">
      <h4 className="text-[15px] font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
    <div className="flex-shrink-0">
      {children}
    </div>
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

// ── Main Page ───────────────────────────────────────────────────────────────

const SettingsPage = () => {
  // State for interactive elements
  const [activeTab, setActiveTab] = useState('Appearance');
  const [theme, setTheme] = useState('Dark');
  const [accentColor, setAccentColor] = useState('purple');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [tableDensity, setTableDensity] = useState('Standard');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    weeklyReport: true,
    systemNotifs: true,
    loginAlerts: false
  });

  const accentColors = [
    { id: 'blue', color: '#2D5BFF' },
    { id: 'purple', color: '#8B5CF6' },
    { id: 'green', color: '#10B981' },
    { id: 'orange', color: '#F59E0B' },
    { id: 'red', color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* 3a & 3b: Settings Main Panels */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Nav Panel */}
        <Card className="w-full lg:w-[220px] flex-shrink-0 p-4">
          <h2 className="text-lg font-bold text-gray-900 px-2 mb-4">Settings</h2>
          <nav className="space-y-1">
            {[
              { id: 'Appearance', icon: Palette, label: 'Appearance' },
              { id: 'Account', icon: User, label: 'Account' },
              { id: 'Notifications', icon: BellRing, label: 'Notifications' },
              { id: 'Security', icon: Shield, label: 'Security' },
              { id: 'System', icon: Server, label: 'System' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-[#F0F3FF] text-[#2D5BFF] border-l-4 border-[#2D5BFF]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="bg-[#F0F3FF] p-4 rounded-xl flex gap-3">
              <Shield size={18} className="text-[#2D5BFF] flex-shrink-0" />
              <p className="text-[12px] text-[#2D5BFF] leading-relaxed">
                Your settings are synchronized across devices.
              </p>
            </div>
          </div>
        </Card>

        {/* Right Content Panel - Appearance */}
        <Card className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Appearance</h2>
            <p className="text-sm text-gray-500 mt-1">Customize how the application looks and feels.</p>
          </div>

          <div className="divide-y divide-gray-100">
            <SettingRow title="Theme" desc="Choose your preferred theme.">
              <SegmentedControl 
                options={[
                  { label: '☀ Light', value: 'Light' },
                  { label: '🌙 Dark', value: 'Dark' },
                  { label: '🖥 System', value: 'System' }
                ]}
                selected={theme}
                onChange={setTheme}
              />
            </SettingRow>

            <SettingRow title="Accent Color" desc="Choose an accent color for the application.">
              <div className="flex gap-3">
                {accentColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setAccentColor(color.id)}
                    className="relative w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
                    style={{ backgroundColor: color.color }}
                  >
                    {accentColor === color.id && (
                      <>
                        <div className="absolute inset-[-4px] rounded-full border-2 border-inherit opacity-30 animate-pulse" style={{ borderColor: color.color }}></div>
                        <Check size={16} className="text-white" />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </SettingRow>

            <SettingRow title="Sidebar Collapse Default" desc="Start with sidebar collapsed by default.">
              <Toggle enabled={sidebarCollapsed} onChange={setSidebarCollapsed} />
            </SettingRow>

            <SettingRow title="Table Density" desc="Choose the default density for tables.">
              <SegmentedControl 
                options={[
                  { label: 'Compact', value: 'Compact' },
                  { label: 'Standard', value: 'Standard' },
                  { label: 'Comfortable', value: 'Comfortable' }
                ]}
                selected={tableDensity}
                onChange={setTableDensity}
              />
            </SettingRow>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="flex items-center gap-2 bg-[#2D5BFF] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              <Check size={18} />
              Save Changes
            </button>
          </div>
        </Card>
      </div>

      {/* 4. Three Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Account */}
        <Card className="flex flex-col items-center">
          <div className="w-full flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 text-[#2D5BFF] rounded-lg">
              <Palette size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Account</h3>
              <p className="text-[12px] text-gray-500">Manage your account details and preferences.</p>
            </div>
          </div>
          
          <div className="relative mt-2">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Admin"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-[#2D5BFF] text-white rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform">
              <Camera size={14} />
            </button>
          </div>
          
          <div className="text-center mt-4 mb-6">
            <h4 className="text-lg font-bold text-gray-900">Admin User</h4>
            <p className="text-sm text-gray-500">admin@example.com</p>
          </div>

          <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full justify-center">
            <User size={16} />
            Edit Profile
          </button>
        </Card>

        {/* Card 2: Notifications */}
        <Card>
          <div className="w-full flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Notifications</h3>
              <p className="text-[12px] text-gray-500">Configure your notification preferences.</p>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            {[
              { id: 'emailAlerts', label: 'Email alerts on new churn records' },
              { id: 'weeklyReport', label: 'Weekly analytics report' },
              { id: 'systemNotifs', label: 'System notifications' },
              { id: 'loginAlerts', label: 'Login alerts' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                <Toggle 
                  enabled={notifications[item.id]} 
                  onChange={(val) => setNotifications({...notifications, [item.id]: val})} 
                />
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full justify-center">
            <Settings size={16} />
            Manage Notifications
          </button>
        </Card>

        {/* Card 3: Security */}
        <Card>
          <div className="w-full flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Security</h3>
              <p className="text-[12px] text-gray-500">Manage your password and account security.</p>
            </div>
          </div>
          
          <div className="space-y-1 mb-6">
            {[
              { icon: Lock, color: 'bg-orange-50 text-orange-600', title: 'Change Password', desc: 'Update your account password' },
              { icon: Monitor, color: 'bg-blue-50 text-blue-600', title: 'Active Sessions', desc: 'Manage your active sessions' },
              { icon: Shield, color: 'bg-green-50 text-green-600', title: 'Two-Factor Authentication', desc: 'Add an extra layer of security' }
            ].map((item, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${item.color} rounded-lg`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-[12px] text-gray-500">{item.desc}</p>
                  </div>
                </div>
                <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors -rotate-90" />
              </button>
            ))}
          </div>

          <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full justify-center">
            <Shield size={16} />
            Manage Security
          </button>
        </Card>
      </div>

      {/* 5. Full-Width System Card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 text-gray-600 rounded-xl">
              <Server size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">System</h3>
              <p className="text-sm text-gray-500">System information and administrative tools.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-[#2D5BFF] rounded-lg">
                <Database size={18} />
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Total Records</p>
                <p className="text-lg font-bold text-gray-900">12,540</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Server size={18} />
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Database Size</p>
                <p className="text-lg font-bold text-gray-900">128.45 GB</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <Activity size={18} />
              </div>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Last Sync</p>
                <p className="text-lg font-bold text-gray-900">May 24, 2024</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-colors">
              <Trash2 size={16} />
              Clear Cache
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#2D5BFF] text-[#2D5BFF] rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
              <Download size={16} />
              Export Database
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#2D5BFF] text-[#2D5BFF] rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
              <Activity size={16} />
              System Status
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
