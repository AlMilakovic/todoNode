import { Router, Request, Response, NextFunction } from "express";

import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";

export function logoutUserRouter(): Router {
  const userRouter = Router();

  return userRouter.get(
    "/logout",

    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.session?.userId) {
          req.session.destroy((err) => {
            return next(err);
          });
        }

        return res
          .status(httpStatusCodes.OK)
          .send({ message: "Logout successful!" });
      } catch (error) {
        next(error);
      }
    }
  );
}
