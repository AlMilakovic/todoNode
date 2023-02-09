import { ToDo } from "./types";
import { todo as todoModel } from "../../database/models/todos";

export async function saveToDo(todo: ToDo) {
  return await new todoModel(todo)
    .save()
    .then((data) => {
      return { todo: data, error: null };
    })
    .catch((err) => {
      return { todo: null, error: err };
    });
}

export async function deleteToDo(id: string) {
  return await todoModel
    .deleteOne({ id: id })
    .then((result) => {
      console.log(result);
      return { todo: result, error: null };
    })
    .catch((err) => {
      return { todo: null, error: err };
    });
}
