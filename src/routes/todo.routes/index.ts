import { Router } from "express";
import createToDoItem from "./createToDo";
import deleteToDoItem from "./deleteToDo";
import { getToDoItem } from "./getToDo";
import getToDosItems from "./getToDos";

export default function toDoRoutes(): Router {
  const toDoRoutes = Router();

  toDoRoutes.use("/todo", createToDoItem());
  toDoRoutes.use("/todo", getToDosItems());
  toDoRoutes.use("/todo", getToDoItem());
  toDoRoutes.use("/todo", deleteToDoItem());

  return toDoRoutes;
}
