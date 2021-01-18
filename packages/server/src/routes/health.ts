import * as express from "express";
import config from "config";

const router = express.Router();
const apiVersion = config.get("apiVersion");

router.get("/", (req, res) => {
  res.send(`${apiVersion} - Healthy`);
});

export default router;
