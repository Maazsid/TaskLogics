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
import classes from './Navbar.module.scss';

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
    <AppBar className={classes.navbar} position="static">
      <Toolbar>
        {isMobile && (
          <IconButton onClick={toggleDrawerHandler}>
            <MenuIcon />
          </IconButton>
        )}

        <Drawer open={isDrawerOpen} onClose={toggleDrawerHandler} anchor="left">
          <List className={classes.drawer}>
            {pages.map((page, index) => (
              <Link to={page.path} key={index}>
                <ListItemButton
                  className={classes.drawerListItem}
                  selected={location.pathname === page.path}
                  onClick={toggleDrawerHandler}
                >
                  {page.name}
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Drawer>

        <div className={classes.logoWrapper}>
          <Link className={classes.logoLink} to="dashboard">
            <Box className={classes.logo} component="img" alt="logo" src={logo} />
          </Link>
        </div>

        {!isMobile && (
          <Tabs className={classes.linkList} centered value={location.pathname}>
            {pages.map((page, index) => (
              <Tab
                className={classes.linkItem}
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
            <IconButton className={classes.menuIconBtn} onClick={openMenuHandler}>
              <AccountCircle className={classes.menuIcon} />
            </IconButton>
            <Menu
              className={classes.menu}
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
          <Button className={classes.loginBtn} variant="outlined">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
