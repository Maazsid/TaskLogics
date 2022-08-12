import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { SyntheticEvent, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/images/logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const pages: Array<{ name: string; path: string }> = [
    { name: 'dashboard', path: '/dashboard' },
    { name: 'about us', path: '/about' },
  ];

  return (
    <AppBar className='navbar' position='static'>
      <Toolbar>
        {/* <IconButton size='large'>
          <MenuIcon color='primary' />
        </IconButton> */}
        <Box className='navbar__logo' component='img' alt='logo' src={logo} />
        <Tabs className='navbar__links-list' centered value={location.pathname}>
          {pages.map((page, index) => (
            <Tab
              className='navbar__link-item'
              component={NavLink}
              label={page.name}
              disableRipple={true}
              key={index}
              to={page.path}
              value={page.path}
            />
          ))}
        </Tabs>

        {/* <Menu
          open={true}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
        >
          <MenuItem>Logout</MenuItem>
        </Menu> */}

        {/* <Button className='navbar__login-btn' variant='outlined'>
          Login
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
