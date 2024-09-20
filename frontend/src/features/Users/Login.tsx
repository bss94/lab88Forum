import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {selectLoginError, selectLoginLoading} from './usersSlice.ts';
import {RegisterMutation} from '../../types.ts';
import {login} from './usersThunks.ts';
import {Alert, Avatar, Box, Link, TextField, Typography} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Grid from '@mui/material/Grid2';
import LoginIcon from '@mui/icons-material/Login';
import {LoadingButton} from '@mui/lab';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{m: 1, bgcolor: '#ed6c02'}}>
        <LockOpenIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3, width: 306}}>
        <Grid container direction="column" spacing={2}>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="current-username"
              value={state.username}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              required
              fullWidth
              type="password"
              label="Password"
              name="password"
              autoComplete="current-password"
              value={state.password}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<LoginIcon/>}
          fullWidth
          color="warning"
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
          <span>Sign in</span>
        </LoadingButton>
        <Link component={RouterLink} to="/register" variant="body2">
          Or Sign up
        </Link>
        {error && (<Alert severity="error" sx={{mt: 3, width: '100%'}}>{error.error}</Alert>)}
      </Box>
    </Box>
  );
};

export default Login;