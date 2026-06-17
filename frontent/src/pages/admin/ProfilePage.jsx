import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera, Upload, Pencil, Calendar, Info, Save, Lock,
  Trash2, AlertTriangle, X, ShieldAlert, MapPin, Phone,
  User, Mail, ArrowLeft, MoreHorizontal, CheckCircle
} from 'lucide-react';

// ── Components ───────────────────────────────────────────────────────────────

const Modal = ({ isOpen, onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Delete Account</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-500 text-[15px]">
            This action cannot be undone. This will permanently delete your account and remove your data from our systems.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Type DELETE to confirm</label>
            <input
              type="text"
              placeholder="DELETE"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 bg-gray-50">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200"
          >
            Cancel
          </button>
          <button
            disabled={confirmText !== 'DELETE'}
            onClick={onConfirm}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-200"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SectionHeader = ({ label, subLabel, badge }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-[17px] font-bold text-gray-900">{label}</h3>
    {badge && (
      <div className="flex items-center gap-2 bg-[#F0F3FF] px-4 py-1.5 rounded-full text-[13px] text-[#2D5BFF] font-medium border border-[#2D5BFF]/10">
        <Info size={16} />
        {badge}
      </div>
    )}
  </div>
);

const FormField = ({ label, value, type = "text", disabled = true, fullWidth = false }) => (
  <div className={fullWidth ? "col-span-full" : "col-span-1"}>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea
        defaultValue={value}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
        rows={3}
      />
    ) : (
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
      />
    )}
  </div>
);

// ── Main Page ───────────────────────────────────────────────────────────────

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('••••••••••');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-12">
      {/* 3. Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Profile Management</h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
          Home <span className="text-gray-300">/</span> Profile
        </p>
      </div>

      {/* 4. Section 1 — Profile Overview */}
      <section>
        <SectionHeader label="1. Profile Overview" />
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-[110px] h-[110px] rounded-full bg-[#7C3AED] flex items-center justify-center text-white text-4xl font-extrabold shadow-xl">
                JD
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-[#2D5BFF] text-white rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
            <div className="text-center">
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                <Upload size={16} />
                Upload Avatar
              </button>
              <p className="text-[11px] text-gray-400 mt-2">JPG, PNG or GIF (Max. 2MB)</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900">John Doe</h2>
            <p className="text-gray-500 font-medium">john.doe@example.com</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span className="bg-[#EDE9FE] text-[#7C3AED] px-4 py-1.5 rounded-full text-[13px] font-bold">
                Admin
              </span>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                Member since May 24, 2024
              </div>
            </div>
          </div>

          <div className="md:self-start">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Pencil size={16} />
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Section 2 — Personal Information */}
      <section>
        <SectionHeader 
          label="2. Personal Information" 
          badge="Click 'Edit Profile' above to update your information"
        />
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField label="Full Name" value="John Doe" disabled={!isEditing} />
            <FormField label="Email" value="john.doe@example.com" disabled={!isEditing} />
            <FormField label="Phone Number (Optional)" value="+1 (555) 123-4567" disabled={!isEditing} />
            <FormField label="Location (Optional)" value="New York, USA" disabled={!isEditing} />
            <div className="col-span-full">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-gray-700">Bio / About (Max 200 characters)</label>
                <span className="text-xs text-gray-400">89 / 200</span>
              </div>
              <textarea
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none ${!isEditing ? 'bg-gray-50 text-gray-500' : 'bg-white'}`}
                rows={3}
                defaultValue="E-commerce analytics enthusiast. Passionate about data-driven insights and customer experience."
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-50">
            <button className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
              Cancel
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2D5BFF] text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </section>

      {/* 6. Section 3 — Change Password */}
      <section>
        <SectionHeader label="3. Change Password" />
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
              <input type="password" value="••••••••••" readOnly className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
              <input type="password" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" />
              <div className="mt-4 space-y-2">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-green-500 transition-all duration-500"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-green-600">Strong</span>
                  <span className="text-[11px] text-green-500 flex items-center gap-1">
                    <CheckCircle size={12} />
                    Password looks strong!
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" />
            </div>
          </div>
          <div className="flex justify-end pt-6 border-t border-gray-50">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2D5BFF] text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Lock size={18} />
              Update Password
            </button>
          </div>
        </div>
      </section>

      {/* 7. Section 4 — Account Information */}
      <section>
        <SectionHeader label="4. Account Information" />
        <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100 divide-y divide-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 py-5">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-bold text-gray-900">User ID</span>
              <code className="text-sm text-gray-500 font-mono tracking-tighter">665f8c8d9e0b2d1f4a7c6d91</code>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-bold text-gray-900">Account Created</span>
              <span className="text-sm text-gray-500">May 24, 2024 08:42 AM (IST)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 py-5">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-bold text-gray-900">Last Login</span>
              <span className="text-sm text-gray-500">May 24, 2024 09:15 AM (IST)</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-bold text-gray-900">Account Role</span>
              <span className="bg-[#EDE9FE] text-[#7C3AED] px-3 py-1 rounded-full text-[11px] font-bold">Admin</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 py-5">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-bold text-gray-900">Account Status</span>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[11px] font-bold">Active</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-bold text-gray-900">Email</span>
              <span className="text-sm text-gray-500">john.doe@example.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Section 5 — Danger Zone */}
      <section>
        <SectionHeader label="5. Danger Zone" />
        <div className="bg-red-50/50 border border-red-100 rounded-[24px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm">
              <Trash2 size={28} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-red-600">Delete Account</h4>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-red-200 text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-all shadow-sm"
          >
            Delete Account
          </button>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="pt-12 text-center">
        <p className="text-[12px] text-gray-400 font-medium tracking-tight">
          © 2024 CustomerPulse AI. All rights reserved.
        </p>
      </footer>

      {/* Modal Dialog */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          alert('Account would be deleted here');
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProfilePage;
