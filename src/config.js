
/**
 * NOTE: This file is ignored from git tracking. In a CI environment, it is
 * generated using build/create-config.js by calling npm run create-config (or
 * using firebase-ci if deploying to Firebase hosting). This is done so that
 * environment specific settings can be applied.
 */
const util = require('util'); //print an object

export const env = 'development'

export const firebase = {
  apiKey: "AIzaSyC0Q4CWa1j3K4N4u054mqYji8LrpUvih70",
  authDomain: "second-opinion-3e5f3.firebaseapp.com",
  databaseURL: "https://second-opinion-3e5f3.firebaseio.com",
  projectId: "second-opinion-3e5f3",
  storageBucket: "second-opinion-3e5f3.appspot.com",
  messagingSenderId: "260108697311"
};

export const reduxFirebase = {
  // collection within Firestore to which user profiles are written (would be
  // RTDB without useFirestoreForProfile)
  userProfile: 'users',
  // Profile data is located within Firestore instead of Real Time Database
  useFirestoreForProfile: true,
  oneListenerPerPath: true,
   // place metadata about storage uploads into Firestore
   // when calling uploadFiles or uploadFile with a third argument
  useFirestoreForStorageMeta: true,
  enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  attachAuthIsReady: false 
}

export default { env, firebase, reduxFirebase }