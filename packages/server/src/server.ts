import express from "express";
import app from "./app";
import config from "config";
import { initializeApp } from "firebase-admin";
import cors from "./middleware/cors";
import { AppDependencies } from "./startup/dependencies";

// initialize express server and firebase instance
const server = express();
const apiVersion = config.get("apiVersion");

// services
const admin = initializeApp();
const services: AppDependencies = { admin };

// disable CORS & add the path to receive request
server.use(cors);
server.use(`/${apiVersion}`, app(services));

export default server;
