import mongoose from "mongoose";

export const todosSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, unique: true },
  description: { type: String, minLength: 10 },
  createdDate: { type: String },
  userId: { type: String, required: true },
});
