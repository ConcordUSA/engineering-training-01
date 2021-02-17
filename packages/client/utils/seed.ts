/** This script is to seed the firebase database emulator (firestore) with data for the ui to use */

const firebase = require("@firebase/rules-unit-testing");

function seed() {
  firebase.useEmulators({ firestore: { host: "localhost", port: 8080 } });
  const projectId = "et-2021a-dev";
  const admin = firebase.initializeAdminApp({ projectId });
  const db = admin.firestore();

  db.collection("test")
    .add({ myFellas: ["clint", "coop"] })
    .then((e) => {
      console.log("donzo");
    });
}

seed();
