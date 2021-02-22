import EventsService from "../src/services/eventsService";
import { IEvent, EventFactory } from "../src/models/event";
import firebaseApp from "firebase/app";
import * as firebase from "@firebase/rules-unit-testing";
import faker from "faker";

describe("EventsService", () => {
  const options = { projectId: "et-2021a-dev" }; // this is the firebase project id that the local emulators are using / acting as
  firebase.useEmulators({
    firestore: {
      host: "localhost",
      port: 8080,
    },
  });
  const adminApp = firebase.initializeAdminApp(options);
  const testApp = firebase.initializeTestApp(options);
  const db = testApp.firestore() as firebaseApp.firestore.Firestore;
  const service = new EventsService(db);

  afterEach(async () => {
    // cleanup
    await firebase.clearFirestoreData(options);
  });

  it("should create an event", async () => {
    // given
    const event: IEvent = EventFactory();

    // when
    const id = await service.createEvent(event);

    // then
    const resp = await db.collection("events").doc(id).get();
    expect(id).toBeDefined();
    expect(resp.exists).toBe(true);
    expect(resp.data().id).toBe(id);
  });

  it("should delete an event", async () => {
    // given
    const event = EventFactory();
    const { id } = db.collection("events").doc();
    db.collection("events").doc(id).set(event);

    // when
    await service.deleteEvent(id);

    // then
    const resp = await db.collection("events").doc(id).get();
    expect(resp.exists).toBe(false);
  });

  it("should get all events", async () => {
    // given
    const events = [
      { categories: ["marketing"], startTime: faker.date.future() },
      { categories: ["marketing"], startTime: faker.date.future() },
      { categories: ["it"], startTime: faker.date.future() },
    ];
    await Promise.all(
      events.map((event) => db.collection("events").add(event))
    );

    // when
    const docs = await service.getAllEvents();

    // then
    const marketing = docs.find((item) => item.category === "marketing");
    expect(marketing).toBeDefined();
    expect(marketing.items.length).toBe(2);
    const it = docs.find((item) => item.category === "it");
    expect(it).toBeDefined();
    expect(it.items.length).toBe(1);
  });

  it("should get all events and sort according to interestedCategories", async () => {
    // given
    const events = [
      { categories: ["marketing"], startTime: faker.date.future() },
      { categories: ["marketing"], startTime: faker.date.future() },
      { categories: ["it"], startTime: faker.date.future() },
    ];
    await Promise.all(
      events.map((event) => db.collection("events").add(event))
    );

    // when
    const docs = await service.getAllEvents(["leadership", "it"]);

    // then
    const marketing = docs.find((item) => item.category === "marketing");
    expect(marketing).toBeDefined();
    expect(marketing.items.length).toBe(2);
    const it = docs.find((item) => item.category === "it");
    expect(it).toBeDefined();
    expect(it.items.length).toBe(1);
  });
});
