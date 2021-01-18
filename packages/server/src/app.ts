import express from "express";
import health from "./routes/health";
import users from "./routes/users";
import bodyParser from "body-parser";
import config from "config";
import injectDependencies, { AppDependencies } from "./startup/dependencies";

/**
 * Main Express App
 *
 * @param admin Firebase App - Inject as a dependency to support testing
 * @returns Express App
 */
export default function (dependencies: AppDependencies) {
  // check for environment variables
  if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
  }

  // initialize app
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // inject depencendies
  injectDependencies(app, dependencies);

  // add routes
  app.use("/", health);
  app.use("/users", users);

  return app;
}
