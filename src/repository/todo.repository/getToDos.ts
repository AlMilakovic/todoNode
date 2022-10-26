import fs from "fs";

export default async function getToDos() {
  try {
    const toDos: string = await fs.promises.readFile("todos.txt", "utf-8");
    return JSON.parse(`[${toDos}]`);
  } catch (error) {
    return error;
  }
}
