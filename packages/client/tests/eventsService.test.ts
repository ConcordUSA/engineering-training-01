import { getFirestore } from "../src/config/firebase";
import EventsService from "../src/services/eventsService";
import { Event, EventFactory } from "../src/models/event";
import firebase from "firebase-admin";

describe("EventsService", () => {
  const db = getFirestore();
  const service = new EventsService(db);

  it("should create and retrieve an event", async () => {
    // given
    const event = EventFactory();

    // when
    const id = await service.createEvent(event);
    const doc = await service.getEvent(id);
    // console.log(doc);

    // then

    expect(id).toBeDefined();
    expect(doc.id).toBe(id);
  });

  it("should return all events", async () => {
    const event1 = EventFactory();
    const event2 = EventFactory();
    event1.categories = ["marketing"]    
    event2.categories = ["it"]    
    event1.startTime = new Date("2022-01-01")
    event2.startTime = new Date("2022-01-02")

    await service.createEvent(event1);
    await service.createEvent(event2);

    const docs = await service.getAllEvents({interestedCategories: ['marketing', 'mems']});

    expect(docs).toBeDefined();
    expect(docs.length).toBeTruthy();
  })
});

