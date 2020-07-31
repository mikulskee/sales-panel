import React, { useEffect, useContext } from 'react';
import firebase from '../firebase';

import LoginModal from '../components/LoginModal/LoginModal';
import { UserContext } from '../contexts/UserContext';

const MainTemplate = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection(`users`)
          .doc(`${user.uid}-name`)
          .onSnapshot((snapshot) => {
            setUser(snapshot.data());
          });
      } else {
        setUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <LoginModal />;
};

export default MainTemplate;
