import { Router } from "express";
import createToDoItem from "./createToDo";
import getToDosItems from "./getToDos";

export default function toDoRoutes(): Router {
  const toDoRoutes = Router();

  toDoRoutes.use(createToDoItem());
  toDoRoutes.use(getToDosItems());

  return toDoRoutes;
}
