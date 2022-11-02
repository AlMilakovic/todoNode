import fs from "fs";
import getToDos from "./getToDos";

type ToDO = {
  title: string;
  description: string;
  createdDate: string;
  id: string;
};

export async function deleteTodo(id: string) {
  let todos = await getToDos();

  todos = todos.filter((todo: ToDO) => todo.id !== id);

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
