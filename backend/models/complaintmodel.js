import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  studentId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usercollection",
      required: true
    }
  ],

  roomNumber: {
    type: String,
    required: true
  },

  category: {
    type: String,
    enum: ["water", "electricity", "internet", "cleaning"],
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["open", "in-progress", "resolved"],
    default: "open"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const ComplaintModel = new mongoose.model(
  "complaintcollection",
  complaintSchema
);
