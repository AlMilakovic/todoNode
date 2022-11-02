import { Router } from "express";
import { todoRouter as createToDoItem } from "./createToDo";
import { todoRouter as deleteToDo } from "./deleteToDo";
import { todoRouter as getToDoItem } from "./getToDo";
import { todoRouter as getToDosItems } from "./getToDos";

export default function toDoRoutes(): Router {
  const toDoRoutes = Router();

  toDoRoutes.use("/todo", createToDoItem());
  toDoRoutes.use("/todo", getToDosItems());
  toDoRoutes.use("/todo", getToDoItem());
  toDoRoutes.use("/todo", deleteToDo());

  return toDoRoutes;
}
