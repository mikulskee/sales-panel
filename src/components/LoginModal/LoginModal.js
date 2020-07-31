import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const LoginModal = () => {
  const [values, setValues] = useState({
    password: '',
    login: '',
    showPassowrd: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Paper style={{ width: '400px', margin: '60px auto 0', padding: '40px' }}>
      <Typography variant={'h6'} gutterBottom style={{ textAlign: 'center' }}>
        Logowanie
      </Typography>
      <form>
        <Grid container spacing={2} direction='column'>
          <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl variant='outlined'>
              <InputLabel htmlFor='outlined'>Login</InputLabel>
              <OutlinedInput
                id='outlined'
                label='Login'
                variant='outlined'
                style={{ margin: '0 auto', width: '240px' }}
              />
            </FormControl>
          </Grid>
          <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Hasło
              </InputLabel>
              <OutlinedInput
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>

          <Button
            variant='contained'
            color='primary'
            style={{ width: '150px', margin: '20px auto 0' }}
          >
            Zaloguj się
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoginModal;
