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
import { PersonalDataContext } from '../contexts/PersonalDataContext';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const MainDashboard = () => {
  const {
    setSuccessDeleteSnackbarOpen,
    successDeleteSnackbarOpen,
    successSnackbarOpen,
    setSuccessSnackbarOpen,
    changeCompanyGeneralStateVisible,
    changePersonalStateVisible,
    personalStateVisible,
    companyGeneralStateVisible,
    companyMonthlyStateVisible,
    changeCompanyMonthlyStateVisible,
  } = useContext(AppContext);

  const [currentTimestamp, setCurrentTimestamp] = useState();
  const [
    dataForCompanyMonthlyState,
    setDataForCompanyMonthlyState,
  ] = useState();
  const [dataForPersonalState, setDataForPersonalState] = useState();
  const { companyState } = useContext(CompanyStateContext);
  const { personalData } = useContext(PersonalDataContext);
  useEffect(() => {
    setCurrentTimestamp(moment(new Date()).format('MMMM YYYY'));
  }, []);

  useEffect(() => {
    if (companyState) {
      setDataForCompanyMonthlyState(
        companyState.filter((item) => item.timestamp === currentTimestamp)
      );

      if (personalData.admin) {
        setDataForPersonalState(
          companyState
            .filter((item) => item.timestamp === currentTimestamp)
            .filter((item) => item.user === 'QA')
        );
      } else {
        setDataForPersonalState(
          companyState
            .filter((item) => item.timestamp === currentTimestamp)
            .filter((item) => item.user === personalData.initials)
        );
      }
    }
  }, [
    setDataForCompanyMonthlyState,
    companyState,
    currentTimestamp,
    personalData,
  ]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessSnackbarOpen(false);
    setSuccessDeleteSnackbarOpen(false);
  };

  const handleVisibility = (component) => () => {
    if (component === 'personal') {
      if (personalStateVisible === 'true') {
        changePersonalStateVisible('false');
      } else {
        changePersonalStateVisible('true');
      }
    } else if (component === 'company-general') {
      if (companyGeneralStateVisible === 'true') {
        changeCompanyGeneralStateVisible('false');
      } else {
        changeCompanyGeneralStateVisible('true');
      }
    } else {
      if (companyMonthlyStateVisible === 'true') {
        changeCompanyMonthlyStateVisible('false');
      } else {
        changeCompanyMonthlyStateVisible('true');
      }
    }
  };
  return (
    <>
      <Grid container item justify='space-around' xs={11}>
        <Grid container style={{ margin: '20px 40px' }}>
          <Chip
            avatar={
              <Avatar>
                {personalStateVisible === 'true' ? (
                  <DoneIcon />
                ) : (
                  <NotInterestedIcon />
                )}
              </Avatar>
            }
            label='Stan indywidualny'
            clickable
            color='primary'
            onClick={handleVisibility('personal')}
            style={{
              opacity: `${personalStateVisible === 'true' ? 1 : 0.6}`,
              margin: '10px',
            }}
          />
          <Chip
            avatar={
              <Avatar>
                {companyMonthlyStateVisible === 'true' ? (
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
              opacity: `${companyMonthlyStateVisible === 'true' ? 1 : 0.6}`,
              margin: '10px',
            }}
          />
          <Chip
            avatar={
              <Avatar>
                {companyGeneralStateVisible === 'true' ? (
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
              opacity: `${companyGeneralStateVisible === 'true' ? 1 : 0.6}`,
              margin: '10px',
            }}
          />
        </Grid>
        <Grid
          container
          item
          direction='column'
          lg={companyGeneralStateVisible === 'true' ? 5 : 10}
          style={{ height: 'fit-content' }}
        >
          {personalStateVisible === 'true' ? (
            <PersonalState
              currentTimestamp={currentTimestamp}
              data={dataForPersonalState}
            />
          ) : null}
          {companyMonthlyStateVisible === 'true' ? (
            <CompanyStateMonthly
              currentTimestamp={currentTimestamp}
              data={dataForCompanyMonthlyState}
            />
          ) : null}
        </Grid>
        {companyGeneralStateVisible === 'true' ? <CompanyState /> : null}
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
