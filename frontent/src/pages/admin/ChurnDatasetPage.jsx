import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Typography, Button, IconButton, Slider, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Skeleton, Drawer
} from '@mui/material';
import { 
  Download, RefreshCw, Filter, ChevronUp, ChevronDown, 
  Search, X, Eye, ArrowUpDown, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, FilterX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  fetchChurnData, setFilter, setPage, setLimit, 
  setSort, setSelectedRecord, togglePanel, clearFilters, exportCSV
} from '../../store/churnDataSlice';

// ── SUB-COMPONENTS (DEFINED OUTSIDE TO AVOID LINT ERRORS) ──────────────────────

const CustomChip = ({ label, type }) => {
  const styles = {
    'Month-to-month': { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa' },
    'One year': { bg: '#eff6ff', text: '#3b45cc', border: '#bfdbfe' },
    'Two year': { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
    'Yes': { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
    'No': { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
  };

  const s = styles[label] || styles[type] || { bg: '#f1f5f9', text: '#64748b', border: '#e2e8f0' };

  return (
    <Box sx={{
      display: 'inline-block',
      px: 1.5,
      py: 0.25,
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: label === 'Yes' || label === 'No' ? 600 : 500,
      bgcolor: s.bg,
      color: s.text,
      border: `1px solid ${s.border}`,
      whiteSpace: 'nowrap'
    }}>
      {label}
    </Box>
  );
};

const SortableHeader = ({ label, sortKey, currentSort, currentOrder, onSort }) => {
  const isSorted = currentSort === sortKey;
  return (
    <TableCell 
      onClick={() => onSort(sortKey)}
      sx={{ 
        cursor: 'pointer', 
        fontWeight: 600, 
        fontSize: '12px', 
        color: '#6b7280', 
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        py: 1.5,
        '&:hover': { color: '#3b45cc' }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {label}
        {isSorted ? (
          currentOrder === 'asc' ? <ArrowUp size={14} color="#3b45cc" /> : <ArrowDown size={14} color="#3b45cc" />
        ) : (
          <ArrowUpDown size={14} color="#9ca3af" />
        )}
      </Box>
    </TableCell>
  );
};

const PillButton = ({ label, value, active, onClick, activeStyle }) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={() => onClick(value)}
    style={{
      padding: '5px 16px',
      fontSize: '13px',
      fontWeight: 500,
      borderRadius: '20px',
      cursor: 'pointer',
      transition: '150ms all',
      border: '1px solid',
      ...(active ? {
        backgroundColor: activeStyle?.bg || '#3b45cc',
        color: activeStyle?.text || '#fff',
        borderColor: activeStyle?.border || 'transparent'
      } : {
        backgroundColor: '#fff',
        color: '#6b7280',
        borderColor: '#e5e7eb'
      })
    }}
  >
    {label}
  </motion.button>
);

const FiltersPanel = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.churnData);
  const [expanded, setExpanded] = useState(true);
  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilter({ search: searchValue }));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchValue, dispatch]);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', p: '20px 24px', mt: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: expanded ? 2 : 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Filter size={18} color="#6b7280" />
          <Typography sx={{ color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>Filters</Typography>
        </Box>
        <Box 
          onClick={toggleExpanded} 
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#3b45cc', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}
        >
          {expanded ? 'Hide Filters' : 'Show Filters'}
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Box>
      </Box>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, pt: 1 }}>
              <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#374151', mb: 1 }}>Search by CustomerID or name</Typography>
                <Box sx={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search CustomerID or name..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ width: '100%', height: '40px', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '0 40px 0 12px', fontSize: '13px' }}
                  />
                  <Search size={16} color="#9ca3af" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }} />
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#374151', mb: 1 }}>Churn Status</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <PillButton label="All" value="All" active={filters.churnStatus === 'All'} onClick={(v) => dispatch(setFilter({ churnStatus: v }))} />
                  <PillButton label="Churned" value="Yes" active={filters.churnStatus === 'Yes'} onClick={(v) => dispatch(setFilter({ churnStatus: v }))} activeStyle={{ bg: '#fef2f2', text: '#dc2626', border: '#fecaca' }} />
                  <PillButton label="Retained" value="No" active={filters.churnStatus === 'No'} onClick={(v) => dispatch(setFilter({ churnStatus: v }))} activeStyle={{ bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' }} />
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#374151', mb: 1 }}>Contract Type</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  <PillButton label="All" value="All" active={filters.contractType === 'All'} onClick={(v) => dispatch(setFilter({ contractType: v }))} />
                  {['Month-to-month', 'One year', 'Two year'].map(c => <PillButton key={c} label={c} value={c} active={filters.contractType === c} onClick={(v) => dispatch(setFilter({ contractType: v }))} />)}
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#374151', mb: 1 }}>Internet Service</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  <PillButton label="All" value="All" active={filters.internetService === 'All'} onClick={(v) => dispatch(setFilter({ internetService: v }))} />
                  {['DSL', 'Fiber optic', 'No'].map(i => <PillButton key={i} label={i} value={i} active={filters.internetService === i} onClick={(v) => dispatch(setFilter({ internetService: v }))} />)}
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
              <Box sx={{ width: 280 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>Monthly Charges Range:</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 700 }}>$0 - ${filters.maxCharge}</Typography>
                </Box>
                <Slider min={0} max={120} value={filters.maxCharge} onChange={(_, v) => dispatch(setFilter({ maxCharge: v }))} sx={{ color: '#3b45cc', height: 4, '& .MuiSlider-thumb': { width: 18, height: 18, bgcolor: '#fff', border: '2px solid #3b45cc' }, '& .MuiSlider-rail': { bgcolor: '#e5e7eb', opacity: 1 }}} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -0.5 }}>
                  <Typography sx={{ fontSize: '11px', color: '#9ca3af' }}>$0</Typography>
                  <Typography sx={{ fontSize: '11px', color: '#9ca3af' }}>$120</Typography>
                </Box>
              </Box>
              <Button variant="outlined" startIcon={<FilterX size={16} />} onClick={() => dispatch(clearFilters())} sx={{ textTransform: 'none', borderColor: '#e5e7eb', color: '#6b7280', borderRadius: '8px', px: 2, py: 1, fontSize: '13px', '&:hover': { bgcolor: '#f8fafc', borderColor: '#e5e7eb', color: '#1a1a2e' }}}>Clear All Filters</Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const DetailRow = ({ label, value, color }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.25, borderBottom: '1px solid #f8fafc' }}>
    <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>{label}</Typography>
    <Typography sx={{ fontSize: '13px', color: color || '#1a1a2e', fontWeight: color ? 600 : 500, textAlign: 'right' }}>{value}</Typography>
  </Box>
);

