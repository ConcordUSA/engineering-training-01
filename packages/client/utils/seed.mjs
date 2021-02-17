/** This script is to seed the firebase database emulator (firestore) with data for the ui to use */

import faker from "faker";
import * as firebase from "@firebase/rules-unit-testing";

const events = [];
const generateEvents = (numberOfEvents) => {
  for (let step = 0; step < numberOfEvents; step++) {
    const event = {
      topic: faker.random.word(),
      location: faker.address.city(),
      price: faker.random.number(),
      startTime: faker.date.future(),
      categories: randomCategories(),
      image: faker.image.imageUrl(400, 400, "business", true),
      description: faker.lorem.paragraph(),
    };
    events.push(event);
  }
  return events;
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

function seed() {
  firebase.useEmulators({ firestore: { host: "localhost", port: 8080 } });

  const projectId = "et-2021a-dev";
  const admin = firebase.initializeAdminApp({ projectId });
  const db = admin.firestore();

  generateEvents(20);
  let counter = 20;
  const doc = db.collection("events").doc();

  events.map((event) => {
    const id = doc.id;
    doc.set({ ...event, id });
  });
}

seed();
