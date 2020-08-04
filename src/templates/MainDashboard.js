import React, { useContext } from 'react';
import PersonalState from './PersonalState';
import CompanyState from './CompanyState';
import { Grid, Chip, Avatar, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltips from '../components/Tooltips/Tooltips';
import DoneIcon from '@material-ui/icons/Done';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { AppContext } from '../contexts/AppContext';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const MainDashboard = () => {
  const {
    setSuccessDeleteSnackbarOpen,
    successDeleteSnackbarOpen,
    successSnackbarOpen,
    setSuccessSnackbarOpen,
    setCompanyGeneralStateVisible,
    setPersonalStateVisible,
    personalStateVisible,
    companyGeneralStateVisible,
  } = useContext(AppContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackbarOpen(false);
    setSuccessDeleteSnackbarOpen(false);
  };

  const handleVisibility = (component) => () => {
    if (component === 'personal') {
      setPersonalStateVisible(!personalStateVisible);
    } else if (component === 'company-general') {
      setCompanyGeneralStateVisible(!companyGeneralStateVisible);
    }
  };
  return (
    <>
      <Grid container item justify='space-around' xs={11}>
        <Grid container style={{ margin: '20px 40px' }}>
          <Chip
            avatar={
              <Avatar>
                {personalStateVisible ? <DoneIcon /> : <NotInterestedIcon />}
              </Avatar>
            }
            label='Stan indywidualny'
            clickable
            color='primary'
            onClick={handleVisibility('personal')}
            style={{
              opacity: `${personalStateVisible ? 1 : 0.6}`,
              margin: '10px',
            }}
          />
          <Chip
            avatar={
              <Avatar>
                {companyGeneralStateVisible ? (
                  <DoneIcon />
                ) : (
                  <NotInterestedIcon />
                )}
              </Avatar>
            }
            label='Stan firmowy ogólny'
            clickable
            color='primary'
            onClick={handleVisibility('company-general')}
            style={{
              opacity: `${companyGeneralStateVisible ? 1 : 0.6}`,
              margin: '10px',
            }}
          />
        </Grid>
        {personalStateVisible ? <PersonalState /> : null}
        {companyGeneralStateVisible ? <CompanyState /> : null}
      </Grid>
      <Tooltips />
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity='success'>
          Pomyślnie dodano zlecenie!
        </Alert>
      </Snackbar>
      <Snackbar
        open={successDeleteSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity='success'>
          Pomyślnie usunięto zlecenie!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MainDashboard;
