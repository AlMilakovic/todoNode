import fs from "fs";

export default async function getToDos() {
  try {
    const toDos = await fs.promises.readFile("todos.txt", "utf-8");
    return toDos;
  } catch (error) {
    return error;
  }
}
