const firebase = require('firebase');
require('dotenv').config();
const FB_KEY = process.env.FIREBASE_KEY;

const firebaseConfig = {
    // apiKey: FB_KEY,
    apiKey: "AIzaSyAWwGBIf5RvDcHoFXOY_zTEZm2EWDzKLwI",
    authDomain: "umailtest-7ca4f.firebaseapp.com",
    projectId: "umailtest-7ca4f",
    storageBucket: "umailtest-7ca4f.appspot.com",
    messagingSenderId: "494847512876",
    appId: "1:494847512876:web:4b497338e0b7cdf1941c89",
    measurementId: "G-R16XMN025S"
  };
const fstore = firebase.initializeApp(firebaseConfig).firestore();
module.exports =fstore;