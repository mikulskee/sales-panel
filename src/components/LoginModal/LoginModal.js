import React, { useState } from 'react';
import firebase from '../../firebase';
import { withRouter } from 'react-router-dom';
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
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const LoginModal = (props) => {
  const [values, setValues] = useState({
    password: '',
    login: '',
    showPassowrd: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(values.login, values.password)
      .then((cred) => {
        setIsLoading(false);
        console.log(props.history.push('/'));
      })
      .catch((err) => {
        setIsLoading(false);
        setValues({ ...values, password: '', login: '' });
        if (
          err.message ===
          'The password is invalid or the user does not have a password.'
        ) {
          setError('Podane hasło jest nieprawidłowe.');
          setIsLoading(false);
        }
        if (
          err.message ===
          'There is no user record corresponding to this identifier. The user may have been deleted.'
        ) {
          setError('Brak użytkownika o podanym mailu w bazie danych.');
          setIsLoading(false);
          setValues({ ...values, password: '', login: '' });
        }
      });
    setValues({ ...values, password: '', login: '' });
  };
  return (
    <Paper
      style={{
        width: '400px',
        height: '320px',
        margin: '60px auto 0',
        padding: '40px',
      }}
    >
      <Typography variant={'h6'} gutterBottom style={{ textAlign: 'center' }}>
        Logowanie
      </Typography>
      <Grid container justify='center' alignItems='center'>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <form
            onSubmit={() => {
              console.log(values);
            }}
          >
            <Grid container spacing={2} direction='column'>
              <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl variant='outlined'>
                  <InputLabel htmlFor='outlined'>Login</InputLabel>
                  <OutlinedInput
                    id='outlined'
                    label='Login'
                    variant='outlined'
                    value={values.login}
                    onChange={handleChange('login')}
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
                    onChange={handleChange('password')}
                    value={values.password}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
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
                onClick={handleLogin}
              >
                Zaloguj się
              </Button>
              {error ? <Alert severity='error'>{error}</Alert> : null}
            </Grid>
          </form>
        )}
      </Grid>
    </Paper>
  );
};

export default withRouter(LoginModal);
