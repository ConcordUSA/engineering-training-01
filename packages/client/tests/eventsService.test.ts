import { getFirestore } from "../src/config/firebase";
import EventService from "../src/services/eventService";
import { Event } from "../src/models/event";
import firebase from "firebase-admin";

describe("EventsService", () => {
  const db = getFirestore();
  const service = new EventService(db);
  //   const admin = firebase.initializeApp();
  //   const adminDb = admin.firestore();

  it("should create and retrieve an event", async () => {
    // given
    const event: Event = {
      topic: "topic",
      location: "location",
      date: new Date(),
      category: ["category"],
      price: 12345,
    };

    // when
    const id = await service.createEvent(event);
    const doc = await service.getEvent(id);
    console.log(doc);

    // then
    expect(id).toBeDefined();
    expect(doc.id).toBe(id);
  });
});
