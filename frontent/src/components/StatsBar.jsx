import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import GroupsIcon from '@mui/icons-material/Groups';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LoopIcon from '@mui/icons-material/Loop';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const stats = [
  { label: 'Customers Analyzed', value: '10K+', icon: <GroupsIcon />, color: '#6366f1' },
  { label: 'Prediction Accuracy', value: '94%', icon: <TrackChangesIcon />, color: '#10b981' },
  { label: 'Retention Rate', value: '3x', icon: <LoopIcon />, color: '#6366f1' },
  { label: 'Trusted Businesses', value: '500+', icon: <VerifiedUserIcon />, color: '#10b981' },
];

const StatsBar = () => {
  return (
    <Box sx={{ 
      py: 10, 
      bgcolor: 'transparent',
      borderTop: '1px solid var(--border-subtle)',
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    borderRadius: '24px', 
                    background: '#ffffff',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    bgcolor: `${stat.color}10`, 
                    color: stat.color,
                    p: 1.5,
                    borderRadius: '16px'
                  }}>
                    {React.cloneElement(stat.icon, { sx: { fontSize: 32 } })}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800, 
                        color: 'var(--text-primary)', 
                        lineHeight: 1,
                        mb: 0.5,
                        fontSize: '1.75rem'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'var(--text-tertiary)', 
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.65rem'
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsBar;
