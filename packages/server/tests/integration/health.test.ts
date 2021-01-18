import request from "supertest";
import app from "../../src/app";
import firebase from "firebase-admin";
import { AppDependencies } from "../../src/startup/dependencies";

const endpoint = `/`;

describe("health", () => {
  const admin = firebase.initializeApp();
  const dependencies: AppDependencies = { admin };
  const server = request(app(dependencies));

  beforeEach(() => {});

  it("should return 200", async () => {
    const resp = await server.get(endpoint);

    expect(resp.text.includes("Healthy")).toBe(true);
    expect(resp.status).toBe(200);
  });
});
