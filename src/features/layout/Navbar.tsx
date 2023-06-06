import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemButton,
  useMediaQuery,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '@assets/images/logo.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const pages: Array<{ name: string; path: string }> = [
    { name: 'dashboard', path: '/dashboard' },
    { name: 'about us', path: '/about' },
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();
  const isMobile = useMediaQuery('(max-width :575px )');
  const isAuthorized = false;

  const toggleDrawerHandler = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const openMenuHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenuHandler = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className="navbar" position="static">
      <Toolbar>
        {isMobile && (
          <IconButton onClick={toggleDrawerHandler}>
            <MenuIcon />
          </IconButton>
        )}

        <Drawer open={isDrawerOpen} onClose={toggleDrawerHandler} anchor="left">
          <List className="navbar__drawer">
            {pages.map((page, index) => (
              <Link to={page.path} key={index}>
                <ListItemButton
                  className="navbar__drawer-list-item"
                  selected={location.pathname === page.path}
                  onClick={toggleDrawerHandler}
                >
                  {page.name}
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Drawer>

        <div className="navbar__logo-wrapper">
          <Link className="navbar__logo-link" to="dashboard">
            <Box className="navbar__logo" component="img" alt="logo" src={logo} />
          </Link>
        </div>

        {!isMobile && (
          <Tabs className="navbar__links-list" centered value={location.pathname}>
            {pages.map((page, index) => (
              <Tab
                className="navbar__link-item"
                component={NavLink}
                label={page.name}
                disableRipple={true}
                key={index}
                to={page.path}
                value={page.path}
              />
            ))}
          </Tabs>
        )}

        {isAuthorized && (
          <>
            <IconButton className="navbar__menu-icon-btn" onClick={openMenuHandler}>
              <AccountCircle className="navbar__menu-icon" />
            </IconButton>
            <Menu
              className="navbar__menu"
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={closeMenuHandler}
            >
              <MenuItem>Logout</MenuItem>
            </Menu>
          </>
        )}
        {!isAuthorized && (
          <Button className="navbar__login-btn" variant="outlined">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
