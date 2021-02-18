/** This script is to seed the firebase database emulator (firestore) with data for the ui to use */

import faker from "faker";
import * as firebase from "@firebase/rules-unit-testing";
import chalk from "chalk";

const events = [];
const args = process.argv.slice(2);

const numberOfEvents = args[0] ?? 20;
console.log(
  chalk`{magentaBright ${numberOfEvents}} {whiteBright Events will be seeded.}`
);

const generateEvents = (numberOfEvents) => {
  firebase.useEmulators({ firestore: { host: "localhost", port: 8080 } });

  const projectId = "et-2021a-dev";
  const admin = firebase.initializeAdminApp({ projectId });
  const db = admin.firestore();

  for (let step = 0; step < numberOfEvents; step++) {
    const docRef = db.collection("events").doc();

    const event = {
      id: docRef.id,
      topic: faker.random.word(),
      location: faker.address.city(),
      price: faker.random.number(),
      startTime: faker.date.future(),
      categories: randomCategories(),
      image: faker.image.imageUrl(400, 400, "business", true),
      description: faker.lorem.paragraph(),
    };
    docRef.set(event);
  }
};

//this function used to help randomly generate category data
const randomCategories = () => {
  const fullList = ["marketing", "leadership", "finance", "it"];
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

generateEvents(numberOfEvents);
console.log(chalk`{greenBright Seeding Successful!}`);
