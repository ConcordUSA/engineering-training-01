import * as express from "express";
import { auth, firestore } from "firebase-admin";

const router = express.Router();
const collection = "users";

// get all users
router.get("/", async (req, res) => {
  return res.send(`Hello World - ${collection}`);
});

// create a new user
router.post("/", async (req, res) => {
  // validate header has a bearer token
  const header = req.header("Authorization");
  const token = header?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  // verify and decode idToken
  let decodedIdToken: auth.DecodedIdToken;
  try {
    decodedIdToken = await auth().verifyIdToken(token);
  } catch (error) {
    return res.status(401).send("Access denied. Invalid token");
  }

  // verify body of request has needed data
  const { uid } = decodedIdToken;
  const {
    email,
    firstName,
    lastName,
    company,
    companyPhone,
    personalPhone,
  } = req.body;
  const data = {
    email,
    firstName,
    lastName,
    company,
    companyPhone,
    personalPhone,
    uid,
  };
  // return res.send(data);
  try {
    await firestore().collection("users").doc(uid).set(data);
    return res.send(`${uid} user created`);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
