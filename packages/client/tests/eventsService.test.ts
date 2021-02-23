import EventsService, {
  EventsPerCategory,
} from "../src/services/eventsService";
import { IEvent, EventFactory, IFilter } from "../src/models/event";
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

  beforeEach(async () => {
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

  it("should update an event", async () => {
    // given
    let event: IEvent = EventFactory({
      categories: ["it", "marketing"],
    });
    const id = await service.createEvent(event);
    const preUpdateEvent: IEvent = (await (
      await db.collection("events").doc(id).get()
    ).data()) as IEvent;

    // when
    event = EventFactory({
      ...preUpdateEvent,
      topic: "UpdatedTopic",
      location: "UpdatedLocation",
      categories: ["finance"],
    });
    await service.updateEvent(event.id, event);
    const postUpdateEvent: IEvent = (await (
      await db.collection("events").doc(id).get()
    ).data()) as IEvent;

    // then
    expect(id).toBeDefined();
    expect(preUpdateEvent.id).toBe(id);
    expect(postUpdateEvent.id).toBe(id);
    expect(preUpdateEvent === postUpdateEvent).toBeFalsy();
    expect(preUpdateEvent.id === postUpdateEvent.id).toBeTruthy();
    expect(preUpdateEvent.topic === postUpdateEvent.topic).toBeFalsy();
    expect(preUpdateEvent.location === postUpdateEvent.location).toBeFalsy();
    expect(preUpdateEvent.price === postUpdateEvent.price).toBeTruthy();
    expect(
      preUpdateEvent.categories === postUpdateEvent.categories
    ).toBeFalsy();
    expect(preUpdateEvent.status === postUpdateEvent.status).toBeTruthy();
    expect(preUpdateEvent.image === postUpdateEvent.image).toBeTruthy();
    expect(
      preUpdateEvent.description === postUpdateEvent.description
    ).toBeTruthy();
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

  describe("filters", () => {
    let docs: EventsPerCategory[];

    beforeEach(async () => {
      // given
      const events: Partial<IEvent>[] = [
        {
          topic: "IT 101",
          categories: ["it"],
          startTime: faker.date.soon(),
          endTime: faker.date.future(),
          location: "North",
        },
        {
          topic: "Leading Tech",
          categories: ["leadership", "it"],
          startTime: faker.date.soon(),
          endTime: faker.date.future(),
          location: "South",
        },
        {
          topic: "finance for dummy's",
          categories: ["finance"],
          startTime: faker.date.soon(),
          endTime: faker.date.future(),
          location: "North",
        },
        {
          topic: "Marketing 101",
          categories: ["marketing"],
          startTime: faker.date.soon(),
          endTime: faker.date.future(),
          location: "West",
        },
      ];
      await Promise.all(
        events.map((event: Partial<IEvent>) =>
          db.collection("events").add(event)
        )
      );
      docs = await service.getAllEvents();
    });

    it("should filter events per categories when given as a parameter", async () => {
      // when
      const filter: IFilter = {
        topic: undefined,
        startDate: undefined,
        catagories: ["it", "leadership"],
        location: undefined,
      };
      // When
      const filteredDocs = EventsService.filter(filter, docs);

      // then
      expect(filteredDocs).toBeDefined();
      expect(filteredDocs.length).toEqual(2);
    });

    it("should filter out undesired catagories", async () => {
      const filter: IFilter = {
        topic: undefined,
        startDate: undefined,
        catagories: ["it", "marketing"],
        location: undefined,
      };

      const res: EventsPerCategory[] = EventsService.filter(filter, docs);

      expect(res).toBeDefined();
      expect(res.length).toEqual(2);
      expect(res.find((e) => e.category === "it").items.length).toBeTruthy();
      expect(res.find((e) => e.category === "it").items.length).toEqual(2);
      expect(
        res.find((e) => e.category === "marketing").items.length
      ).toBeTruthy();
      expect(res.find((e) => e.category === "finance")?.items).toBeFalsy();
      expect(res.find((e) => e.category === "leadership")?.items).toBeFalsy();
    });

    it("should filter fuzzy searched location", async () => {
      // when
      const filter: IFilter = {
        topic: undefined,
        startDate: undefined,
        catagories: undefined,
        location: "north",
      };
      const res: EventsPerCategory[] = EventsService.filter(filter, docs);

      // then
      expect(res).toBeDefined();
      expect(res.length).toEqual(2);
      expect(res.find((e) => e.category === "it").items.length).toBeTruthy();
      expect(
        res.find((e) => e.category === "finance").items.length
      ).toBeTruthy();
    });

    it("should filter fuzzy searched topics", async () => {
      const filter: IFilter = {
        topic: "101",
        startDate: undefined,
        catagories: undefined,
        location: undefined,
      };
      const res = EventsService.filter(filter, docs);

      expect(res).toBeDefined();
      expect(res.length).toEqual(2);
      expect(res.find((e) => e.category === "it").items.length).toBeTruthy();
      expect(
        res.find((e) => e.category === "marketing").items.length
      ).toBeTruthy();
    });
  });
});
