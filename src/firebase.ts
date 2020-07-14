import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

const db = firebase.firestore();
const auth = firebase.auth();
// CREATE USER
const doCreateUserWithEmailAndPassword = (email: any, password: any) =>
    auth.createUserWithEmailAndPassword(email, password);
// SIGN IN USER
const doSignInWithEmailAndPassword = (email: any, password: any) =>
    auth.signInWithEmailAndPassword(email, password);
//SIGN OUT USER
const doSignOut = () => auth.signOut();

export default {
    firebase,
    db,
    auth,
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
    doSignOut,
    // user
};
