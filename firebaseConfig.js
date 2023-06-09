import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
import {initializeFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAWYADeFyGdCCS0qfAks8jic3p3ywjfGk",
  authDomain: "job-detective-b2b72.firebaseapp.com",
  projectId: "job-detective-b2b72",
  storageBucket: "job-detective-b2b72.appspot.com",
  messagingSenderId: "957411712695",
  appId: "1:957411712695:web:c6809a095a4f4e042fb732",
  measurementId: "G-Q8XHP6CF9C",
};



// Initialize Firebase
// if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
  const auth = getAuth(app);

 const storage = getStorage(app)
// }

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth ,firebase,storage, db };
