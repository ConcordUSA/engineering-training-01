import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Category, IEvent, EventFactory } from "../models/event";

export interface EventsPerCategory {
  category: Category;
  items: IEvent[];
}
const allCatagories: Category[] = ["it", "marketing", "finance", "leadership"];

const getUniqueArray = (arr) => {
  let uniqueArray = [];
  arr.forEach((elem) => {
    if (!uniqueArray.includes(elem)) uniqueArray.push(elem);
  });
  return uniqueArray;
};

// interface IService {
//   collection: string;
//   createEvent();
//   getEvent();
//   deleteEvent();
//   getAllEvents();
// }
export default class EventsService {
  private collection = "events";
  constructor(private db: firebase.firestore.Firestore) {}

  public async createEvent(event: IEvent) {
    const newEvent = EventFactory(event);
    const doc = this.db.collection(this.collection).doc();

    const id = doc.id;
    await doc.set({ ...newEvent, id });
    return id;
  }

  public async getEvent(id: string) {
    console.log("id is", id);
    const doc = await this.db.collection(this.collection).doc(id).get();
    const data = doc.data() as IEvent;
    const event = EventFactory(data);

    return event;
  }

  public async deleteEvent(id: string) {
    return await this.db.collection(this.collection).doc(id).delete();
  }

  public async getAllEvents(
    interestedCategories?: string[],
    includePastEvents?: boolean
  ) {
    // if no interestedCategories are passed we default to allCatagories
    interestedCategories = interestedCategories
      ? interestedCategories
      : allCatagories;

    // Get a unique list of interest and non-interest
    const uniqueArray = getUniqueArray(
      interestedCategories.concat(allCatagories)
    );

    // Past events will be added if parameter is true
    let docsRefs;
    if (includePastEvents) {
      docsRefs = await this.db.collection(this.collection).get();
    } else {
      docsRefs = await this.db
        .collection(this.collection)
        .where("startTime", ">", new Date())
        .get();
    }

    // put a record of an event in each corresponding array item (can be in multiple depending on categories selected)
    const eventsPerCategory = {};
    docsRefs.docs.forEach((doc) => {
      const event = doc.data() as IEvent;
      const { categories } = event;
      // build up the arrays of eventsPerCategory
      categories.forEach((category) => {
        if (!eventsPerCategory[category]) eventsPerCategory[category] = [];
        eventsPerCategory[category].push(event);
      });
    });

    let result = uniqueArray.map((key) => {
      const items = eventsPerCategory[key];
      if (!items) return undefined;

      const item: EventsPerCategory = {
        category: key as Category,
        items,
      };
      return item;
    });

    result = result.filter((item) => item !== undefined);
    return result;
  }

  public async updateEvent(uid: string, data: Object) {
    try {
      await this.db
        .collection(this.collection)
        .doc(uid)
        .set({ ...data }, { merge: true });
      return { uid, message: "User successfully updated" };
    } catch (error) {
      return { error: error.message };
    }
  }
}
