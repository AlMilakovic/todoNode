import express from "express";
import routes from "./routes";
const app = express();

const port: number = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => {
  console.log("connected successfully");
});
