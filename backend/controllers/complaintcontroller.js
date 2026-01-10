import { ComplaintModel } from "../models/complaintmodel.js";
import { createComplaintSchema } from "../validations/complaint.validation.js";
import { updateComplaintSchema } from "../validations/complaint.validation.js";

export const createComplaint = async (req, res) => {
  try {
    const data = createComplaintSchema.parse(req.body);

    const { roomNumber, category, description } = req.body;

    if (!roomNumber || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const complaint = new ComplaintModel({
      studentId: req.user.id,
      ...data,
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint created successfully",
      complaint,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getComplaints = async (req, res) => {
  try {
    const { search, status, category, page = 1, limit = 5 } = req.query;
    let filter = {};

    if (req.user.role === "student") {
      filter.studentId = req.user.id;
    }

    if (search) {
      filter.roomNumber = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const [complaints, total] = await Promise.all([
      ComplaintModel.find(filter)
        .populate("studentId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      ComplaintModel.countDocuments(filter),
    ]);

    res.status(200).json({
      complaints,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = updateComplaintSchema.parse(req.body);

    const complaint = await ComplaintModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Status updated",
      complaint,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }
    res.status(500).json({ error: error.message });
  }
};
