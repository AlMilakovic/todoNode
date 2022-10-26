import { Router } from "express";
import toDoRoutes from "./todo.routes";

const routes = Router();

routes.use("/api", toDoRoutes());

export default routes;
