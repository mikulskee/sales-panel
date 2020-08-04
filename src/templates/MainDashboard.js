import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import PersonalState from './PersonalState';
import CompanyState from './CompanyState';
import { Grid, Chip, Avatar, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltips from '../components/Tooltips/Tooltips';
import DoneIcon from '@material-ui/icons/Done';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { AppContext } from '../contexts/AppContext';
import CompanyStateMonthly from './CompanyStateMonthly';
import { CompanyStateContext } from '../contexts/CompanyStateContext';

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
    companyMonthlyStateVisible,
    setCompanyMonthlyStateVisible,
  } = useContext(AppContext);

  const [currentTimestamp, setCurrentTimestamp] = useState();
  const { companyState } = useContext(CompanyStateContext);
  useEffect(() => {
    setCurrentTimestamp(moment(new Date()).format('MMMM YYYY'));
  }, []);

  useEffect(() => {
    if (companyState) {
      console.log(
        companyState.filter((item) => item.timestamp === currentTimestamp)
      );
    }
  });

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
    } else {
      setCompanyMonthlyStateVisible(!companyMonthlyStateVisible);
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
                {companyMonthlyStateVisible ? (
                  <DoneIcon />
                ) : (
                  <NotInterestedIcon />
                )}
              </Avatar>
            }
            label='Stan firmowy miesięczny'
            clickable
            color='primary'
            onClick={handleVisibility('company-monthly')}
            style={{
              opacity: `${companyMonthlyStateVisible ? 1 : 0.6}`,
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
        <Grid
          container
          item
          direction='column'
          lg={companyGeneralStateVisible ? 5 : 10}
          style={{ height: 'fit-content' }}
        >
          {personalStateVisible ? (
            <PersonalState currentTimestamp={currentTimestamp} />
          ) : null}
          {companyMonthlyStateVisible ? (
            <CompanyStateMonthly currentTimestamp={currentTimestamp} />
          ) : null}
        </Grid>
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
