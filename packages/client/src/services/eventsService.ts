import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Category, IEvent, EventFactory, IFilter } from "../models/event";
import { User } from "../models/user";

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

export default class EventsService {
  private collection = "events";
  constructor(private db: firebase.firestore.Firestore) {}

  static stringFilter(
    search: string,
    eventGroups: EventsPerCategory[],
    queryField
  ): EventsPerCategory[] {
    let res: EventsPerCategory[] = [];
    eventGroups.forEach((group: EventsPerCategory) => {
      const regex = new RegExp(`^${search}`, "gi");
      group.items = group.items.filter((event: IEvent) => {
        let i = 0;
        const keyWords = event[`${queryField}`].split(" ");
        while (keyWords[i]) {
          if (keyWords[i++].match(regex)) return true;
        }
        return false;
      });
      if (group.items.length) res.push(group);
    });
    return res;
  }

  static dateFilter(
    filterDate: any,
    eventGroups: EventsPerCategory[]
  ): EventsPerCategory[] {
    let res = [];
    eventGroups.forEach((group: EventsPerCategory) => {
      group.items = group.items.filter((event: IEvent) => {
        return filterDate;
        // filterDate.() >= event.startTime.getTime &&
        // filterDate.getTime <= event.endTime.getTime
      });
      if (group.items.length) res.push(group);
    });
    return res;
  }

  static filter(
    filter: IFilter,
    eventGroups: EventsPerCategory[]
  ): EventsPerCategory[] {
    let filteredResult = [];
    filter.catagories = filter?.catagories ? filter.catagories : allCatagories;

    // Remove unwanted catagories
    filteredResult = eventGroups.filter((group: EventsPerCategory) => {
      return filter.catagories.includes(group.category);
    });

    // Filter events with topics that fuzzy match topic filter
    if (filter?.topic) {
      filteredResult = EventsService.stringFilter(
        filter.topic,
        filteredResult,
        "topic"
      );
    }

    // Filter events with topics that fuzzy match location filter
    if (filter?.location) {
      filteredResult = EventsService.stringFilter(
        filter.location,
        filteredResult,
        "location"
      );
    }

    // Filter events with dates that are on or after specified
    if (filter?.startDate) {
      filteredResult = EventsService.dateFilter(
        filter.startDate,
        filteredResult
      );
    }
    return filteredResult;
  }

  public async createEvent(event: IEvent): Promise<string> {
    const newEvent = EventFactory(event);
    const doc = this.db.collection(this.collection).doc();

    const id = doc.id;
    await doc.set({ ...newEvent, id });
    return id;
  }

  public async getEvent(id: string): Promise<IEvent> {
    const doc = await this.db.collection(this.collection).doc(id).get();
    const data = doc.data() as IEvent;
    const event: IEvent = EventFactory(data);

    return event;
  }

  public async deleteEvent(id: string) {
    return await this.db.collection(this.collection).doc(id).delete();
  }

  public async updateEvent(uid: string, data: Object): Promise<object> {
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

  public async getAllEvents(
    interestedCategories?: string[]
  ): Promise<EventsPerCategory[]> {
    // if no interestedCategories are passed we default to allCatagories
    interestedCategories = interestedCategories
      ? interestedCategories
      : allCatagories;

    // Get a unique list of interest and non-interest
    const uniqueArray = getUniqueArray(
      interestedCategories.concat(allCatagories)
    );

    const docsRefs = await this.db
      .collection(this.collection)
      .where("startTime", ">=", new Date())
      .get();

    // put a record of an event in each corresponding array item (can be in multiple depending on categories selected)
    const eventsPerCategory = {};
    docsRefs.docs.forEach((doc) => {
      const event = doc.data() as IEvent;
      // console.log(event);
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

  public async registerForEvent(
    user: User,
    event: IEvent,
    isRegistered: boolean
  ) {
    if (!isRegistered) {
      const doc = this.db
        .collection(this.collection)
        .doc(event.id)
        .collection("attendees")
        .doc(user.uid);
      await doc.set(user);
      return;
    }
    this.db
      .collection(this.collection)
      .doc(event.id)
      .collection("attendees")
      .doc(user.uid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  public async getAttendees(event: IEvent) {
    const docsRefs = await this.db
      .collection(this.collection)
      .doc(event.id)
      .collection("attendees")
      .get();

    const attendees = [];
    docsRefs.docs.forEach((doc) => {
      attendees.push(doc.id);
    });
    return attendees;
  }
}
