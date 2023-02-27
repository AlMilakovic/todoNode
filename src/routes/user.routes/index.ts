import { Router } from "express";
import { loginUserRouter } from "./login";
import { logoutUserRouter } from "./logout";
import { oauthUserRouter } from "./oauth";
import { registerUserRouter } from "./register";

export default function userRoutes(): Router {
  const userRoutes = Router();

  userRoutes.use("/user", registerUserRouter());
  userRoutes.use("/user", loginUserRouter());
  userRoutes.use("/user", logoutUserRouter());
  userRoutes.use(oauthUserRouter());

  return userRoutes;
}
