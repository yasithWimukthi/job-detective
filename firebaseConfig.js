// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDidF86lrn8nnDuCMehN9pkztZBue6Msqk",
    authDomain: "job-detective.firebaseapp.com",
    projectId: "job-detective",
    storageBucket: "job-detective.appspot.com",
    messagingSenderId: "925528619046",
    appId: "1:925528619046:web:2be6239ea4e44fc6654ee7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };