/**
 * Checks for the presence and validity of an authorization header token
 */

import { Request, Response, NextFunction } from "express";
import { auth } from "firebase-admin";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: REfactor when firebase testing library supports mocking the auth https://github.com/firebase/firebase-js-sdk/issues/2940
  // disable authorization if in test
  if (process.env.NODE_ENV === "test") {
    const decodedIdToken = req.body.decodedIdToken;
    req.app.set("decodedIdToken", decodedIdToken);
    return next();
  }

  // validate header has a bearer token
  const header = req.header("Authorization");
  const token = header?.replace("Bearer ", "");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  // verify and decode idToken

  try {
    const decodedIdToken = await auth().verifyIdToken(token);
    req.app.set("decodedIdToken", decodedIdToken);
    return next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).send("Access denied. Invalid token");
  }
}
