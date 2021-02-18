import { getAuth, getFirestore, getFirebaseApp } from "./firebase";
import axios from "axios";
import getConfigs from "./environment";

const { firebaseConfig } = getConfigs();

Cypress.Commands.add("clearAuth", () => {
  return new Cypress.Promise(async (resolve) => {
    const auth = getAuth();
    await auth.signOut();
    await getFirebaseApp().delete();
    resolve();
  });
});

Cypress.Commands.add("signOut", () => {
  return new Cypress.Promise(async (resolve) => {
    const auth = getAuth();
    console.log("SDFNSDJFn", auth.currentUser);
    await auth.signOut();
    resolve();
  });
});

Cypress.Commands.add("createUser", (email, password) => {
  return new Cypress.Promise(async (resolve) => {
    const auth = getAuth();
    const userCredentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await userCredentials.user.sendEmailVerification();
    const db = getFirestore();
    db.collection("users")
      .doc(userCredentials.user.uid)
      .set({ interestedCategories: [] });
    resolve();
  });
});

Cypress.Commands.add("verifyUserEmail", (email) => {
  return new Cypress.Promise(async (resolve) => {
    const get = await axios.get(
      `http://localhost:9099/emulator/v1/projects/${firebaseConfig.projectId}/oobCodes`
    );
    const { oobCode } = get.data.oobCodes.find((item) => item.email === email);
    const getUrl = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseConfig.apiKey}`;
    await axios.post(getUrl, { oobCode });
    resolve();
  });
});

Cypress.Commands.add("deleteAllUsers", () => {
  return new Cypress.Promise(async (resolve) => {
    // TODO: can't seem to get this working
    const resp = await axios.delete(
      `http://localhost:9099/emulator/v1/projects/${firebaseConfig.projectId}/accounts`
    );
    console.log(resp);
    resolve();
  });
});
