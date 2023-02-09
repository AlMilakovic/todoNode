import mongoose from "mongoose";

export const usersSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, minLength: 8, required: true },
});
