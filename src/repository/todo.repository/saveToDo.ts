import fs from "fs";
import getToDos from "./getToDos";

type ToDO = {
  title: string;
  description: string;
  createdDate: string;
  id: string;
};

export async function saveTodo(toDo: ToDO) {
  const todos = await getToDos();

  const todoItem = todos
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
