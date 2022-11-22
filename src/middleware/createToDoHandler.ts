import express from "express";
import { validationResult, ValidationError } from "express-validator";
import { Api400Error } from "../services/error.services/api400Error";
const errorFormatter = ({ msg, param }: ValidationError) => {
  return `${param}: ${msg}`;
};
export function createToDoHandler(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const error = validationResult(request).formatWith(errorFormatter);
  if (!error.isEmpty()) {
    throw new Api400Error(JSON.stringify(error.array()));
  }
  next();
}
