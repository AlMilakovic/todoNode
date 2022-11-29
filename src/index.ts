import "dotenv/config";

import express from "express";
import routes from "./routes";
import http from "http";
import { handleClientError } from "./middleware/handleClientError";
import morgan from "morgan";
import "./database/config/mongoose-config";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("tiny", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

app.use(routes);
app.use(handleClientError);

http.createServer(app).listen(port, () => {
  console.log("connected");
});
