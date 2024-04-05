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
  const { data, isLoading, isSuccess } = useFetchUserQuery();
  const activeUserDetails = !isLoading && data?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: activeUserDetails?.firstname,
      lastname: activeUserDetails?.lastname,
      username: activeUserDetails?.username,
      email: activeUserDetails?.email,
    },
  });

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
        enqueueSnackbar('Profile updated successfully!', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });

        if (isSuccess) {
          setIsModalOpenProp(false);
        }
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
          className="edit-model"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '500',
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
              className="textfield"
              {...register('firstname', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must contain minimum 2 characters',
                },
              })}
              label="First Name"
              fullWidth
              margin="normal"
              defaultValue={activeUserDetails?.firstname}
            />
            {errors.firstname && (
              <div className="error">{errors.firstname.message}</div>
            )}
            <TextField
              {...register('lastname', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must contain minimum 2 characters',
                },
              })}
              label="Last Name"
              fullWidth
              margin="normal"
              defaultValue={activeUserDetails?.lastname}
            />
            {errors.lastname && (
              <div className="error">{errors.lastname.message}</div>
            )}
            <TextField
              {...register('username', {
                required: 'Username is required',
                validate: (value) => {
                  if (!value.match(/^([a-zA-Z0-9 _]+)$/)) {
                    return 'Username should not contain special characters';
                  } else if (value.length < 6) {
                    return 'Username must contain 6 or more characters';
                  } else {
                    return true;
                  }
                },
              })}
              label="Username"
              fullWidth
              margin="normal"
              defaultValue={activeUserDetails?.username}
            />
            {errors.username && (
              <div className="error">{errors.username.message}</div>
            )}
            <TextField
              {...register('email', {
                required: 'Email is required',
                validate: (value) => {
                  if (!value.match(/^\S+@\S+\.\S+$/)) {
                    return 'Email is invalid';
                  } else {
                    return true;
                  }
                },
              })}
              label="email"
              fullWidth
              margin="normal"
              defaultValue={activeUserDetails?.email}
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Button
                type="submit"
                variant="contained"
                style={{ marginRight: 10 }}
                className="color-green"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating....' : 'Update'}
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
