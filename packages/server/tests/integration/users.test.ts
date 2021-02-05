import request from "supertest";
import app from "../../src/app";
import firebase from "firebase-admin";
import { AppDependencies } from "../../src/startup/dependencies";

const collection = "users";
const endpoint = `/${collection}`;

describe(endpoint, () => {
  const admin = firebase.initializeApp();
  const db = admin.firestore();
  const dependencies: AppDependencies = { admin, db };
  const server = request(app(dependencies));

  const user = {
    firstName: "Firstname",
    lastName: "Lastname",
    email: "email@email.com",
    password: "password",
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

  describe("POST /", () => {
    it("should create a new user", async () => {
      const uid = "testUid";
      const decodedIdToken = { uid };
      const resp = await server
        .post(endpoint)
        .send({ ...user, decodedIdToken });

      // get record from the db
      const doc = await db.collection(collection).doc(uid).get();

      expect(resp.status).toBe(200);
      expect(doc.exists).toBe(true);
    });
  });
});

const cleanCollection = async (db, collection) => {
  const docs = await db.collection(collection).get();
  return docs.forEach(async (doc) => await doc.ref.delete());
};
