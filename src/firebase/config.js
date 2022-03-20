import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC3KbZ-05h6DRllZbfXvjIbiaRHO9_JndM',
  authDomain: 'collab-f3cc5.firebaseapp.com',
  projectId: 'collab-f3cc5',
  storageBucket: 'collab-f3cc5.appspot.com',
  messagingSenderId: '534517306982',
  appId: '1:534517306982:web:8be85390537c4fc3f07fa7',
};

// step 1: initialize firebase
// firebase.initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

// step 2: initialize individual services
const projectFirestore = getFirestore();
const projectAuth = getAuth();
const projectStorage = getStorage();

// step 3: create a firebase timestamp object

export { projectFirestore, projectAuth, projectStorage };
