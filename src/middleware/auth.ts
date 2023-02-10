import express from "express";

export function authorizationHandler(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  if (!request.session?.userId) {
    return response.status(401).send({ msg: "User  not loged in!" });
  }

  next();
}
