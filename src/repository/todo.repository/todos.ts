import { ToDo } from "./types";

export let todos: ToDo[] = [];

export const setTodos = (newTodos: ToDo[]) => {
  todos = newTodos;
};
