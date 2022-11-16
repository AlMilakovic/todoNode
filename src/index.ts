import express from "express";
import routes from "./routes";
import http from "http";
import { handleClientError } from "./middleware/handleClientError";

const app = express();

const port: number = 8082;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(handleClientError);

http.createServer(app).listen(port, () => {
  console.log("connected");
});
