import mongoose from "mongoose";
import { todosSchema } from "../schemas/todos";

export const todo = mongoose.model("todo", todosSchema);
