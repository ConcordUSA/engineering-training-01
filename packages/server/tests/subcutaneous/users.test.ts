// import axios from "axios";
import config from "config";

const suite = "users";
const apiVersion = config.get("apiVersion");
const apiUrl = config.get("apiUrl");
const url = `${apiUrl}/${apiVersion}`;

describe.skip(suite, () => {
  // const user = {
  //   firstName: "Firstname",
  //   lastName: "Lastname",
  //   email: "fake_email@email.com",
  //   password: "SomePassword",
  // };

  console.log(`Testing Url: ${url}`);

  afterAll(async () => {
    // cleanup
    // await axios.delete(`${url}/users/${userInDb.id}`, options);
  });

  it.skip("should create a user", async () => {
    // const resp = await axios.post(`${url}/users`, user);
  });

  it.skip("should be able to login with that user", async () => {
    // const resp = await axios.post(`${url}/auth`, auth, options);
  });

  it.skip("should be able to retrieve list of events", async () => {
    // const resp = await axios.get(`${url}/events`, options);
  });
});
