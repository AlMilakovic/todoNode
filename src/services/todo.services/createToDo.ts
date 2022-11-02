import { v4 as uuidv4 } from "uuid";

type Body = { title: string; description: string };
type ToDO = {
  title: string;
  description: string;
  createdDate: string;
  id: string;
};

export function validateBody(body: Body) {
  if (!body) {
    return { error: "Missing body" };
  }
  if (!body.title) {
    return { error: "Missing title" };
  }
  if (!body.description) {
    return { error: "Missing description" };
  }
}

export function createToDoObject(title: string, description: string) {
  const id = uuidv4();
  const createdDate = new Date().toUTCString();
  const toDo: ToDO = {
    title,
    description,
    id,
    createdDate,
  };
  return toDo;
}