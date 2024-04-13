import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import InstagramIcon from '@mui/icons-material/Instagram';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useSignUpMutation } from '../../api/action-apis/authApi';
import { useSnackbarUtils } from '../../component/Notify';

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must contain minimum 2 characters'),
  lastname: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must contain minimum 2 characters'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  username: yup
    .string()
    .required('Username is required')
    .matches(
      /^([a-zA-Z0-9 _]+)$/,
      'Username should not contain special characters'
    )
    .min(6, 'Username must contain 6 or more characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Minimum length should be 8'),
});

export default function SignUp() {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarUtils();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const dataToSend = {
      ...data,
      isPrivate: true,
    };
    try {
      const response = await signUp(dataToSend);
      if (response?.data) {
        showSuccessSnackbar(response.data.message);
        navigate('sign-in');
      } else {
        showErrorSnackbar(response.error.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            className="registration-form"
            sx={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              className="lock-icon"
              sx={{ m: 1, bgcolor: 'secondary.main' }}
            >
              <InstagramIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    className="textfield"
                    {...register('firstname')}
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    type="text"
                    autoComplete="first-name"
                    autoFocus
                    error={!!errors.firstname}
                  />
                  <FormHelperText error={!!errors.firstname}>
                    {errors.firstname?.message}
                  </FormHelperText>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="textfield"
                    {...register('lastname')}
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    type="text"
                    autoComplete="last-name"
                    error={!!errors.lastname}
                  />
                  <FormHelperText error={!!errors.lastname}>
                    {errors.lastname?.message}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="textfield"
                    {...register('email')}
                    autoComplete="given-email"
                    name="email"
                    fullWidth
                    id="email"
                    label="Email"
                    error={!!errors.email}
                  />
                  <FormHelperText error={!!errors.email}>
                    {errors.email?.message}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="textfield"
                    {...register('username')}
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    autoComplete="username"
                    error={!!errors.username}
                  />
                  <FormHelperText error={!!errors.username}>
                    {errors.username?.message}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="textfield"
                    {...register('password')}
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    error={!!errors.password}
                  />
                  <FormHelperText error={!!errors.password}>
                    {errors.password?.message}
                  </FormHelperText>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isLoading ? 'Loading...' : 'Sign Up'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
