import React from 'react';

import { ArrowBack, Edit } from '@mui/icons-material';
import {
  Typography,
  Grid,
  Paper,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';

const Profile = () => {
  // Static user data
  const userData = {
    firstName: 'Rititk',
    lastName: 'Singh',
    username: 'user123456',
  };

  // State to manage modal open/close
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // React Hook Form
  const { register, handleSubmit, setValue } = useForm();

  // Function to handle edit icon click
  const handleEditClick = () => {
    setIsModalOpen(true);
    // Set default values for form fields
    setValue('firstName', userData.firstName);
    setValue('lastName', userData.lastName);
    setValue('username', userData.username);
  };

  // Function to handle cancel button click
  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log(data); // Do something with the submitted data
    setIsModalOpen(false);
  };

  return (
    <div className="feed-box" style={{ padding: 20 }}>
      <Paper elevation={3} style={{ padding: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              User Profile
            </Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="h6" fontWeight="bold">
              First Name:
            </Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <Typography variant="h6">{userData.firstName}</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="h6" fontWeight="bold">
              Last Name:
            </Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <Typography variant="h6">{userData.lastName}</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="h6" fontWeight="bold">
              Username:
            </Typography>
          </Grid>
          <Grid item xs={6} align="left">
            <Typography variant="h6">{userData.username}</Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Button variant="contained" color="error" startIcon={<ArrowBack />}>
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

      {/* Edit Modal */}
      <Modal open={isModalOpen} onClose={handleCancelClick}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Edit User
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('firstName')}
              label="First Name"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('lastName')}
              label="Last Name"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('username')}
              label="Username"
              fullWidth
              margin="normal"
            />
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginRight: 10 }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
