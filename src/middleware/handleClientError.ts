import express from "express";
import { MongoError } from "mongodb";
import { Api400Error } from "../services/error.services/api400Error";
import { Api404Error } from "../services/error.services/api404Error";
import { httpStatusCodes } from "../services/error.services/httpStatusCodes";

export function handleClientError(
  error: any,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  if (error instanceof Api404Error) {
    response.status(httpStatusCodes.NOT_FOUND).send(error);
  } else if (error instanceof Api400Error) {
    response.status(httpStatusCodes.BAD_REQUEST).send(error);
  } else if (error instanceof MongoError) {
    response.status(httpStatusCodes.INTERNAL_SERVER).send(error.errmsg);
  } else {
    response.status(httpStatusCodes.INTERNAL_SERVER).send(error);
  }
}
