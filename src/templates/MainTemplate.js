import React, { useEffect, useContext } from 'react';
import firebase from '../firebase';
import { withRouter } from 'react-router-dom';

import LoginModal from '../components/LoginModal/LoginModal';
import { UserContext } from '../contexts/UserContext';
import { CircularProgress, Grid } from '@material-ui/core';

const MainTemplate = (props) => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      props.history.push('/company-state');
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
          .doc(`${user.uid}-name`)
          .onSnapshot((snapshot) => {
            setUser(snapshot.data());
          });

        loginModal.style.display = 'none';
      } else {
        loginModal.style.display = 'block';
        loader.style.display = 'none';
        setUser(user);
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
