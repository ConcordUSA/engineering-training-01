//import libraries
import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
// import server from "./server";
// export const api = functions.https.onRequest(server);

const admin = firebase.initializeApp();

export const onRegistrationChange = functions.firestore
  .document("/events/{eventId}/attendees/{attendeeId}")
  .onWrite(async (change, context) => {
    // count number of attendees
    const { eventId, attendeeId } = context.params;

    // get number of attendees
    const attendeesRef = await admin
      .firestore()
      .collection("events")
      .doc(eventId)
      .collection("attendees")
      .get();
    const numberOfAttendees = attendeesRef.docs.length;

    // get price
    const eventRef = await admin
      .firestore()
      .collection("events")
      .doc(eventId)
      .get();
    const price = eventRef.data()?.price;

    // set the totalRevenue
    const totalRevenue = price * numberOfAttendees;
    await admin
      .firestore()
      .collection("events")
      .doc(eventId)
      .set({ totalRevenue }, { merge: true });

    // set registration
    const isRegistered = change.after.exists;
    const userRef = await admin
      .firestore()
      .collection("users")
      .doc(attendeeId)
      .get();
    let eventsAttending = userRef.data()?.eventsAttending;

    if (isRegistered) eventsAttending.push(eventId);
    else {
      eventsAttending = eventsAttending.filter((id: string) => id !== eventId);
    }

    return await admin
      .firestore()
      .collection("users")
      .doc(attendeeId)
      .set({ eventsAttending }, { merge: true });
  });
