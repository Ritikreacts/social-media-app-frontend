import React from 'react';

import { ArrowBack, Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import EditProfileModel from './../../component/EditProfileModel';
import { useFetchUserQuery } from '../../api/action-apis/userApi';
import DeleteDialog from '../../component/DeleteDialog';

const Profile = () => {
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = useFetchUserQuery();
  const activeUserDetails = !isLoading && data?.data;
  const userData = {
    firstName: activeUserDetails?.firstname,
    lastName: activeUserDetails?.lastname,
    username: activeUserDetails?.username,
    email: activeUserDetails?.email,
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="outlet-box" style={{ padding: 20 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center" gutterBottom>
              User Profile
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="h6" fontWeight="bold">
              First Name
            </Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <Typography variant="h6">{userData.firstName}</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="h6" fontWeight="bold">
              Last Name
            </Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <Typography variant="h6">{userData.lastName}</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="h6" fontWeight="bold">
              Username
            </Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <Typography variant="h6">{userData.username}</Typography>
          </Grid>
          <Grid item xs={6} align="right" className="email">
            <Typography variant="h6" fontWeight="bold">
              Email
            </Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <Typography variant="h6">{userData.email}</Typography>
          </Grid>

          <Grid item xs={12} align="center">
            <Grid>
              <Button
                className="delete-account"
                onClick={() => {
                  setOpenDeleteAlert(true);
                }}
              >
                <DeleteIcon />
                Delete account
              </Button>
            </Grid>
            <Button
              variant="contained"
              color="error"
              startIcon={<ArrowBack />}
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <span style={{ width: 20, display: 'inline-block' }}></span>
            <Button
              variant="contained"
              color="warning"
              startIcon={<Edit />}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <EditProfileModel
        isModalOpenProp={isModalOpen}
        setIsModalOpenProp={setIsModalOpen}
      />
      {openDeleteAlert && (
        <DeleteDialog
          dialogOpen={openDeleteAlert}
          setDialogOpen={setOpenDeleteAlert}
        />
      )}
    </div>
  );
};

export default Profile;
