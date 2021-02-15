import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";
import getConfigs from "./environment";

const firebaseConfig = getConfigs();

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });
