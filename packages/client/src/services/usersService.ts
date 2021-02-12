import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User, UserFactory } from "../models/user";

export default class UsersService {  
  private collection = "users"

  constructor(
    private db: firebase.firestore.Firestore,
    private auth?: firebase.auth.Auth,    
  ) {}

  public createUser = async (user: User) => {
    if (!user.password) return { error: "No password provided" };
    // create user in auth service
    let uid: string | undefined;

    const userCredential = await this.auth?.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
    uid = userCredential?.user?.uid;;
    // create user in db service
    try {
      await this.db.collection(this.collection).doc(uid).set({...user, uid });
      return {uid, message:"User successfully created"};
    } catch (error) {
      return { error: error.message };
    }
  };

  public async getUser(uid: string) {
    const doc = await this.db.collection(this.collection).doc(uid).get();
    const data = doc.data() as User;
    const user = UserFactory(data);
  
    return user;
  }

  public async updateUser(uid: string, data: Object) {
    try {
      await this.db.collection(this.collection).doc(uid).set({...data}, {merge:true});
      return {uid, message:"User successfully updated"};      
    } catch (error) {
      return { error: error.message };
    }
  }

}
