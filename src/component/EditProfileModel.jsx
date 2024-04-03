import React from 'react';

import { Button, Modal, TextField, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import {
  useFetchUserQuery,
  useUpdateUserMutation,
} from '../api/action-apis/userApi';

const EditProfileModel = ({ isModalOpenProp, setIsModalOpenProp }) => {
  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading } = useFetchUserQuery();
  const activeUserDetails = !isLoading && data?.data;

  const { register, handleSubmit, setValue } = useForm();
  setValue('firstname', activeUserDetails?.firstname);
  setValue('lastname', activeUserDetails?.lastname);
  setValue('username', activeUserDetails?.username);
  setValue('email', activeUserDetails?.email);
  const handleCancelClick = () => {
    setIsModalOpenProp(false);
  };
  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      isPrivate: true,
    };
    try {
      const response = await updateUser(updatedData);
      if (response?.data) {
        setIsModalOpenProp(false);
        enqueueSnackbar('Profile updated successfully!', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(response.error.data.message, {
          variant: 'error',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal open={isModalOpenProp} onClose={handleCancelClick}>
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
            Edit Your Profile
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register('firstname')}
              label="First Name"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('lastname')}
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
            <TextField
              {...register('email')}
              label="email"
              fullWidth
              margin="normal"
            />
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Button
                type="submit"
                variant="contained"
                style={{ marginRight: 10 }}
                className="color-green"
              >
                Update
              </Button>
              <Button
                variant="contained"
                onClick={handleCancelClick}
                className="color-red"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditProfileModel;
EditProfileModel.propTypes = {
  isModalOpenProp: PropTypes.bool.isRequired,
  setIsModalOpenProp: PropTypes.func.isRequired,
};
