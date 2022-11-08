import express from "express";
import routes from "./routes";
import http from "http";

const app = express();

const port: number = 8082;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

http.createServer(app).listen(port, () => {
  console.log("connected");
});
