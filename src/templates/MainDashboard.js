import React, { useContext, useState, useEffect } from 'react';
import firebase from '../firebase';
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
import { UsersContext } from '../contexts/UsersContext';
import UserState from './UserState';

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
    usersStateVisible,
    changeUsersStateVisible,
  } = useContext(AppContext);

  const [currentTimestamp, setCurrentTimestamp] = useState();
  const [
    dataForCompanyMonthlyState,
    setDataForCompanyMonthlyState,
  ] = useState();
  const [dataForPersonalState, setDataForPersonalState] = useState();
  const [dataForUnactiveClients, setDataForUnactiveClients] = useState();
  const [dataForGeneralState, setDataForGeneralState] = useState();
  const { companyState } = useContext(CompanyStateContext);
  const { personalData } = useContext(PersonalDataContext);
  const { users } = useContext(UsersContext);

  useEffect(() => {
    setCurrentTimestamp(moment(new Date()).format('MMMM YYYY'));
    

  }, []);
  ///adding dlu minus depend on current timestamp
  useEffect(() => {
    if (companyState && currentTimestamp) {

      console.log(companyState.filter(item => item.title === "AAA"))
      const recordsToEdit = companyState.filter((item) => item.dluMinusStart);
    

      recordsToEdit.forEach((recordToEdit) => {
        const formattedDluMinusStart = moment(
          recordToEdit.dluMinusStart
        ).format('YYYY-MM-DD');

     

        const formattedCurrentTimestamp = moment(
          currentTimestamp,
          'MMMM YYYY'
        ).format('YYYY-MM-DD');
   

        if (
          moment(formattedDluMinusStart).isAfter(
            formattedCurrentTimestamp,
            'month'
          )
        ) {
          if (recordToEdit.minus) {
    
            console.log(recordToEdit);
            firebase
              .firestore()
              .collection(`company-state-general`)
              .doc(recordToEdit.id)
              .set(recordToEdit.originalData)
              .catch((err) => console.log(err));
              return
          } else {
            return;
          }
        } else if (
          !moment(formattedDluMinusStart).isAfter(
            formattedCurrentTimestamp,
            'month'
          )
        ) {

          if (!recordToEdit.minus) {

            firebase
              .firestore()
              .collection(`company-state-general`)
              .doc(recordToEdit.id)
              .set({
                title: recordToEdit.title,
                date: moment(recordToEdit.dluMinusStart).format('L'),
                minus: 'DLU',
                plus: null,
                user: recordToEdit.user,
                temporaryCommision: recordToEdit.temporaryCommision,
                firstUser: recordToEdit.firstUser,
                nextUser: recordToEdit.nextUser,
                commisionStartDate: recordToEdit.dluMinusStart,
                commisionChangeDate: recordToEdit.commisionChangeDate,
                rawDate: recordToEdit.rawDate,
                timestamp: moment(recordToEdit.dluMinusStart).format(
                  'MMMM YYYY'
                ),
                id: recordToEdit.id,
                dluMinusStart: recordToEdit.dluMinusStart,
                originalData: recordToEdit,
              })
              .catch((err) => console.log(err));
              return

          } else return;
        }
      });
    }
  }, [currentTimestamp, companyState]);

  useEffect(() => {
    if (companyState && personalData) {

  
      setDataForCompanyMonthlyState(
        companyState.filter((item) => item.timestamp === currentTimestamp)
      );
      
      
      setDataForGeneralState( companyState.filter(item => moment(item.timestamp, "MMMM YYYY")
      .isBefore(moment(currentTimestamp, "MMMM YYYY"), "month") || item.timestamp === currentTimestamp || item.timestamp === ""))

      setDataForUnactiveClients(
        companyState
          .filter((item) => item.minus)
          .filter((item) => item.minus === 'DLU')
          .filter(item => moment(item.timestamp, "MMMM YYYY").isBefore(moment(currentTimestamp, "MMMM YYYY"), "month") || item.timestamp === currentTimestamp || item.timestamp === "")
      );

      if (personalData.admin) {
        setDataForPersonalState(
          companyState
            .filter((item) => item.timestamp === currentTimestamp)
            .filter((item) => item.user === 'Q')
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

  const handleVisibility = (component, initials) => () => {
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
    } else if (component === 'users') {
      if (usersStateVisible[initials] === 'true') {
        changeUsersStateVisible('false', initials);
      } else {
        changeUsersStateVisible('true', initials);
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
          {users ? (
            <>
              {users.map((user) => {
                if (user.initials === personalData.initials) {
                  return null;
                } else {
                  return (
                    <Chip
                      avatar={
                        <Avatar>
                          {usersStateVisible[user.initials] === 'true' ? (
                            <DoneIcon />
                          ) : (
                            <NotInterestedIcon />
                          )}
                        </Avatar>
                      }
                      label={`${user.initials}`}
                      clickable
                      onClick={handleVisibility('users', `${user.initials}`)}
                      style={{
                        opacity: `${
                          usersStateVisible[user.initials] === 'true' ? 1 : 0.6
                        }`,
                        margin: '10px',
                        backgroundColor: `${user.color}`,
                      }}
                    />
                  );
                }
              })}
            </>
          ) : null}
        </Grid>
        <Grid
          container
          item
          direction='column'
          lg={companyGeneralStateVisible === 'true' ? 5 : 10}
          style={{ height: 'fit-content' }}
        >
          {companyMonthlyStateVisible === 'true' ? (
            <CompanyStateMonthly
              currentTimestamp={currentTimestamp}
              data={dataForCompanyMonthlyState}
            />
          ) : null}
          {personalStateVisible === 'true' ? (
            <PersonalState
              currentTimestamp={currentTimestamp}
              data={dataForPersonalState}
            />
          ) : null}
        </Grid>
        {companyGeneralStateVisible === 'true' ? (
          <CompanyState
            dataForUnactiveClients={dataForUnactiveClients}
            currentTimestamp={currentTimestamp}
            data={dataForGeneralState}
          />
        ) : null}
        {users ? (
          <>
            {users.map((user) => {
              if (user.initials === personalData.initials) {
                return null;
              } else {
                return (
                  <>
                    {usersStateVisible[user.initials] === 'true' ? (
                      <UserState
                        key={user.initials}
                        initials={user.initials}
                        name={user.name}
                        currentTimestamp={currentTimestamp}
                      />
                    ) : null}
                  </>
                );
              }
            })}
          </>
        ) : null}
      </Grid>
      <Tooltips
        setCurrentTimestamp={setCurrentTimestamp}
        currentTimestamp={currentTimestamp}
      />
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
