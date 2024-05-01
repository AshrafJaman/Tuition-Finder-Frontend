import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyB5YnFr9YPCGKQtrcfb1izMWZqRpqPtn0A',
//   authDomain: 'tuition-fixer-e027b.firebaseapp.com',
//   projectId: 'tuition-fixer-e027b',
//   storageBucket: 'tuition-fixer-e027b.appspot.com',
//   messagingSenderId: '421683990829',
//   appId: '1:421683990829:web:43aff2f8e19194d6c683a4',
//   measurementId: 'G-Y28DC2Z955',
// };

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
