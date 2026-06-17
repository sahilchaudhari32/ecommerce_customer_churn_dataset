import React from 'react';
import { Box, Container, Grid, Typography, Avatar, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Connect Data',
    desc: 'Sync your e-commerce platform or upload your customer dataset securely.',
    icon: <CloudUploadIcon sx={{ fontSize: 32 }} />,
    color: 'var(--primary)',
    step: '01'
  },
  {
    title: 'Analyze Patterns',
    desc: 'Our AI engines crunch numbers to find hidden churn triggers and segments.',
    icon: <PsychologyIcon sx={{ fontSize: 32 }} />,
    color: 'var(--secondary)',
    step: '02'
  },
  {
    title: 'Take Action',
    desc: 'Implement automated retention campaigns or reach out to high-risk users.',
    icon: <RocketLaunchIcon sx={{ fontSize: 32 }} />,
    color: 'var(--accent)',
    step: '03'
  }
];

const HowItWorks = () => {
  return (
    <Box id="about" sx={{ py: { xs: 10, md: 20 }, bgcolor: 'rgba(248, 250, 252, 0.5)', backdropFilter: 'blur(8px)', borderTop: '1px solid var(--border-subtle)' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 15 } }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Typography variant="h2" sx={{ fontWeight: 900, color: '#0f172a', mb: 3, letterSpacing: '-1.5px' }}>
              Simple 3-Step <span style={{ color: 'var(--primary)' }}>Progress</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--text-tertiary)', maxWidth: '550px', mx: 'auto', fontSize: '1.1rem' }}>
              We've streamlined the journey from data to retention. Here's how you scale with CustomerPulse AI.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={8} sx={{ position: 'relative' }}>
          {/* Enhanced Connector Line for Desktop */}
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              position: 'absolute', 
              top: '40px', 
              left: '10%', 
              right: '10%', 
              height: '2px', 
              background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%)', 
              zIndex: 0 
            }} 
          />

          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 4 }}>
                    <Avatar 
                      sx={{ 
                        width: 84, 
                        height: 84, 
                        bgcolor: '#ffffff', 
                        color: step.color, 
                        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                        border: `2px solid ${step.color}`,
                        transition: 'all 0.3s ease',
                        '&:hover': { transform: 'scale(1.1) rotate(5deg)', bgcolor: step.color, color: '#fff' }
                      }}
                    >
                      {step.icon}
                    </Avatar>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: -10, 
                        right: -10, 
                        width: 32, 
                        height: 32, 
                        bgcolor: '#0f172a', 
                        color: '#fff', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        border: '3px solid #f8fafc'
                      }}
                    >
                      {step.step}
                    </Box>
                  </Box>
                  
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text-tertiary)', maxWidth: '300px', lineHeight: 1.7 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
