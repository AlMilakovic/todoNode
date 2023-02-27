import { Router } from "express";
import { googleOauthHandler } from "../../middleware/googleOauthHandler";

export function oauthUserRouter(): Router {
  const userRouter = Router();

  return userRouter.get("/sessions/oauth/google", googleOauthHandler);
}
