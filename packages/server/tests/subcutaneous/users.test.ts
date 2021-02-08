import axios from "axios";
import config from "config";
import faker from "faker";

const suite = "users";
const apiVersion = config.get("apiVersion");
const apiUrl = config.get("apiUrl");
const url = `${apiUrl}/${apiVersion}`;
const testApiKey = "testApiKey";

describe(suite, () => {
  const user = {
    firstName: "Firstname",
    lastName: "Lastname",
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: "userId1234",
    company: "Company",
    companyPhone: "12345678",
  };

  console.log(`Testing Url: ${url}`);

  afterAll(async () => {
    // cleanup
    // await axios.delete(`${url}/users/${userInDb.id}`, options);
  });

  it("should create a user", async () => {
    // simulate client-side auth user creation
    const createAccountUrl = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=${testApiKey}`;
    const { data } = await axios.post(createAccountUrl, {
      email: user.email,
      password: user.password,
    });
    const { localId, idToken } = data;
    console.log("idToken", idToken);
    console.log("localId", localId);

    const options = {
      headers: { Authorization: `Bearer ${idToken}` },
    };
    const resp = await axios.post(`${url}/users`, user, options);

    expect(1).toBe(1);
    expect(resp.status).toBe(200);
    // const resp = await axios.post(`${url}/users`, user);
  });

  it.skip("should be able to login with that user", async () => {
    // const resp = await axios.post(`${url}/auth`, auth, options);
  });

  it.skip("should be able to retrieve list of events", async () => {
    // const resp = await axios.get(`${url}/events`, options);
  });
});
