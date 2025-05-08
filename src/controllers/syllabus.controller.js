// controllers/syllabus.controller.js
import Syllabus from "../models/syllabus.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createSyllabus = async (req, res) => {
  try {
    const { courseName, semester, link } = req.body;
    const existingSyllabus = await Syllabus.findOne({ courseName, semester });
    if (existingSyllabus) {
      const response = new ApiError(
        400,
        "Syllabus already exists",
        "Syllabus already exists"
      );
      return res.status(response.statusCode).json(response);
    }

    const syllabus = await Syllabus.create({ courseName, semester, link });
    if (!syllabus) {
      const response = new ApiError(
        400,
        "Syllabus creation failed",
        "Syllabus creation failed"
      );
      return res.status(response.statusCode).json(response);
    }

    const response = new ApiResponse(
      201,
      "Syllabus created successfully",
      syllabus
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const updateSyllabus = async (req, res) => {
  try {
    const { courseName, semester, link } = req.body;
    const syllabus = await Syllabus.findOneAndUpdate(
      { courseName, semester },
      { link },
      { new: true }
    );

    if (!syllabus) {
      const response = new ApiError(
        404,
        "Syllabus not found",
        "Syllabus not found"
      );
      return res.status(response.statusCode).json(response);
    }

    const response = new ApiResponse(
      200,
      "Syllabus updated successfully",
      syllabus
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const getSyllabusByCourseAndSemester = async (req, res) => {
  try {
    const { courseName, semester } = req.query;
    const syllabus = await Syllabus.findOne({ courseName, semester });

    if (!syllabus) {
      const response = new ApiError(
        404,
        "Syllabus not found",
        "Syllabus not found"
      );
      return res.status(response.statusCode).json(response);
    }

    const response = new ApiResponse(
      200,
      "Syllabus fetched successfully",
      syllabus
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

export { createSyllabus, updateSyllabus, getSyllabusByCourseAndSemester };
