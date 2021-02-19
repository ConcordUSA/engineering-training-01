import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getAuth, getFirestore } from "./config/firebase";

export interface AppDependencies {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
}

export const defaultDependencies = {
  auth: getAuth(),
  db: getFirestore(),
};

export const AppDependenciesContext = React.createContext<AppDependencies>(
  defaultDependencies
);
