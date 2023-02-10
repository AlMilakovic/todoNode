import { Router, Request, Response, NextFunction } from "express";

import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import { userLoginDTOSchema } from "../userDTO/userDTO";

import { inputValidationHandler } from "../../middleware/inputValidationHandler";

export function loginUserRouter(): Router {
  const userRouter = Router();

  return userRouter.post(
    "/login",
    userLoginDTOSchema,
    inputValidationHandler,

    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (req.session?.userId) {
          return res.status(400).send({ message: "User already loged in" });
        }

        const session = req.session ?? { userId: null };
        session.userId = req.body.email as string;

        return res
          .status(httpStatusCodes.OK)
          .send({ message: "Login successful!" });
      } catch (error) {
        next(error);
      }
    }
  );
}
