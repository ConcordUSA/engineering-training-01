// Seeds the database with data.
// Store a new `serviceAccount.json` file at the root of this project.
// Whatever environment(project) the service account is referring to will be used in this script when populating
// Get the service account file from firebase > settings/serviceaccounts/adminsdk

import faker from "faker";
import firebase from "firebase-admin";
import chalk from "chalk";
import { existsSync, readFileSync } from "fs";

const args = process.argv.slice(2);
const numberOfEvents = args[0] ?? 20;
console.log(
  chalk`{magentaBright ${numberOfEvents}} {whiteBright Events will be seeded.}`
);

export function getServiceAccount() {
  const serviceAccountPath = `${process.cwd()}/serviceAccount.json`;
  if (existsSync(serviceAccountPath)) {
    const fileBuffer = readFileSync(serviceAccountPath, "utf8");
    return JSON.parse(fileBuffer.toString());
  }
}

const generateEvents = (numberOfEvents) => {
  const serviceAccount = getServiceAccount();
  const { projectId } = serviceAccount;
  const fbConfig = {
    projectId,
    databaseURL: `https://${projectId}.firebaseio.com`,
    credential: firebase.credential.cert(serviceAccount),
  };

  const admin = firebase.initializeApp(fbConfig);
  const db = admin.firestore();
  const docPromises = [];

  for (let step = 0; step < numberOfEvents; step++) {
    const docRef = db.collection("events").doc();
    const isFuture = Math.random() > 0.5;
    const event = {
      id: docRef.id,
      topic: faker.random.word() + " " + faker.random.word(),
      location: faker.address.city(),
      price: faker.random.number(),
      startTime: isFuture ? faker.date.soon() : faker.date.past(),
      endTime: isFuture ? faker.date.future() : faker.date.recent(),
      categories: randomCategories(),
      image: faker.image.imageUrl(400, 400, "business", true),
      description: faker.lorem.paragraph(),
    };
    docPromises.push(docRef.set(event));
  }

  return Promise.all(docPromises);
};

//this function used to help randomly generate category data
const randomCategories = () => {
  const fullList = ["marketing", "leadership", "finance", "technology"];
  const shuffled = fullList.sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, getRandomInt(1, 5));
};
//this function used to help randomly generate category data
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

generateEvents(numberOfEvents).then((resp) => {
  console.log("resp:", resp);
  console.log(chalk`{greenBright Seeding Successful!}`);
});
