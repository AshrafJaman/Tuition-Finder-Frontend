import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBKbVVSby6kjPYR1MT5jMQIHIV8ztwP95U",
  authDomain: "tuition-finder-12f9b.firebaseapp.com",
  projectId: "tuition-finder-12f9b",
  storageBucket: "tuition-finder-12f9b.appspot.com",
  messagingSenderId: "30981357638",
  appId: "1:30981357638:web:4097ff23eb041d448f0a47"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage, firebaseApp };
