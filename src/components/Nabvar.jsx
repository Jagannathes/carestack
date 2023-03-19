import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { signIn } from '@/utils/firebase';
import {AuthContext} from '@/context/userContext';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { logout } from '@/utils/firebase';

const NavDrawer = ({ open, setOpen }) => {
  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      ></Box>
    </Drawer>
  );
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function NavBar({ colorMode }) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { user, loading } = useContext(AuthContext);
  console.log(user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{router.push(`/user/${user.uid}`)}}>Profile</MenuItem>
      <MenuItem onClick={
        ()=>{
          logout().then(() => {
          
          handleMenuClose();
})}
}>Log out</MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Hermes Social Network
          </Typography>
          {!user && !loading && <Button color="inherit" onClick={signIn}>Login</Button>}
          {user && !loading && (
               
            <IconButton  sx={{ p: 0 }} onClick={handleProfileMenuOpen}>
              <Avatar alt={user.name} src={user.photo} />
            </IconButton>
            
          )}
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Offset />
      {renderMenu}
      <NavDrawer open={open} setOpen={setOpen} />
    </Box>
  );
}
