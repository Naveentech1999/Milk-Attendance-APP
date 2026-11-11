import { Platform } from 'react-native';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase Web App client configuration. This is public client config, not a service-account key.
const firebaseConfig = {
  apiKey: 'AIzaSyC1-7wvfIqHiKzcV4WazXRfvcaRCoHPSws',
  authDomain: 'doodhdelight-6897a.firebaseapp.com',
  projectId: 'doodhdelight-6897a',
  storageBucket: 'doodhdelight-6897a.firebasestorage.app',
  messagingSenderId: '531222128751',
  appId: '1:531222128751:web:194ddc8343069d93ecc59a'
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = Platform.OS === 'web' ? getAuth(app) : (() => {
  try { return initializeAuth(app,{persistence:getReactNativePersistence(AsyncStorage)}); }
  catch { return getAuth(app); }
})();
export const db = getFirestore(app);
