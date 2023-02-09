import mongoose from "mongoose";
import { usersSchema } from "../schemas/users";

export const user = mongoose.model("user", usersSchema);
