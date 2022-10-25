import express, { Application } from "express";
import routes from "./routes";
const app = express();

const port: number = 8082;
const host: string = "localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, host, () => {
  console.log("connected successfully");
  routes(app);
});
