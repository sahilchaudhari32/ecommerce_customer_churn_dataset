import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Box, Container, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { title: 'Features', href: '#features' },
    { title: 'About', href: '#about' },
    { title: 'Pricing', href: '#pricing' },
  ];

  const drawer = (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://cdn.corenexis.com/f/pPeXd8lUyZu.png" alt="Logo" style={{ height: '35px', marginRight: '10px' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--primary)' }}>Pulse AI</Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List sx={{ flexGrow: 1 }}>
        {navLinks.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton component="a" href={item.href} onClick={handleDrawerToggle} sx={{ py: 2, borderRadius: '8px' }}>
              <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: 600, color: 'var(--text-secondary)' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 'auto', pt: 4 }}>
        <Button component={RouterLink} to="/login" variant="outlined" fullWidth size="large" sx={{ py: 1.5, borderRadius: '12px' }}>Login</Button>
        <Button component={RouterLink} to="/register" variant="contained" fullWidth size="large" sx={{ py: 1.5, borderRadius: '12px', fontWeight: 700, bgcolor: 'var(--primary)', '&:hover': { bgcolor: 'var(--primary-dark)' } }}>Get Started</Button>
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-subtle)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: { xs: 70, md: 90 }, justifyContent: 'space-between' }}>
          <Box component={motion.div} whileHover={{ scale: 1.02 }} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img src="https://cdn.corenexis.com/f/pPeXd8lUyZu.png" alt="Logo" style={{ height: '42px', marginRight: '14px' }} />
            <Typography variant="h5" component="div" sx={{ color: '#0f172a', fontWeight: 900, letterSpacing: '-1px', display: { xs: 'none', sm: 'block' } }}>
              Customer<span style={{ color: 'var(--primary)' }}>Pulse</span>
            </Typography>
            {/* Small version for mobile */}
            <Typography variant="h6" component="div" sx={{ color: '#0f172a', fontWeight: 900, display: { xs: 'block', sm: 'none' } }}>
              Pulse<span style={{ color: 'var(--primary)' }}>AI</span>
            </Typography>
          </Box>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 5 }}>
            {navLinks.map((item) => (
              <Typography 
                key={item.title} 
                component="a" 
                href={item.href} 
                sx={{ 
                  color: '#475569', 
                  textDecoration: 'none', 
                  fontWeight: 600, 
                  fontSize: '0.9rem',
                  transition: 'color 0.2s',
                  '&:hover': { color: 'var(--primary)' } 
                }}
              >
                {item.title}
              </Typography>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button component={RouterLink} to="/login" variant="text" sx={{ fontWeight: 700, color: '#475569' }}>
              Login
            </Button>
            <Button component={RouterLink} to="/register" variant="contained" sx={{ px: 3, py: 1, borderRadius: '10px', fontWeight: 700, bgcolor: 'var(--primary)', '&:hover': { bgcolor: 'var(--primary-dark)' }, boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.3)' }}>
              Get Started
            </Button>
          </Box>

          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: '#0f172a', ml: 2 }}
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ sx: { width: { xs: '100%', sm: 320 }, borderLeft: 'none' } }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