const CustomerDetailsDrawer = () => {
  const dispatch = useDispatch();
  const { selectedRecord, panelOpen } = useSelector(state => state.churnData);
  const closePanel = () => dispatch(togglePanel(false));

  return (
    <Drawer anchor="right" open={panelOpen} onClose={closePanel} variant="persistent" sx={{ width: 320, flexShrink: 0, '& .MuiDrawer-paper': { width: 320, boxSizing: 'border-box', top: 64, height: 'calc(100vh - 64px)', borderLeft: '1px solid #f1f5f9', boxShadow: '-4px 0 16px rgba(0,0,0,0.08)' }}}>
      <Box sx={{ p: '20px 20px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>Customer Details</Typography>
        <IconButton onClick={closePanel} size="small" sx={{ bgcolor: '#f1f5f9', '&:hover': { bgcolor: '#e5e7eb' } }}><X size={16} color="#6b7280" /></IconButton>
      </Box>

      {selectedRecord?.churn === 'Yes' && (
        <Box sx={{ bgcolor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', m: '0 16px 16px', p: '10px 14px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={14} color="#fff" strokeWidth={3} /></Box>
            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#dc2626' }}>Churn Status: Churned</Typography>
          </Box>
          <Typography sx={{ fontSize: '11px', color: '#6b7280' }}>This customer has churned.</Typography>
        </Box>
      )}

      <Box sx={{ px: '20px', overflowY: 'auto', flex: 1 }}>
        <DetailRow label="CustomerID" value={selectedRecord?.customerID} />
        <DetailRow label="Gender" value={selectedRecord?.gender} />
        <DetailRow label="SeniorCitizen" value={selectedRecord?.seniorCitizen} />
        <DetailRow label="Partner" value={selectedRecord?.partner} color={selectedRecord?.partner === 'Yes' ? '#16a34a' : '#dc2626'} />
        <DetailRow label="Dependents" value={selectedRecord?.dependents} color={selectedRecord?.dependents === 'Yes' ? '#16a34a' : '#dc2626'} />
        <DetailRow label="Tenure" value={selectedRecord?.tenure} />
        <DetailRow label="PhoneService" value={selectedRecord?.phoneService} />
        <DetailRow label="MultipleLines" value={selectedRecord?.multipleLines} />
        <DetailRow label="InternetService" value={selectedRecord?.internetService} />
        <DetailRow label="OnlineSecurity" value={selectedRecord?.onlineSecurity} />
        <DetailRow label="OnlineBackup" value={selectedRecord?.onlineBackup} />
        <DetailRow label="DeviceProtection" value={selectedRecord?.deviceProtection} />
        <DetailRow label="TechSupport" value={selectedRecord?.techSupport} />
        <DetailRow label="StreamingTV" value={selectedRecord?.streamingTV} />
        <DetailRow label="StreamingMovies" value={selectedRecord?.streamingMovies} />
        <DetailRow label="Contract" value={selectedRecord?.contract} />
        <DetailRow label="PaperlessBilling" value={selectedRecord?.paperlessBilling} />
        <DetailRow label="PaymentMethod" value={selectedRecord?.paymentMethod} />
        <DetailRow label="MonthlyCharges" value={`$${selectedRecord?.monthlyCharges?.toFixed(2)}`} />
        <DetailRow label="TotalCharges" value={`$${selectedRecord?.totalCharges?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} />
        <DetailRow label="Churn" value={selectedRecord?.churn} color={selectedRecord?.churn === 'Yes' ? '#dc2626' : '#16a34a'} />
      </Box>

      <Box sx={{ p: '16px 20px', borderTop: '1px solid #f8fafc' }}>
        <Button fullWidth onClick={closePanel} variant="outlined" sx={{ height: '40px', borderRadius: '8px', border: '1.5px solid #e5e7eb', color: '#6b7280', textTransform: 'none', fontWeight: 500, '&:hover': { bgcolor: '#f8fafc', borderColor: '#e5e7eb' }}}>Close</Button>
      </Box>
    </Drawer>
  );
};

// ── MAIN PAGE COMPONENT ─────────────────────────────────────────────────────

const ChurnDatasetPage = () => {
  const dispatch = useDispatch();
  const { 
    records, total, page, totalPages, limit, 
    filters, loading, panelOpen, exporting
  } = useSelector(state => state.churnData);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchChurnData());
  }, [dispatch, filters, page, limit]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchChurnData());
    setTimeout(() => setRefreshing(false), 600);
  };

  const openDetails = (record) => {
    dispatch(setSelectedRecord(record));
    dispatch(togglePanel(true));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', position: 'relative', marginRight: panelOpen ? '320px' : 0, transition: 'margin-right 300ms ease' }}>
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '28px 32px 0' }}>
        <Box>
          <Typography sx={{ fontSize: '26px', fontWeight: 700, color: '#1a1a2e' }}>Churn Dataset</Typography>
          <Typography sx={{ fontSize: '14px', color: '#6b7280', mt: 0.5 }}>Complete customer records from MongoDB</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button onClick={() => dispatch(exportCSV())} disabled={exporting} variant="outlined" startIcon={<Download size={16} />} sx={{ textTransform: 'none', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 500, color: '#1a1a2e', '&:hover': { bgcolor: '#f8fafc', borderColor: '#e5e7eb' }}}>{exporting ? 'Exporting...' : 'Export CSV'}</Button>
          <Button onClick={handleRefresh} variant="contained" startIcon={<motion.div animate={refreshing ? { rotate: 360 } : {}} transition={{ duration: 0.6 }}><RefreshCw size={16} /></motion.div>} sx={{ textTransform: 'none', bgcolor: '#3b45cc', color: '#fff', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, '&:hover': { bgcolor: '#2d37b0' }}}>Refresh</Button>
        </Box>
      </motion.div>

      <Box sx={{ px: '32px' }}><FiltersPanel /></Box>

      <Box sx={{ px: '32px', mt: 2, display: 'flex', gap: 0.5, alignItems: 'baseline' }}>
        <Typography sx={{ fontSize: '14px', color: '#6b7280' }}>Total Records:</Typography>
        <Typography sx={{ fontSize: '14px', color: '#3b45cc', fontWeight: 700 }}>{total.toLocaleString()}</Typography>
      </Box>

      <Box sx={{ px: '32px', mt: 1.5, mb: 4 }}>
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <Table stickyHeader sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>CustomerID</TableCell>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Gender</TableCell>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>SeniorCitizen</TableCell>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Partner</TableCell>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Dependents</TableCell>
                <SortableHeader label="Tenure" sortKey="tenure" currentSort={filters.sortBy} currentOrder={filters.sortOrder} onSort={(k) => dispatch(setSort(k))} />
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>PhoneService</TableCell>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>InternetService</TableCell>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Contract</TableCell>
                <SortableHeader label="MonthlyCharges" sortKey="monthlyCharges" currentSort={filters.sortBy} currentOrder={filters.sortOrder} onSort={(k) => dispatch(setSort(k))} />
                <SortableHeader label="TotalCharges" sortKey="totalCharges" currentSort={filters.sortBy} currentOrder={filters.sortOrder} onSort={(k) => dispatch(setSort(k))} />
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Churn</TableCell>
                <TableCell sx={{ fontSize: '12px', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', py: 1.5 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      <TableCell colSpan={13} sx={{ p: 0 }}><Skeleton variant="rectangular" height={48} width="100%" sx={{ animationDelay: `${i * 0.05}s` }} /></TableCell>
                    </TableRow>
                  ))
                ) : records.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={13}>
                      <Box sx={{ py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                         <Box sx={{ width: 140, height: 140, opacity: 0.5 }}><FilterX size={140} color="#cbd5e1" strokeWidth={1} /></Box>
                         <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#1a1a2e' }}>No records found</Typography>
                         <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>Try adjusting your filters to see results.</Typography>
                         <Button variant="outlined" onClick={() => dispatch(clearFilters())} sx={{ textTransform: 'none', color: '#3b45cc' }}>Clear All Filters</Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  records.map((row, idx) => (
                    <motion.tr key={row.customerID} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: idx * 0.04 }} style={{ borderBottom: '1px solid #f8fafc', height: '48px', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <TableCell sx={{ py: 1, fontSize: '13px', color: '#1a1a2e' }}>{row.customerID}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', color: '#1a1a2e' }}>{row.gender}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', color: '#1a1a2e' }}>{row.seniorCitizen}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', fontWeight: 500, color: row.partner === 'Yes' ? '#16a34a' : '#dc2626' }}>{row.partner}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', fontWeight: 500, color: row.dependents === 'Yes' ? '#16a34a' : '#dc2626' }}>{row.dependents}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', color: '#1a1a2e' }}>{row.tenure}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', fontWeight: 500, color: row.phoneService === 'Yes' ? '#16a34a' : '#dc2626' }}>{row.phoneService}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', color: '#1a1a2e' }}>{row.internetService}</TableCell>
                      <TableCell sx={{ py: 1 }}><CustomChip label={row.contract} /></TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', fontWeight: 500, color: '#1a1a2e', textAlign: 'right' }}>${row.monthlyCharges?.toFixed(2)}</TableCell>
                      <TableCell sx={{ py: 1, fontSize: '13px', fontWeight: 500, color: '#1a1a2e', textAlign: 'right' }}>${row.totalCharges?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                      <TableCell sx={{ py: 1 }}><CustomChip label={row.churn} /></TableCell>
                      <TableCell sx={{ py: 1 }}>
                        <IconButton onClick={() => openDetails(row)} size="small" sx={{ bgcolor: '#f0f4ff', color: '#3b45cc', borderRadius: '6px', width: 32, height: 32, transition: 'all 0.15s ease', '&:hover': { bgcolor: '#dbeafe', transform: 'scale(1.05)' } }}><Eye size={16} /></IconButton>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '14px 16px', borderTop: '1px solid #f1f5f9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>Rows per page:</Typography>
             <select value={limit} onChange={(e) => dispatch(setLimit(Number(e.target.value)))} style={{ height: '32px', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '13px', color: '#1a1a2e', outline: 'none' }}>{[10, 25, 50, 100].map(v => <option key={v} value={v}>{v}</option>)}</select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton disabled={page === 1} onClick={() => dispatch(setPage(page - 1))} size="small" sx={{ border: '1px solid #e5e7eb', borderRadius: '6px', width: 32, height: 32 }}><ChevronLeft size={16} /></IconButton>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
               {[1, 2, 3, 4, 5].map(p => (
                 <Box key={p} onClick={() => dispatch(setPage(p))} sx={{ width: 32, height: 32, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: '150ms all', bgcolor: page === p ? '#3b45cc' : '#fff', color: page === p ? '#fff' : '#6b7280', border: page === p ? 'none' : '1px solid #e5e7eb', '&:hover': page !== p ? { bgcolor: '#f0f4ff', borderColor: '#3b45cc', color: '#3b45cc' } : {} }}>{p}</Box>
               ))}
               {totalPages > 5 && <Typography sx={{ color: '#6b7280', alignSelf: 'flex-end', pb: 0.5 }}>...</Typography>}
            </Box>
            <IconButton disabled={page === totalPages} onClick={() => dispatch(setPage(page + 1))} size="small" sx={{ border: '1px solid #e5e7eb', borderRadius: '6px', width: 32, height: 32 }}><ChevronRight size={16} /></IconButton>
          </Box>
          <Typography sx={{ fontSize: '13px', color: '#6b7280' }}>{((page - 1) * limit) + 1}–{Math.min(page * limit, total)} of {total.toLocaleString()} records</Typography>
        </Box>
      </Box>
      <CustomerDetailsDrawer />
    </Box>
  );
};

export default ChurnDatasetPage;
