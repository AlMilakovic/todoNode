import getToDos from "../../repository/todo.repository/getToDos";

type ToDO = {
  title: string;
  description: string;
  createdDate: string;
  id: string;
};
export type getToDoOutcome = {
  data: object;
  message: string;
};

export default async function getToDo(id: string): Promise<getToDoOutcome> {
  const todos: [] = (await getToDos()) as [];
  let toDo = null;
  toDo = todos.find((todo: ToDO): boolean => todo.id === id) as any;

  if (!toDo) {
    return { message: "Can not find any todo with provided id", data: {} };
  }

  return { data: toDo, message: "succes" };
}
