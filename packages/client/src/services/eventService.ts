import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Event, EventFactory } from "../models/event";

export default class EventService {
  constructor(private db: firebase.firestore.Firestore) {}

  public async createEvent(event: Event) {
    const doc = this.db.collection("events").doc();
    await doc.set(event);
    return doc.id;
  }

  public async getEvent(id: string) {
    const doc = await this.db.collection("events").doc(id).get();
    const data = doc.data() as Event;
    const event = EventFactory({ ...data, id: doc.id });

    return event;
  }
}
