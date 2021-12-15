import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAdFd7zoMaQwMTp7ujCpxqbiJkCSCPCzEA",
  authDomain: "messenger-soc.firebaseapp.com",
  databaseURL:
    "https://messenger-soc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "messenger-soc",
  storageBucket: "messenger-soc.appspot.com",
  messagingSenderId: "1003741578362",
  appId: "1:1003741578362:web:20a2f1b5af2a79e8ba67c3",
});
const db = firebaseApp.firestore();

export default db;
