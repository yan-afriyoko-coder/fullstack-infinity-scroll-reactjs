import { Router } from "express";
import personalRoute from "./personal.route.js";
const route = Router();

route.use("/api", personalRoute);
route.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

export default route;
