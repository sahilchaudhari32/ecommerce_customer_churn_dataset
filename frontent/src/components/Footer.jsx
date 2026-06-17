import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'var(--surface-950)', color: '#f8fafc', pt: 10, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <img src="https://cdn.corenexis.com/f/pPeXd8lUyZu.png" alt="CustomerPulse AI Logo" style={{ height: '40px', marginRight: '10px' }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#ffffff' }}>
                CustomerPulse AI
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3, maxWidth: '300px', lineHeight: 1.8 }}>
              Empowering e-commerce businesses with cutting-edge AI analytics to predict customer behavior and maximize long-term growth.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton sx={{ color: '#94a3b8', '&:hover': { color: '#ffffff' } }}>
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, mb: 3 }}>
              Product
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['Features', 'Analytics', 'Pricing', 'API docs'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1.5 }}>
                  <Link href="#" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'var(--primary)' } }}>
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, mb: 3 }}>
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1.5 }}>
                  <Link href="#" sx={{ color: '#94a3b8', textDecoration: 'none', '&:hover': { color: 'var(--primary)' } }}>
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700, mb: 3 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a3b8', mb: 2 }}>
              Subscribe to our newsletter for the latest churn prevention strategies.
            </Typography>
            {/* Simple subscribe mock */}
            <Box sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.05)', p: 0.5, borderRadius: '8px' }}>
              <input 
                type="email" 
                placeholder="Email address" 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  padding: '8px 12px', 
                  color: 'white', 
                  outline: 'none',
                  flexGrow: 1
                }} 
              />
              <button style={{ 
                background: 'var(--primary)', 
                border: 'none', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontWeight: 600
              }}>
                Join
              </button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ bordercolor: 'rgba(255,255,255,0.05)', mb: 4 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            © {new Date().getFullYear()} CustomerPulse AI. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" sx={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="#" sx={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'none' }}>Terms of Service</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
