import * as React from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useSignUpMutation } from '../../api/action-apis/authApi';
import { useSnackbarUtils } from '../../component/Notify';

export default function SignUp() {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarUtils();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
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
                    {...register('firstname', {
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must contain minimum 2 characters',
                      },
                    })}
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    type="text"
                    autoComplete="first-name"
                    autoFocus
                  />
                  {errors.firstname && (
                    <div className="error">{errors.firstname.message}</div>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="textfield"
                    {...register('lastname', {
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must contain minimum 2 characters',
                      },
                    })}
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    type="text"
                    autoComplete="last-name"
                  />
                  {errors.lastname && (
                    <div className="error">{errors.lastname.message}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="textfield"
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
                    autoComplete="given-email"
                    name="email"
                    fullWidth
                    id="email"
                    label="Email"
                  />
                  {errors.email && (
                    <div className="error">{errors.email.message}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="textfield"
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
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                    autoComplete="username"
                  />
                  {errors.username && (
                    <div className="error">{errors.username.message}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="textfield"
                    {...register('password', {
                      required: 'Password is required',
                      validate: (value) => {
                        if (value.length < 8) {
                          return 'Minimum length should be 8';
                        } else {
                          return true;
                        }
                      },
                    })}
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    // onChange={(e) => {
                    //   setPassword((prev) => e.target.value);
                    // }}
                  />
                  {errors.password && (
                    <div className="error">{errors.password.message}</div>
                  )}
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
