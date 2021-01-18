import * as express from "express";

const router = express.Router();
const collection = "users";

// get all users
router.get("/", async (req, res) => {
  return res.send(`Hello World - ${collection}`);
});

export default router;
