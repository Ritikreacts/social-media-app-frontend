import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

import { useSnackbarUtils } from './Notify';
import { useDeleteUserMutation } from '../api/action-apis/userApi';
import AuthContext from '../context/auth/AuthContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ dialogOpen, setDialogOpen }) {
  const { showSuccessSnackbar } = useSnackbarUtils();

  const [deleteUser] = useDeleteUserMutation();
  const state = React.useContext(AuthContext);

  const handleClose = () => {
    setDialogOpen(false);
  };
  const deleteUserAccount = () => {
    setDialogOpen(false);
    deleteUser();
    showSuccessSnackbar('Account deleted successfully!');
    state.handleLogOut();
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
        <DialogTitle>Dangerous operation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to{' '}
            <span className="error">delete your account?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteUserAccount}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
DeleteDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
};
