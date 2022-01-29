import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBCqmW5qjY-jiN6ndfm2xMf6T_0RSEKhmM",
    authDomain: "redux-form-58d2c.firebaseapp.com",
    databaseURL: "https://redux-form-58d2c-default-rtdb.firebaseio.com",
    projectId: "redux-form-58d2c",
    storageBucket: "redux-form-58d2c.appspot.com",
    messagingSenderId: "596072286215",
    appId: "1:596072286215:web:785cab54ab998ac1ea82a2"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default auth;