import { atom } from "recoil";
import {EventFactory} from '../models/event'

export const signedIn = atom({
  key: "signedIn",
  default: false,
});

export const emailVerified = atom({
  key: "emailVerified",
  default: false,
});

export const signInView = atom({
  key: "signInView",
  default: true,
});

export const selectedEvent = atom({
  key: "selectedEvent",
  default: EventFactory(),
});
