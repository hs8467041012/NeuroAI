// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAGrN5YKyUkvPOIuEJlRbmQX7oNCLvp-0",
  authDomain: "neuroai-a5c9d.firebaseapp.com",
  projectId: "neuroai-a5c9d",
  storageBucket: "neuroai-a5c9d.firebasestorage.app",
  messagingSenderId: "1087458877617",
  appId: "1:1087458877617:web:d99ccb24b3c54396c6c290",
  measurementId: "G-503PTCBPM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};