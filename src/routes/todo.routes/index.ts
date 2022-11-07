import { Router } from "express";
import { createToDoRouter } from "./createToDo";
import { deleteToDoRouter } from "./deleteToDo";
import { getToDoRouter } from "./getToDo";
import { getToDosRouter } from "./getToDos";

export default function toDoRoutes(): Router {
  const toDoRoutes = Router();

  toDoRoutes.use("/todo", createToDoRouter());
  toDoRoutes.use("/todo", getToDosRouter());
  toDoRoutes.use("/todo", getToDoRouter());
  toDoRoutes.use("/todo", deleteToDoRouter());

  return toDoRoutes;
}
