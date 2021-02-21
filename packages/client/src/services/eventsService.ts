import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Category, Event, EventFactory } from "../models/event";

export interface EventsPerCategory {
  category: Category;
  items: Event[];
}

export default class EventsService {
  private collection = "events";

  constructor(private db: firebase.firestore.Firestore) {}

  public async createEvent(event: Event) {
    const doc = this.db.collection(this.collection).doc();
    const id = doc.id;

    await doc.set({ ...event, id });
    return id;
  }

  public async getEvent(id: string) {
    console.log("id is", id);
    const doc = await this.db.collection(this.collection).doc(id).get();
    const data = doc.data() as Event;
    const event = EventFactory(data);

    return event;
  }

  public async deleteEvent(id: string) {
    return await this.db.collection(this.collection).doc(id).delete();
  }

  public async getAllEvents(interestedCategories?) {
    const allCatagories: Category[] = [
      "it",
      "marketing",
      "finance",
      "leadership",
    ];
    // if no interestedCategories are passed we default to allCatagories
    if (!interestedCategories) interestedCategories = allCatagories;

    const concatArray = interestedCategories.concat(allCatagories);
    let uniqueArray = [];
    concatArray.forEach((elem) => {
      if (!uniqueArray.includes(elem)) uniqueArray.push(elem);
    });

    // get all future events from db
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

    let result = uniqueArray.map((key) => {
      const items = eventsPerCategory[key];
      if (!items) {
        return undefined;
      }

      const item: EventsPerCategory = {
        category: key as Category,
        items,
      };
      return item;
    });

    result = result.filter((item) => item !== undefined);
    return result;
  }
}
