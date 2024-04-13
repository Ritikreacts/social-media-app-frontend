import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
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
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { useSignInMutation } from '../../api/action-apis/authApi';
import { useSnackbarUtils } from '../../component/Notify';
import AuthContext from '../../context/auth/AuthContext';

const schema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function SignIn() {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarUtils();

  const state = React.useContext(AuthContext);

  const [signIn, { isLoading }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (dataToSend) => {
    try {
      const response = await signIn(dataToSend);
      if (response?.data) {
        const accessToken = response.data.data.accessToken;
        state.handleLogIn(accessToken);
        showSuccessSnackbar('You have successfully signed in');
      } else {
        showErrorSnackbar(response.error.data.message);
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
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              className="textfield"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
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
