import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

var firebaseConfig = {
  apiKey: 'AIzaSyBE_yMVi09qe0Nksxx3B-Cok-1XQhknp3M',
  authDomain: 'salespanel-1bd4a.firebaseapp.com',
  databaseURL: 'https://salespanel-1bd4a.firebaseio.com',
  projectId: 'salespanel-1bd4a',
  storageBucket: 'salespanel-1bd4a.appspot.com',
  messagingSenderId: '717768548602',
  appId: '1:717768548602:web:f6e09b7db3f0c09c682943',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
