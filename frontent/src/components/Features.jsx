import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  { 
    title: 'Real-time Analytics', 
    desc: 'Monitor customer behavior as it happens with live data streaming.', 
    icon: <AnalyticsIcon />,
  },
  { 
    title: 'Churn Prediction', 
    desc: 'Advanced machine learning models predict customers likely to leave.', 
    icon: <AutoGraphIcon />,
  },
  { 
    title: 'User Management', 
    desc: 'Manage, segment, and organize customer data efficiently.', 
    icon: <GroupsIcon />,
  },
  { 
    title: 'Role-Based Access', 
    desc: 'Granular permissions and team management controls.', 
    icon: <AdminPanelSettingsIcon />,
  },
  { 
    title: 'Data Visualization', 
    desc: 'Transform complex churn data into beautiful charts and insights.', 
    icon: <BarChartIcon />,
  },
  { 
    title: 'Secure JWT Authentication', 
    desc: 'Industry-standard authentication and security protection.', 
    icon: <SecurityIcon />,
  },
];

const Features = () => {
  return (
    <Box id="features" sx={{ 
      py: { xs: 12, md: 16 }, 
      bgcolor: '#fff', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #ffffff 0%, #f7f6ff 100%)'
    }}>
      
      {/* Background Decorations */}
      {/* Curved Line Decorations */}
      <Box sx={{ 
        position: 'absolute', 
        top: '-10%', 
        left: '-5%', 
        width: '30%', 
        height: '40%', 
        borderBottomRightRadius: '100%', 
        border: '1px solid rgba(99, 102, 241, 0.05)', 
        zIndex: 0 
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: '-10%', 
        right: '-5%', 
        width: '30%', 
        height: '40%', 
        borderTopLeftRadius: '100%', 
        border: '1px solid rgba(139, 92, 246, 0.05)', 
        zIndex: 0 
      }} />

      {/* Floating Blur Shapes */}
      <Box sx={{ 
        position: 'absolute', 
        top: '15%', 
        right: '10%', 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.04) 0%, transparent 70%)', 
        borderRadius: '50%', 
        filter: 'blur(80px)', 
        zIndex: 0,
        animation: 'pulse 10s infinite alternate'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: '20%', 
        left: '5%', 
        width: '600px', 
        height: '600px', 
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)', 
        borderRadius: '50%', 
        filter: 'blur(100px)', 
        zIndex: 0 
      }} />

      {/* Dot Grid Patterns */}
      <Box sx={{ 
        position: 'absolute', 
        top: '20%', 
        left: { xs: 0, md: '5%' }, 
        width: '120px', 
        height: '200px', 
        backgroundImage: 'radial-gradient(#e2e8f0 2px, transparent 2px)', 
        backgroundSize: '24px 24px',
        zIndex: 0 
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: '30%', 
        right: { xs: 0, md: '5%' }, 
        width: '120px', 
        height: '160px', 
        backgroundImage: 'radial-gradient(#e2e8f0 2px, transparent 2px)', 
        backgroundSize: '24px 24px',
        zIndex: 0 
      }} />



      <Container sx={{ maxWidth: '1400px !important' }}>
        {/* Header Section */}
        <Stack spacing={3} sx={{ textAlign: 'center', mb: { xs: 12, md: 18 }, position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: '#6366F1', 
                  fontWeight: 900, 
                  letterSpacing: '3.5px', 
                  bgcolor: 'rgba(99, 102, 241, 0.07)', 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: '100px',
                  fontSize: '0.7rem',
                  border: '1px solid rgba(99, 102, 241, 0.12)',
                  display: 'inline-block'
                }}
              >
                POWERFUL ENGINE
              </Typography>
            </Box>
            
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 900, 
                color: '#0f172a', 
                mb: 4, 
                fontSize: { xs: '2.8rem', md: '4rem' },
                letterSpacing: '-3px', 
                lineHeight: 1,
                maxWidth: '900px',
                mx: 'auto'
              }}
            >
              Engineered for <span style={{ 
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Retention</span>
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b', 
                maxWidth: '720px', 
                mx: 'auto', 
                fontSize: '1.4rem', 
                lineHeight: 1.6,
                fontWeight: 400
              }}
            >
              Our platform combines behavioral psychology and cutting-edge AI to keep customers engaged, reduce churn, and maximize lifetime value.
            </Typography>
          </motion.div>
        </Stack>

        {/* Feature Cards Grid */}
        <Grid container spacing={5} sx={{ position: 'relative', zIndex: 1 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', 
                    borderRadius: '24px', 
                    border: '1px solid rgba(226, 232, 240, 0.6)',
                    background: '#ffffff',
                    transition: 'all 0.5s cubic-bezier(0.24, 1, 0.32, 1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-15px)',
                      boxShadow: '0 50px 100px -20px rgba(99, 102, 241, 0.15)',
                      borderColor: 'rgba(99, 102, 241, 0.3)',
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(-5deg)',
                        bgcolor: '#6366F1',
                        color: '#fff'
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 5, md: 6 } }}>
                    <Box 
                      className="feature-icon"
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: 64, 
                        height: 64, 
                        borderRadius: '18px', 
                        bgcolor: 'rgba(99, 102, 241, 0.08)', 
                        color: '#6366F1', 
                        mb: 5,
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {React.cloneElement(feature.icon, { sx: { fontSize: 32 } })}
                    </Box>

                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: '#0f172a', fontSize: '1.6rem', letterSpacing: '-0.5px' }}>
                      {feature.title}
                    </Typography>

                    <Box sx={{ width: '40px', height: '4px', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', mb: 4, borderRadius: '2px' }} />

                    <Typography variant="body2" sx={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.8, fontWeight: 500 }}>
                      {feature.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Custom Animations in CSS */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.1); opacity: 0.8; }
          }
        `}
      </style>
    </Box>
  );
};

export default Features;
