import * as React from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';

// import { useFetchAllUsersQuery } from '../../api/action-apis/userApi';
// import { useFetchUserQuery } from '../../api/action-apis/userApi';
import Profile from './../pages/home/Profile';
import CreatePost from './CreatePost';
import Dialog from './LogoutDialog';

const drawerWidth = 240;

function MainNavbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [openUserProfile, setOpenUserProfile] = React.useState(false);
  const [openCreatePost, setOpenCreatePost] = React.useState(false);
  const [openLogoutAlert, setOpenLogoutAlert] = React.useState(false);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div className="side-bar">
      <List className="action-options">
        <ListItem onClick={() => setOpenCreatePost((prev) => !prev)}>
          <AddAPhotoIcon />
          Create Post
        </ListItem>
        <Divider />
        <ListItem onClick={() => navigate('profile')}>
          <AccountBoxIcon /> Profile
        </ListItem>
        <Divider />
        <ListItem onClick={() => setOpenLogoutAlert((prev) => !prev)}>
          <LogoutIcon />
          <Divider />
          Log out
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar className="navbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              className="Postgram"
            >
              <Link to="/home/feed">𝙋𝙤𝙨𝙩𝙜𝙧𝙖𝙢</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              'display': { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              'display': { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {openUserProfile && (
          <Profile
            openProfile={openUserProfile}
            setOpenProfile={setOpenUserProfile}
          />
        )}
        {openCreatePost && (
          <CreatePost
            openProfile={openCreatePost}
            setOpenProfile={setOpenCreatePost}
          />
        )}
        {openLogoutAlert && (
          <Dialog
            dialogOpen={openLogoutAlert}
            setDialogOpen={setOpenLogoutAlert}
          />
        )}
      </Box>
    </>
  );
}

export default MainNavbar;
