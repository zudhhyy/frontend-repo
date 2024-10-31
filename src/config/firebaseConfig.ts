import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

// IRL, this should be stored in .env file. This is for EBUDDY testing purpose only
const firebaseConfig = {
  apiKey: 'AIzaSyAVyCsMgiCHnu1Bj2xRL9cf8Lo3MVZvfy4',
  authDomain: 'ebuddy-technical-test-1aac5.firebaseapp.com',
  projectId: 'ebuddy-technical-test-1aac5',
  storageBucket: 'ebuddy-technical-test-1aac5.appspot.com',
  messagingSenderId: '827811124476',
  appId: '1:827811124476:web:df16359e8d60e4f41db379',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const functions = getFunctions(app);
