import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.log("reay");
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", [
    "Authorization",
    "content-type",
    "Content-Type",
  ]);
  next();
}
