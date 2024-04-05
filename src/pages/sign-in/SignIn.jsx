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
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useSignInMutation } from '../../api/action-apis/authApi';
import AuthContext from '../../context/AuthContext';
import { setCookie } from '../../services/cookieManager';

export default function SignIn() {
  const state = React.useContext(AuthContext);
  const isLoggedIn = state.activeUserId;
  console.log(isLoggedIn);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (dataToSend) => {
    console.log(dataToSend);
    try {
      const response = await signIn(dataToSend);
      if (response?.data) {
        const accessToken = response.data.data.accessToken;
        setCookie(accessToken);
        state.setActiveUserId(accessToken);
        console.log(response.data);
        enqueueSnackbar('You have successfully signed in', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
        navigate('home/feed');
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
      <Container component="main" maxWidth="xs" className="phone-box">
        <CssBaseline />
        <Box
          sx={{
            marginBottom: 8,
            marginTop: 8,
            display: 'flex',
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
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
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <div></div>
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
            <TextField
              className="textfield"
              {...register('password', {
                required: 'Password is required',
              })}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div></div>
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
            {errors.root && <div className="error">{errors.root.message}</div>}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link to="sign-up" variant="body2">
                  {'Do not have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
