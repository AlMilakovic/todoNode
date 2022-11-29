import mongoose from "mongoose";

export const todosSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String },
  description: { type: String },
  createdDate: { type: String },
});
