import React, { useEffect, useContext } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';

import LoginModal from '../components/Modals/LoginModal/LoginModal';
import { CompanyStateContext } from '../contexts/CompanyStateContext';
import { UsersContext } from '../contexts/UsersContext';
import { PersonalDataContext } from '../contexts/PersonalDataContext';
import { CircularProgress, Grid } from '@material-ui/core';

const MainTemplate = (props) => {
  const { setPersonalData } = useContext(PersonalDataContext);
  const { users, setUsers } = useContext(UsersContext);
  const { setCompanyState } = useContext(CompanyStateContext);

  useEffect(() => {
    if (users) {
      props.history.push('/dashboard');
    }
  });

  useEffect(() => {
    const loginModal = document.querySelector('.loginRef');
    const loader = document.querySelector('.loader');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection(`users`)
          .onSnapshot((snapshot) => {
            setUsers(snapshot.docs.map((doc) => doc.data()));
          });

        firebase
          .firestore()
          .collection(`personal-data`)
          .doc(`${user.uid}`)
          .onSnapshot((snapshot) => setPersonalData(snapshot.data()));

        firebase
          .firestore()
          .collection(`company-state-general`)
          .onSnapshot((snapshot) => {
            setCompanyState(snapshot.docs.map((doc) => doc.data()));
          });

        loginModal.style.display = 'none';
      } else {
        loginModal.style.display = 'block';
        loader.style.display = 'none';
        setPersonalData(user);
        setUsers(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ marginTop: '40px' }}
      >
        <Grid item>
          <CircularProgress
            className='loader'
            style={{ width: '80px', height: '80px' }}
          />
        </Grid>
        <Grid className='loginRef' item style={{ display: 'none' }}>
          <LoginModal />
        </Grid>
      </Grid>
    </>
  );
};

export default withRouter(MainTemplate);
