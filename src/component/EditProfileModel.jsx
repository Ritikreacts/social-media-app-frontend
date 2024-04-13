import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useSnackbarUtils } from './Notify';
import {
  useFetchUserQuery,
  useUpdateUserMutation,
} from '../api/action-apis/userApi';

const EditProfileModel = ({ isModalOpenProp, setIsModalOpenProp }) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarUtils();

  const [updateUser] = useUpdateUserMutation();
  const { data, isLoading } = useFetchUserQuery();
  const activeUserDetails = !isLoading && data?.data;

  const schema = Yup.object().shape({
    firstname: Yup.string()
      .required('First name is required')
      .min(2, 'First name must contain minimum 2 characters'),
    lastname: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must contain minimum 2 characters'),
    username: Yup.string()
      .required('Username is required')
      .matches(
        /^([a-zA-Z0-9 _]+)$/,
        'Username should not contain special characters'
      )
      .min(6, 'Username must contain 6 or more characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
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
    try {
      const response = await updateUser(data);
      if (response?.data) {
        showSuccessSnackbar('Profile updated successfully!');
        setIsModalOpenProp(false);
      } else {
        showErrorSnackbar(response.error.data.message);
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
              {...register('firstname')}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstname}
              helperText={errors.firstname?.message}
            />
            <TextField
              {...register('lastname')}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
            <TextField
              {...register('username')}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              {...register('email')}
              label="Email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <Button
                type="submit"
                variant="contained"
                className="color-green"
                style={{ marginRight: 10 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating....' : 'Update'}
              </Button>
              <Button
                variant="contained"
                className="color-red"
                onClick={handleCancelClick}
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
