import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { clearCookie } from './../services/cookieManager';
import AuthContext from '../context/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ dialogOpen, setDialogOpen }) {
  const state = React.useContext(AuthContext);
  console.log(typeof dialogOpen);
  console.log(typeof setDialogOpen);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => {
    setDialogOpen(false);
  };
  const logOut = () => {
    setDialogOpen(false);
    enqueueSnackbar('Logged out successfully!', {
      variant: 'success',
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
    state.setActiveUserId(null);
    clearCookie();
    navigate('/');
  };

  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Log out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logOut}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
AlertDialogSlide.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
};
