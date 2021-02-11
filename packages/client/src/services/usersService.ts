import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User, UserFactory } from "../models/user";

export default class UsersService {
  constructor(
    private db: firebase.firestore.Firestore,
    private auth?: firebase.auth.Auth
  ) {}

  public createUser = async (user: User) => {
    if (!user.password) return { error: "No password provided" };
    // create user in auth service
    let uid: string | undefined;

    const userCredential = await this.auth?.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    uid = userCredential?.user?.uid;
    // create user in db service
    try {
      await this.db.collection("users").doc(uid).set({...user, uid });
      return {uid, message:"User successfully created"};
    } catch (error) {
      return { error: error.message };
    }
  };


  public async getUser(id: string) {
    const doc = await this.db.collection("events").doc(id).get();
    const data = doc.data() as User;
    const user = UserFactory(data);
  
    return user;
  }

  // STATE 1
  // register
  // logged in, but not verified

  // STATE 2
  // trigger the send of an email
  // put the app in a state that ????
}
