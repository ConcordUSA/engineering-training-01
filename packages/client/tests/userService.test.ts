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
    const {uid, message, error} = await service.createUser(user);
    const {uid:docUid} = await service.getUser(uid);
    
    // then
    expect(error).toBeUndefined();
    expect(message).toBeDefined();    
    expect(uid).toBeDefined();
    expect(docUid).toBe(uid);
	});

  it('should update a user', async () => {
    // given
    const uid = "testUid"
    const data = {
      whatever: 'whatever'
    }
    // when
    const {message,error} = await service.updateUser(uid,data)
    
    // then
    expect(error).toBeUndefined();
    expect(message).toBeDefined();
    // TODO: Check the db (when adam gets his crap together and figure out the db connection)
  });
});