// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut  } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyAdu8dtKcnbhbUUA3e_9kNvbtkbc_4eJOU',

  authDomain: 'carestack-7ffec.firebaseapp.com',

  projectId: 'carestack-7ffec',

  storageBucket: 'carestack-7ffec.appspot.com',

  messagingSenderId: '120953604661',

  appId: '1:120953604661:web:2ea64261625dcabe8d7f7c',

  measurementId: 'G-XY0BWTFXW8',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    return { user, token };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return;
  } catch (error) {
    console.log(error);
  }
}