import "dotenv/config";

import express from "express";
import routes from "./routes";
import http from "http";
import { handleClientError } from "./middleware/handleClientError";
import morgan from "morgan";
import "./database/config/mongoose-config";
import cors from "cors";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import { Redis } from "ioredis";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(sessions);
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  credentials: true,
};

const app = express();

const port = process.env.PORT;
const redisClient = new Redis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
const fiveHours = 1000 * 60 * 60 * 5;
const sessionKey = process.env.SESSION_KEY;

app.use(
  sessions({
    store: new RedisStore({ client: redisClient }),
    secret: sessionKey as string,
    saveUninitialized: false,
    cookie: {
      maxAge: fiveHours,

      sameSite: true,
      secure: false,
      httpOnly: false,
    },
  })
);
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(routes);
app.use(handleClientError);

http.createServer(app).listen(port, () => {
  console.log("connected");
});

export default app;
