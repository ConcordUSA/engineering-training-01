import { getFirestore } from "../src/config/firebase";
import EventsService from "../src/services/eventsService";
import { Event, EventFactory } from "../src/models/event";
import firebase from "firebase-admin";

describe("EventsService", () => {
  const db = getFirestore();
  const service = new EventsService(db);
  //   const admin = firebase.initializeApp();
  //   const adminDb = admin.firestore();

  it("should create and retrieve an event", async () => {
    // given
    const event = EventFactory();

    // when
    const id = await service.createEvent(event);
    const doc = await service.getEvent(id);
    console.log(doc);

    // then
    expect(id).toBeDefined();
    expect(doc.id).toBe(id);
  });
});
