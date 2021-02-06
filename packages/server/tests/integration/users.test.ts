import request from "supertest";
import app from "../../src/app";
import firebase from "firebase-admin";
import { AppDependencies } from "../../src/startup/dependencies";
import axios from "axios";
import faker from "faker";
// import * as testing from "@firebase/rules-unit-testing";

const testApiKey = "testApiKey";
const collection = "users";
const endpoint = `/${collection}`;

describe(endpoint, () => {
  const admin = firebase.initializeApp();
  const db = admin.firestore();
  // const auth = admin.auth();
  const dependencies: AppDependencies = { admin, db };
  const server = request(app(dependencies));

  const user = {
    firstName: "Firstname",
    lastName: "Lastname",
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: "userId1234",
    company: "Company",
    companyPhone: "12345678",
  };

  afterEach(async () => {
    // delete data
    await cleanCollection(db, collection);
  });
  afterAll(async () => {
    // delete app
    firebase.apps.map((app) => app.delete());
  });

  describe("GET /", () => {
    it("should get all the users", async () => {
      // seed data
      await db.collection(collection).add(user);

      const resp = await server.get(endpoint);

      expect(resp.status).toBe(200);
    });
  });

  describe.skip("POST /", () => {
    it("should create a new user", async () => {
      const createAccountUrl = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=${testApiKey}`;
      const { data } = await axios.post(createAccountUrl, {
        email: user.email,
        password: user.password,
      });
      const resp = await server
        .post(endpoint)
        .send(user)
        .set("Authorization", `Bearer ${data.idToken}`);

      expect(1).toBe(1);
      expect(resp.status).toBe(200);

      // TODO: Test that it is in the database
    });
  });
});

const cleanCollection = async (db, collection) => {
  const docs = await db.collection(collection).get();
  return docs.forEach(async (doc) => await doc.ref.delete());
};
