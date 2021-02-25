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
    queryField: string
  ): EventsPerCategory[] {
    let res: EventsPerCategory[] = [];
    eventGroups.forEach((group: EventsPerCategory) => {
      const regex = new RegExp(`^${search}`, "gi");
      //const newGroup = { ...group };
      const newGroup = JSON.parse(JSON.stringify({...group}))
      newGroup.items = newGroup.items.filter((event: IEvent) => {
        let i = 0;
        let keyWords = event[`${queryField}`].split(" ");
        keyWords.push(event[`${queryField}`]);
        while (keyWords[i]) {
          if (keyWords[i++].match(regex)) return true;
        }
        return false;
      });
      if (newGroup.items.length) res.push(newGroup);
    });
    return res;
  }

  static filter(
    filter: IFilter,
    eventGroups: EventsPerCategory[]
  ): EventsPerCategory[] {
    let filteredResult: EventsPerCategory[] = eventGroups;

    if (filter.catagories && filter.catagories.length) {
      // Remove unwanted catagories
      filteredResult = eventGroups.filter((group: EventsPerCategory) => {
        return filter.catagories.includes(group.category);
      });
    }

    // Filter events with topics that fuzzy match topic filter
    if (filter?.topic && filter.topic.length) {
      filteredResult = EventsService.stringFilter(
        filter.topic,
        filteredResult,
        "topic"
      );
    }

    // Filter events with topics that fuzzy match location filter
    if (filter?.location && filter.location.length) {
      filteredResult = EventsService.stringFilter(
        filter.location,
        filteredResult,
        "location"
      );
    }

    return filteredResult;
  }

  private serializeFromFirebaseToIEvent(data: any): IEvent {
    const startTime = new Date(data?.startTime?.seconds * 1000);
    const endTime = new Date(data?.endTime?.seconds * 1000);
    return { ...data, startTime, endTime };
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
    const data = this.serializeFromFirebaseToIEvent(doc.data());
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
    interestedCategories?: string[], 
    getPastEvents?: boolean
  ): Promise<EventsPerCategory[]> {
    // if no interestedCategories are passed we default to allCatagories
    interestedCategories = interestedCategories
      ? interestedCategories
      : allCatagories;

    // Get a unique list of interest and non-interest
    const uniqueArray = getUniqueArray(
      interestedCategories.concat(allCatagories)
    );

    let docsRefs = undefined;
    if (!getPastEvents) {
      docsRefs = await this.db
        .collection(this.collection)
        .where("startTime", ">=", new Date())
        .get();
    } else {
      docsRefs = await this.db
        .collection(this.collection)
        .where("startTime", "<=", new Date())
        .get();
   }

    // put a record of an event in each corresponding array item (can be in multiple depending on categories selected)
    const eventsPerCategory = {};
    docsRefs.docs.forEach((doc) => {
      const event = this.serializeFromFirebaseToIEvent(doc.data());
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

    return docsRefs.docs.map((doc) => {
      // ideally...we serialize here
      return doc.data() as User;
    });
  }
}
