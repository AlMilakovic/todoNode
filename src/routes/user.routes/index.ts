import { Router } from "express";
import { registerUserRouter } from "./register";

export default function userRoutes(): Router {
  const userRoutes = Router();

  userRoutes.use("/user", registerUserRouter());

  return userRoutes;
}
