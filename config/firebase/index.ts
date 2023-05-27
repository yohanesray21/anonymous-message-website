// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore, serverTimestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCVzs-4T9VtJNuN-xMDy7Xuz7gM91AAyNE',
  authDomain: 'anonymous-message-websit-ed37d.firebaseapp.com',
  projectId: 'anonymous-message-websit-ed37d',
  storageBucket: 'anonymous-message-websit-ed37d.appspot.com',
  messagingSenderId: '507187986862',
  appId: '1:507187986862:web:285a7afd2eef5e69c7883f',
  measurementId: 'G-QB0QE2GQJM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
export const usersDBRef = collection(db, 'users');
