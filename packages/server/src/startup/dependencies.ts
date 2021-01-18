import express from "express";
import firebase from "firebase-admin";
import UsersService from "../services/users";

export interface AppDependencies {
  admin: firebase.app.App;
  db?: FirebaseFirestore.Firestore;
  usersService?: UsersService;
}

export default function (app: express.Application, services: AppDependencies) {
  // assign default services, but allow overriding
  const db = services.db || services.admin.firestore();
  const usersService = services.usersService || new UsersService(db);

  // attach dependencies to the express app
  app.set("admin", services.admin);
  app.set("db", db);
  app.set("usersService", usersService);
}
