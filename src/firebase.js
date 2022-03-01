// Import the functions you need from the SDKs you need

import firebase from 'firebase/app';
import  'firebase/auth';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKeMVK8_pJGMYGb4Xd7Cw-e9iNHuyz0rU",
  authDomain: "react-slack-clone-71e66.firebaseapp.com",
  projectId: "react-slack-clone-71e66",
  storageBucket: "react-slack-clone-71e66.appspot.com",
  messagingSenderId: "523379369826",
  appId: "1:523379369826:web:1b457c7f9ae95585842e3b",
  measurementId: "G-ZH258SVGB9",
  databaseUrl: "https://react-slack-clone-71e66-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const firebase =    getAuth(app);
export default firebase;