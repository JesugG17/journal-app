import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAubUlOoO7tRoXWJze3aIO80v2XqTt9ttY',
  authDomain: 'react-cursos-1cb5a.firebaseapp.com',
  projectId: 'react-cursos-1cb5a',
  storageBucket: 'react-cursos-1cb5a.appspot.com',
  messagingSenderId: '740374862491',
  appId: '1:740374862491:web:6327409eda4c611786843e'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseCloudStore = getFirestore(FirebaseApp);