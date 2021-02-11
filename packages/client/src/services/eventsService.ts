import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Event, EventFactory } from "../models/event";

export default class EventsService {
  constructor(private db: firebase.firestore.Firestore) {}

  public async createEvent(event: Event) {
    const doc = this.db.collection("events").doc();
    const id = doc.id;

    await doc.set({ ...event, id });
    // console.log(await this.getEvent(id));
    return id;
  }

  public async getEvent(id: string) {
    const doc = await this.db.collection("events").doc(id).get();
    const data = doc.data() as Event;
    const event = EventFactory(data);

    return event;
  }

  public async getAllEvents(filter?: string[]) {
    if(filter) {
      
    }
    const docsRef = await this.db.collection("events").get();
    return docsRef.docs.map((doc) => doc.data());
  }
}
