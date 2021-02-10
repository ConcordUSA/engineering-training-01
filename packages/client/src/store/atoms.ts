import { atom } from "recoil";

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
