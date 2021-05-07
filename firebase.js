import firebase from "firebase";

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaKqvSwEr9oCORBJ9pEoXqcHXsT7SEnEc",
  authDomain: "signal-clone-c2e6f.firebaseapp.com",
  projectId: "signal-clone-c2e6f",
  storageBucket: "signal-clone-c2e6f.appspot.com",
  messagingSenderId: "467392844768",
  appId: "1:467392844768:web:7ad4271684f34d1708d185",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
