import { Router } from "express";
import {
  createComplaint,
  getComplaints,
  updateComplaintStatus
} from "../controllers/complaintcontroller.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = Router();

router.get("/", authMiddleware, getComplaints);
router.post("/", authMiddleware, createComplaint);
router.patch("/:id", authMiddleware, updateComplaintStatus);
router.patch(
  "/:id/status",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "caretaker") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  },
  updateComplaintStatus
);

export default router;
