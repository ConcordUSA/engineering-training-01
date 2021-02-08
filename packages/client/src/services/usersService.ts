import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User } from "../models/user";

export default class UsersService {
  constructor(
    private db: firebase.firestore.Firestore,
    private auth?: firebase.auth.Auth
  ) {}

  public createUser = async (user: User) => {
    if (!user.password) return { error: "No password propvided" };

    // create user in auth service
    let uid: string | undefined;
    try {
      const userCredential = await this.auth?.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      uid = userCredential?.user?.uid;
    } catch (error) {
      return { error: error.message };
    }

    // create user in db service
    const data: User = {
      uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      companyPhone: user.companyPhone,
    };

    try {
      await this.db.collection("users").doc(uid).set(data);
      return { message: "User successfully created." };
    } catch (error) {
      return { error: error.message };
    }
  };
}
