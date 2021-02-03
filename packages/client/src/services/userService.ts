import { getAuth } from "../configFirebase";
const auth = getAuth();

export const register = async (email: string, password: string) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return console.log("userCredential", userCredential);
  } catch (error) {
    return console.log("error", error);
  }
};
