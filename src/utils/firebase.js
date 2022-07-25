// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD2NW7ojX6SGdQ7A55SMT1vAtK3oitrTh0",

  authDomain: "databank-c041b.firebaseapp.com",

  projectId: "databank-c041b",

  storageBucket: "databank-c041b.appspot.com",

  messagingSenderId: "453974614217",

  appId: "1:453974614217:web:135bb61e2ac41420e42d18",

  measurementId: "G-MP8DSCYZMK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export default app;
