// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2hOAOIWUrnQ58aByxxI2Nr18FEt7Lygs', //  apiKey: import.meta.env.REACT_FIREBASE_API_KEY,
  authDomain: 'reas-estate.firebaseapp.com',
  projectId: 'reas-estate',
  storageBucket: 'reas-estate.appspot.com',
  messagingSenderId: '59535310580',
  appId: '1:59535310580:web:b688cfd85236252114a8a1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
