import { Router, Request, Response, NextFunction } from "express";

import { httpStatusCodes } from "../../services/error.services/httpStatusCodes";
import { User } from "../../repository/user.repository/types";
import { MongoError } from "mongodb";
import { userDTOSchema } from "../userDTO/userDTO";
import { createUser } from "../../services/user.services/userServices";
import bcrypt from "bcrypt";
import { inputValidationHandler } from "../../middleware/inputValidationHandler";

const saltRounds = 2;

export function registerUserRouter(): Router {
  const userRouter = Router();

  return userRouter.post(
    "/register",
    userDTOSchema,
    inputValidationHandler,

    async (req: Request, res: Response, next: NextFunction) => {
      let user = {} as User;
      try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        (await createUser(firstName, lastName, email, hashedPassword)).match(
          (value) => {
            user = value;
          },
          (e) => {
            throw new MongoError(e);
          }
        );

        return res
          .status(httpStatusCodes.OK)
          .send({ message: "User registered!", data: user });
      } catch (error) {
        next(error);
      }
    }
  );
}
