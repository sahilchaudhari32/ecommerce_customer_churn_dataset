import React from 'react';
import { Box, Typography, Button, Container, Grid, Avatar, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <Box sx={{ 
      position: 'relative',
      pt: { xs: 10, md: 15 }, 
      pb: { xs: 12, md: 20 },
      background: 'radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.05) 0%, transparent 100%)',
      overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left Side Content */}
          <Grid item xs={12} md={6}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <Box sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: 1.5, 
                  px: 2, 
                  py: 1, 
                  borderRadius: '50px', 
                  bgcolor: 'rgba(99, 102, 241, 0.08)', 
                  color: 'var(--primary)',
                  mb: 4
                }}>
                  <Box sx={{ bgcolor: 'var(--primary)', borderRadius: '50%', p: 0.5, display: 'flex' }}>
                    <TrendingUpIcon sx={{ fontSize: 14, color: '#fff' }} />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    #1 AI-Powered Customer Churn Analytics
                  </Typography>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontSize: { xs: '3.5rem', md: '4.8rem' }, 
                    fontWeight: 800, 
                    lineHeight: 1.1,
                    color: 'var(--text-primary)',
                    mb: 3,
                    letterSpacing: '-2px'
                  }}
                >
                  Understand Customers.<br />
                  <span style={{ color: 'var(--primary)' }}>Predict Churn.</span><br />
                  Drive Growth.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'var(--text-secondary)', 
                    mb: 4, 
                    fontWeight: 400, 
                    maxWidth: '520px',
                    lineHeight: 1.6,
                    fontSize: '1.2rem'
                  }}
                >
                  Leverage advanced analytics and machine learning to identify at-risk customers, improve retention, and boost your e-commerce revenue.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', mb: 8 }}>
                  <Button 
                    component={RouterLink} 
                    to="/register" 
                    variant="contained" 
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      px: 4, 
                      py: 2.2, 
                      borderRadius: '14px', 
                      fontWeight: 700, 
                      bgcolor: 'var(--primary)', 
                      textTransform: 'none',
                      '&:hover': { bgcolor: 'var(--primary-dark)' }, 
                      boxShadow: '0 20px 40px -10px rgba(99, 102, 241, 0.4)' 
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    endIcon={<PlayCircleOutlinedIcon />}
                    sx={{ 
                      px: 4, 
                      py: 2.2, 
                      borderRadius: '14px', 
                      fontWeight: 700, 
                      textTransform: 'none',
                      color: 'var(--text-primary)', 
                      borderColor: 'var(--border-subtle)', 
                      bgcolor: 'transparent',
                      '&:hover': { borderColor: 'var(--primary)', bgcolor: 'rgba(99, 102, 241, 0.02)' }
                    }}
                  >
                    Explore Dashboard
                  </Button>
                </Box>
              </motion.div>

              {/* Bottom Feature Cards */}
              <motion.div variants={itemVariants}>
                <Grid container spacing={3}>
                  {[
                    { icon: <TrendingUpIcon />, title: 'Real-time Insights', desc: 'Live analytics and customer metrics' },
                    { icon: <SecurityIcon />, title: 'AI Churn Prediction', desc: 'Identify high-risk customers early' },
                    { icon: <PaymentsIcon />, title: 'Increase Revenue', desc: 'Take action and improve retention' }
                  ].map((card, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ color: 'var(--primary)', bgcolor: 'rgba(99, 102, 241, 0.08)', width: 'fit-content', p: 1, borderRadius: '10px', mb: 1 }}>
                          {React.cloneElement(card.icon, { fontSize: 'small' })}
                        </Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--text-primary)' }}>{card.title}</Typography>
                        <Typography variant="caption" sx={{ color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{card.desc}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </motion.div>
          </Grid>

          {/* Right Side Image */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ position: 'relative' }}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    borderRadius: '40px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: '0 60px 120px -20px rgba(0,0,0,0.12)',
                    background: '#ffffff',
                    position: 'relative',
                    zIndex: 1,
                    transform: { md: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)' },
                  }}
                >
                  <img 
                    src="/assets/modern_dashboard.png" 
                    alt="CustomerPulse AI Dashboard" 
                    style={{ 
                      width: '100%', 
                      display: 'block'
                    }} 
                  />
                </Paper>

                {/* Floating elements to mimic mockup depth */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: '-5%', 
                  left: '-10%', 
                  width: '120%', 
                  height: '120%', 
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
                  borderRadius: '50%', 
                  filter: 'blur(60px)', 
                  zIndex: 0 
                }} />
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Trusted By Section */}
        <Box sx={{ mt: { xs: 12, md: 18 }, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'var(--text-tertiary)', mb: 4, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Trusted by data-driven e-commerce teams
          </Typography>
          <Box sx={{ 
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              width: '100px',
              height: '100%',
              zIndex: 2,
              pointerEvents: 'none'
            },
            '&::before': { left: 0, background: 'linear-gradient(to right, var(--bg-main), transparent)' },
            '&::after': { right: 0, background: 'linear-gradient(to left, var(--bg-main), transparent)' }
          }}>
            <Box
              component={motion.div}
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: 'fit-content',
                gap: 4
              }}
            >
            {['Shopify', 'Amazon', 'Stripe', 'Klaviyo', 'SendGrid', 'Shopify', 'Amazon', 'Stripe', 'Klaviyo', 'SendGrid'].map((brand, i) => (
              <Typography 
                key={`${brand}-${i}`} 
                variant="h6" 
                sx={{ 
                  fontWeight: 900, 
                  color: 'var(--text-primary)', 
                  letterSpacing: '-1px',
                  whiteSpace: 'nowrap',
                  mx: { xs: 3, md: 6 }
                }}
              >
                {brand}
              </Typography>
            ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
