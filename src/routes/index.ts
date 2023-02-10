import { Router } from "express";
import toDoRoutes from "./todo.routes";
import userRoutes from "./user.routes";

const routes = Router();

routes.use("/api", toDoRoutes());
routes.use("/api", userRoutes());

export default routes;
