import fs from "fs";
import { ToDo } from "./types";

export async function saveTodo(toDo: ToDo) {
  const todos = await getToDos();

  const todoItem = todos.length
    ? `,${JSON.stringify(toDo).trim()}`
    : JSON.stringify(toDo).trim();

  try {
    fs.appendFile("todos.txt", todoItem, "utf-8", (error) => {
      if (error) return { error };
    });
  } catch (error) {
    return { error };
  }
}

export default async function getToDos(): Promise<[ToDo]> {
  const toDos: string = await fs.promises.readFile("todos.txt", "utf-8");
  return JSON.parse(`[${toDos}]`) as [ToDo];
}

export async function deleteTodo(toDo: ToDo) {
  let todos = await getToDos();

  todos = todos.filter((todo: ToDo) => todo.id !== toDo.id) as [ToDo];

  JSON.stringify(todos).replace("[", "").replace("]", "");

  try {
    fs.writeFile(
      "todos.txt",
      JSON.stringify(todos).replace("[", "").replace("]", ""),
      "utf-8",
      (error) => {
        if (error) return { error };
      }
    );
  } catch (error) {
    return { error };
  }
}
