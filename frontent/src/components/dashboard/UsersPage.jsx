import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Plus, ChevronDown, MoreVertical, 
  Eye, Edit2, Trash2, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { 
  Avatar, Button, TextField, Select, MenuItem, 
  IconButton, Chip, Tooltip, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, InputAdornment, Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { 
  fetchUsers, setFilter, setPage, setLimit, 
  setSelectedUser, toggleModal, resetFilters,
  createUser, updateUser, deleteUser
} from '../../store/usersSlice';

// ── Components ───────────────────────────────────────────────────────────────

const RoleChip = ({ role }) => {
  const isAdmin = role === 'Admin';
  return (
    <div style={{
      background: isAdmin ? '#fff7ed' : '#f0f4ff',
      color: isAdmin ? '#ea580c' : '#3b45cc',
      border: `1px solid ${isAdmin ? '#fed7aa' : '#c7d2fe'}`,
      borderRadius: 6,
      padding: '3px 12px',
      fontSize: 12,
      fontWeight: 500,
      display: 'inline-block'
    }}>
      {role}
    </div>
  );
};

const StatusChip = ({ status }) => {
  const isActive = status === 'Active';
  return (
    <div style={{
      background: isActive ? '#f0fdf4' : '#fef2f2',
      color: isActive ? '#16a34a' : '#dc2626',
      border: `1px solid ${isActive ? '#bbf7d0' : '#fecaca'}`,
      borderRadius: 6,
      padding: '3px 10px',
      fontSize: 12,
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      width: 'fit-content'
    }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: isActive ? '#16a34a' : '#dc2626' }} />
      {status}
    </div>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────────

const UsersPage = () => {
  const dispatch = useDispatch();
  const { 
    users, total, page, totalPages, limit, filters, 
    loading, modalOpen, selectedUser 
  } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ ...filters, page, limit }));
  }, [dispatch, filters, page, limit]);

  const handleSearchChange = (e) => {
    dispatch(setFilter({ search: e.target.value }));
  };

  const handleRoleFilter = (e) => {
    dispatch(setFilter({ role: e.target.value }));
  };

  const handleStatusFilter = (e) => {
    dispatch(setFilter({ status: e.target.value }));
  };

  const openModal = (type, user = null) => {
    if (user) dispatch(setSelectedUser(user));
    dispatch(toggleModal({ type, open: true }));
  };

  const closeModal = (type) => {
    dispatch(toggleModal({ type, open: false }));
    if (type !== 'delete') dispatch(setSelectedUser(null));
  };

  // ── Render Helpers ─────────────────────────────────────────────────────────

  const renderTableRows = () => {
    if (loading) {
      return [...Array(limit)].map((_, i) => (
        <tr key={i} style={{ borderBottom: '1px solid #f8fafc', height: 64 }}>
           <td colSpan={7} style={{ padding: '0 16px' }}>
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
           </td>
        </tr>
      ));
    }

    if (users.length === 0) {
      return (
        <tr>
          <td colSpan={7}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ padding: 60, textAlign: 'center' }}
            >
              <img 
                src="https://raw.githubusercontent.com/sahilchaudhari32/ecommerce_customer_churn_dataset/main/frontent/src/assets/no-results.svg" 
                alt="No Results" 
                style={{ width: 180, marginBottom: 20 }}
                onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='120' viewBox='0 0 180 120'%3E%3Crect width='180' height='120' fill='%23f8fafc'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' alignment-baseline='middle' fill='%239ca3af' font-size='12'%3ENo Illustration found%3C/text%3E%3C/svg%3E";
                }}
              />
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}>No users found</h3>
              <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>We couldn't find any users matching your criteria.</p>
              <button 
                onClick={() => dispatch(resetFilters())}
                style={{
                  border: '1.5px solid #e5e7eb', background: '#fff', color: '#1a1a2e',
                  borderRadius: 8, padding: '8px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer'
                }}
              >
                Clear Filters
              </button>
            </motion.div>
          </td>
        </tr>
      );
    }

    return (
      <AnimatePresence mode="popLayout">
        {users.map((user, idx) => (
          <motion.tr
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            style={{ borderBottom: '1px solid #f8fafc', height: 64 }}
            className="hover:bg-[#f8fafc] transition-colors"
          >
            <td style={{ padding: '0 16px', color: '#6b7280', fontSize: 13 }}>{user.id}</td>
            <td style={{ padding: '0 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar src={`https://i.pravatar.cc/150?u=${user.email}`} sx={{ width: 36, height: 36, fontSize: 14 }}>{user.name.charAt(0)}</Avatar>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a2e' }}>{user.name}</div>
              </div>
            </td>
            <td style={{ padding: '0 16px', color: '#6b7280', fontSize: 13 }}>{user.email}</td>
            <td style={{ padding: '0 16px' }}><RoleChip role={user.role} /></td>
            <td style={{ padding: '0 16px' }}><StatusChip status={user.status} /></td>
            <td style={{ padding: '0 16px', color: '#6b7280', fontSize: 13 }}>{user.createdDate}</td>
            <td style={{ padding: '0 16px' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <Tooltip title="View Details">
                  <IconButton onClick={() => openModal('view', user)} size="small" sx={{ background: '#f0f4ff', color: '#3b45cc', borderRadius: '6px', width: 32, height: 32, '&:hover': { background: '#dbeafe' } }}>
                    <Eye size={16} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit User">
                  <IconButton onClick={() => openModal('edit', user)} size="small" sx={{ background: '#f0fdf4', color: '#16a34a', borderRadius: '6px', width: 32, height: 32, '&:hover': { background: '#dcfce7' } }}>
                    <Edit2 size={16} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete User">
                  <IconButton onClick={() => openModal('delete', user)} size="small" sx={{ background: '#fef2f2', color: '#dc2626', borderRadius: '6px', width: 32, height: 32, '&:hover': { background: '#fee2e2' } }}>
                    <Trash2 size={16} />
                  </IconButton>
                </Tooltip>
              </div>
            </td>
          </motion.tr>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <div style={{ padding: '28px 32px', background: '#fff', minHeight: '100%' }}>
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#1a1a2e' }}>Users Management</h1>
            <p style={{ margin: '2px 0 0', fontSize: 14, color: '#6b7280' }}>Manage all registered users and their permissions</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal('add')}
            style={{
              background: '#3b45cc', color: '#fff', border: 'none', borderRadius: 8,
              padding: '10px 20px', fontSize: 14, fontWeight: 600, display: 'flex',
              alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,69,204,0.3)'
            }}
          >
            <Plus size={18} /> Add User
          </motion.button>
        </div>
      </motion.div>

      {/* Toolbar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
          <div style={{ flexGrow: 1, maxWidth: 340, position: 'relative' }}>
            <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={filters.search}
              onChange={handleSearchChange}
              style={{
                width: '100%', height: 42, paddingLeft: 42, borderRadius: 8, border: '1px solid #e5e7eb',
                fontSize: 14, outline: 'none', transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#3b45cc'}
              onBlur={e => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>
          
          <FormControl size="small" sx={{ width: 160 }}>
            <Select 
              value={filters.role} 
              onChange={handleRoleFilter}
              sx={{ borderRadius: '8px', height: 42, fontSize: 14 }}
              IconComponent={ChevronDown}
            >
              <MenuItem value="All Roles">All Roles</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ width: 160 }}>
            <Select 
              value={filters.status} 
              onChange={handleStatusFilter}
              sx={{ borderRadius: '8px', height: 42, fontSize: 14 }}
              IconComponent={ChevronDown}
            >
              <MenuItem value="All Status">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <div style={{ marginLeft: 'auto', fontSize: 14, color: '#6b7280' }}>
            Showing <span style={{ color: '#3b45cc', fontWeight: 700 }}>{users.length}</span> of <span style={{ color: '#3b45cc', fontWeight: 700 }}>{total}</span> users
          </div>
        </div>
      </motion.div>

      {/* Table Card */}
      <div style={{ 
        marginTop: 20, background: '#fff', borderRadius: 12, 
        border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fff', borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600, width: 50 }}>#</th>
              <th style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600, width: 200 }}>User</th>
              <th style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600, width: 240 }}>Email</th>
              <th style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600, width: 100 }}>Role</th>
              <th style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600, width: 110 }}>Status</th>
              <th style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600, width: 150 }}>Created Date</th>
              <th style={{ padding: '14px 16px', fontSize: 13, color: '#6b7280', fontWeight: 600, width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Rows per page:</span>
          <Select 
            size="small" 
            value={limit} 
            onChange={(e) => dispatch(setLimit(e.target.value))}
            sx={{ borderRadius: '6px', height: 34, fontSize: 13 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconButton disabled={page === 1} onClick={() => dispatch(setPage(page - 1))} size="small" sx={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px' }}>
            <ChevronLeft size={16} />
          </IconButton>
          
          <div style={{ display: 'flex', gap: 4 }}>
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const p = i + 1;
              const isActive = page === p;
              return (
                <button 
                  key={p}
                  onClick={() => dispatch(setPage(p))}
                  style={{
                    width: 32, height: 32, borderRadius: 6, fontSize: 13, fontWeight: 600,
                    background: isActive ? '#3b45cc' : '#fff',
                    color: isActive ? '#fff' : '#6b7280',
                    border: isActive ? 'none' : '1px solid #e5e7eb',
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              );
            })}
            {totalPages > 5 && <span style={{ color: '#6b7280', alignSelf: 'flex-end', marginBottom: 4 }}>...</span>}
          </div>

          <IconButton disabled={page === totalPages} onClick={() => dispatch(setPage(page + 1))} size="small" sx={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px' }}>
            <ChevronRight size={16} />
          </IconButton>
        </div>

        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Page {page} of {totalPages}
        </div>
      </div>

      {/* Modals defined elsewhere but could be inlined or components */}
      <AddEditModal open={modalOpen.add || modalOpen.edit} type={modalOpen.edit ? 'edit' : 'add'} close={() => closeModal(modalOpen.edit ? 'edit' : 'add')} />
      <DeleteModal open={modalOpen.delete} close={() => closeModal('delete')} />
      <ViewModal open={modalOpen.view} close={() => closeModal('view')} />
    </div>
  );
};

// ── Modals Code ──────────────────────────────────────────────────────────────

const AddEditModal = ({ open, type, close }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(state => state.users);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedUser?.name || '',
      email: selectedUser?.email || '',
      password: '',
      role: selectedUser?.role || 'User',
      status: selectedUser?.status || 'Active'
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'At least 2 characters').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().when('type', {
         is: () => type === 'add',
         then: (schema) => schema.min(8, 'At least 8 chars').required('Required'),
         otherwise: (schema) => schema.min(8, 'At least 8 chars').optional()
      }),
      role: Yup.string().required('Required'),
      status: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      if (type === 'add') {
        await dispatch(createUser(values));
      } else {
        await dispatch(updateUser({ id: selectedUser.id, data: values }));
      }
      close();
    }
  });

  return (
    <Dialog open={open} onClose={close} PaperProps={{ sx: { borderRadius: '16px', padding: '16px', maxWidth: 480 } }}>
      <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
           {type === 'add' ? 'Add New User' : 'Edit User'}
           <div style={{ fontWeight: 400, fontSize: 13, color: '#6b7280', marginTop: 4 }}>
             {type === 'add' ? 'Fill in the details to create a new user account' : 'Update user information'}
           </div>
        </div>
        <IconButton onClick={close} size="small"><X size={20} /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField 
             fullWidth label="Full Name" size="small" 
             {...formik.getFieldProps('name')} 
             error={formik.touched.name && Boolean(formik.errors.name)} 
             helperText={formik.touched.name && formik.errors.name}
          />
          <TextField 
             fullWidth label="Email Address" size="small" 
             {...formik.getFieldProps('email')} 
             error={formik.touched.email && Boolean(formik.errors.email)} 
             helperText={formik.touched.email && formik.errors.email}
          />
          <TextField 
             fullWidth label={type === 'add' ? "Password" : "Password (leave blank for no change)"} 
             type="password" size="small" 
             {...formik.getFieldProps('password')} 
             error={formik.touched.password && Boolean(formik.errors.password)} 
             helperText={formik.touched.password && formik.errors.password}
          />
          <FormControl fullWidth size="small">
             <InputLabel>Role</InputLabel>
             <Select label="Role" {...formik.getFieldProps('role')}>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
             </Select>
          </FormControl>
          <FormControl fullWidth size="small">
             <InputLabel>Status</InputLabel>
             <Select label="Status" {...formik.getFieldProps('status')}>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
             </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={close} sx={{ color: '#6b7280', fontWeight: 600 }}>Cancel</Button>
        <Button 
          onClick={formik.handleSubmit} 
          variant="contained" 
          sx={{ background: '#3b45cc', borderRadius: '8px', fontWeight: 600, px: 3, '&:hover': { background: '#2d37b0' } }}
        >
          {type === 'add' ? 'Add User' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteModal = ({ open, close }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(state => state.users);

  const handleDelete = async () => {
    await dispatch(deleteUser(selectedUser.id));
    close();
  };

  return (
    <Dialog open={open} onClose={close} PaperProps={{ sx: { borderRadius: '16px', padding: '16px', maxWidth: 400, textAlign: 'center' } }}>
      <DialogContent>
        <div style={{ 
          width: 56, height: 56, background: '#fef2f2', borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#dc2626' 
        }}>
          <Trash2 size={28} />
        </div>
        <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>Delete User</h3>
        <p style={{ margin: 0, fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>?<br/>
          This action cannot be undone.
        </p>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0, display: 'flex', gap: 2 }}>
        <Button onClick={close} fullWidth variant="outlined" sx={{ border: '1.5px solid #e5e7eb', borderRadius: '8px', color: '#6b7280' }}>Cancel</Button>
        <Button onClick={handleDelete} fullWidth variant="contained" sx={{ background: '#dc2626', borderRadius: '8px', fontWeight: 600, '&:hover': { background: '#b91c1c' } }}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

const ViewModal = ({ open, close }) => {
  const { selectedUser } = useSelector(state => state.users);

  if (!selectedUser) return null;

  return (
    <Dialog open={open} onClose={close} PaperProps={{ sx: { borderRadius: '16px', padding: '24px', maxWidth: 420 } }}>
      <DialogTitle sx={{ fontWeight: 700, textAlign: 'center', position: 'relative' }}>
         User Details
         <IconButton onClick={close} size="small" sx={{ position: 'absolute', right: 0, top: 0 }}><X size={20} /></IconButton>
      </DialogTitle>
      <DialogContent>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <Avatar src={`https://i.pravatar.cc/150?u=${selectedUser.email}`} sx={{ width: 64, height: 64, mb: 1 }} />
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>{selectedUser.name}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
               <RoleChip role={selectedUser.role} />
               <StatusChip status={selectedUser.status} />
            </div>
         </div>
         <div style={{ marginTop: 24, padding: '16px', background: '#f8fafc', borderRadius: 12 }}>
            <DetailRow label="User ID" value={`#${selectedUser.id}`} />
            <DetailRow label="Email Address" value={selectedUser.email} />
            <DetailRow label="Role" value={selectedUser.role} />
            <DetailRow label="Status" value={selectedUser.status} />
            <DetailRow label="Created Date" value={selectedUser.createdDate} />
            <DetailRow label="Last Login" value="Just now" />
         </div>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={close} fullWidth variant="outlined" sx={{ border: '1.5px solid #e5e7eb', borderRadius: '8px' }}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const DetailRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5edff', fontSize: 13 }}>
    <span style={{ color: '#6b7280' }}>{label}</span>
    <span style={{ color: '#1a1a2e', fontWeight: 600 }}>{value}</span>
  </div>
);

export default UsersPage;
