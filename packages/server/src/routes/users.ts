import * as express from "express";
import { firestore } from "firebase-admin";
import auth from "../middleware/auth";

const router = express.Router();
const collection = "users";

// get all users
router.get("/", async (req, res) => {
  return res.send(`Hello World - ${collection}`);
});

// create a new user
router.post("/", auth, async (req, res) => {
  // TODO: Refactor
  // TODO: Validate input & create model

  // verify body of request has needed data
  const decodedIdToken = req.app.get("decodedIdToken");
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
