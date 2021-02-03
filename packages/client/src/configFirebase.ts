/**
 * Configure firebase based on environment.
 */

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import getConfigs from "./config";

const { useEmulators } = getConfigs();

const getFirebaseApp = () => {
  const { firebaseConfig } = getConfigs();
  const alreadyInitialized = firebase.apps.length > 0;

  return alreadyInitialized
    ? firebase.apps[0]
    : firebase.initializeApp(firebaseConfig);
};

export const getAuth = () => {
  const app = getFirebaseApp();

  // use emulators (local environments)
  // if (useEmulators) app.auth().useEmulator("http://localhost:9099/");

  return app.auth();
};

// export const getFirestore = () => {
//   const app = getFirebaseApp();

//   // use emulators (local environments)
//   if (useEmulators) app.firestore().useEmulator("localhost", 8080);

//   return app.firestore();
// };

export default getFirebaseApp;
