import { firestore } from "firebase-admin";

export default class UsersService {
  constructor(private db: firestore.Firestore, private collection = "users") {}

  async get() {
    const query = await this.db.collection(this.collection).get();
    const docs = query.docs.map((doc) => doc.data());

    return docs;
  }
}
