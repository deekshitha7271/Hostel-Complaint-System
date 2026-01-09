import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "caretaker"],
    required: true,
    default: "student"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = new mongoose.model(
  "usercollection",
  userSchema
);
