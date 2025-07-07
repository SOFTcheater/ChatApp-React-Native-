import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
  browserSessionPersistence,
} from 'firebase/auth';

// Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJKY9miJ4GWFPwcaJmnseglZYEDL8e52U",
  authDomain: "rr-app1-6b653.firebaseapp.com",
  databaseURL: "https://rr-app1-6b653-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rr-app1-6b653",
  storageBucket: "rr-app1-6b653.firebasestorage.app",
  messagingSenderId: "105703391435",
  appId: "1:105703391435:web:6ba32984602f753a831b4e",
  measurementId: "G-JFNBN3WG9G"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getFirestore(app);
export const rdb = getDatabase(app);

const persistence =
  Platform.OS === 'web'
    ? browserSessionPersistence
    : getReactNativePersistence(ReactNativeAsyncStorage);

export const auth = initializeAuth(app, { persistence });

