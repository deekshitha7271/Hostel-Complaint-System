import { z } from "zod";

export const complaintSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
