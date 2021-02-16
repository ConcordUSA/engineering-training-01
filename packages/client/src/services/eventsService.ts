import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Category, Event, EventFactory } from "../models/event";

export default class EventsService {
  private collection = "events";

  constructor(private db: firebase.firestore.Firestore) {}

  public async createEvent(event: Event) {
    const doc = this.db.collection(this.collection).doc();
    const id = doc.id;

    await doc.set({ ...event, id });
    // console.log(await this.getEvent(id));
    return id;
  }

  public async getEvent(id: string) {
    const doc = await this.db.collection(this.collection).doc(id).get();
    const data = doc.data() as Event;
    const event = EventFactory(data);

    return event;
  }

  public async deleteEvent(id: string) {
    return await this.db.collection(this.collection).doc(id).delete();
  }

  public async getAllEvents(interestedCategories?: Category) {
    const interestArray = interestedCategories
      ? Object.values(interestedCategories)
      : [];

    // get from db
    const docsRefs = await this.db
      .collection(this.collection)
      .where("startTime", ">", new Date())
      .get();

    // massage the data
    const eventsPerCategory = {};

    // put a record of an event in each corresponding array item (can be in multiple depending on categories selected)
    docsRefs.docs.forEach((doc) => {
      const event = doc.data() as Event;
      const { categories } = event;

      // build up the arrays of eventsPerCategory
      categories.forEach((category) => {
        if (!eventsPerCategory[category]) eventsPerCategory[category] = [];
        eventsPerCategory[category].push(event);
      });
    });

    const categoriesThatExistInQueryData = Object.keys(eventsPerCategory);
    const result = categoriesThatExistInQueryData.map((key) => {
      const items = eventsPerCategory[key];

      return {
        category: key,
        items,
      };
    });

    let array2 = [];
    result.forEach((elem) => {
      if (interestArray.includes(elem.category)) {
        array2.push(elem);
      }
    });
    result.forEach((elem) => {
      if (!interestArray.includes(elem.category)) {
        array2.push(elem);
      }
    });

    return result;
  }
}
