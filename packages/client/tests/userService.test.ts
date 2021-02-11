import { getFirestore, getAuth } from "../src/config/firebase";
import { UserFactory } from "../src/models/user";
import UsersService from "../src/services/usersService";
import faker from 'faker'

describe("UserService", () => {
  const db = getFirestore();
  const auth = getAuth();
  const service = new UsersService(db, auth);
  //   const admin = firebase.initializeApp();
  //   const adminDb = admin.firestore();

  it("should create and retrieve an user", async () => {
    // given
    const user = UserFactory();
    user.email = faker.internet.email();
    user.password = faker.internet.password();

    // when
    const {uid} = await service.createUser(user);
    const doc = await service.getUser(uid);
    
    // then
    
    expect(uid).toBeDefined();
    // expect(doc.id).toBe(id);
	});
});