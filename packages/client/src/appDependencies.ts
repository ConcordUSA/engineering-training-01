import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getAuth, getFirestore, getStorage } from "./config/firebase";

export interface AppDependencies {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
}

export const defaultDependencies = {
  auth: getAuth(),
  db: getFirestore(),
  storage: getStorage(),
};

export const AppDependenciesContext = React.createContext<AppDependencies>(
  defaultDependencies
);
