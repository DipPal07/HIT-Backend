// controllers/syllabus.controller.js
import Syllabus from "../models/syllabus.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// const createSyllabus = async (req, res) => {
//   try {
//     const pdfFileURL = `/public/${req.file.filename}`;
//     const { courseName, semester } = req.body;
//     const existingSyllabus = await Syllabus.findOne({ courseName, semester });
//     if (existingSyllabus) {
//       const response = new ApiError(
//         400,
//         "Syllabus already exists",
//         "Syllabus already exists"
//       );
//       return res.status(response.statusCode).json(response);
//     }

//     const syllabus = await Syllabus.create({
//       courseName,
//       semester,
//       link: pdfFileURL,
//     });
//     if (!syllabus) {
//       const response = new ApiError(
//         400,
//         "Syllabus creation failed",
//         "Syllabus creation failed"
//       );
//       return res.status(response.statusCode).json(response);
//     }

//     const response = new ApiResponse(
//       201,
//       "Syllabus created successfully",
//       syllabus
//     );
//     return res.status(response.statusCode).json(response);
//   } catch (error) {
//     const response = new ApiError(500, "Internal Server Error", error.message);
//     return res.status(response.statusCode).json(response);
//   }
// };

const createSyllabus = async (req, res) => {
  try {
    const { courseName, semester } = req.body;
    const pdfFileURL = `/public/${req.file.filename}`;

    // Try to update the existing syllabus or create a new one
    const result = await Syllabus.updateOne(
      { courseName, semester }, // Filter condition
      { $set: { link: pdfFileURL } }, // Update operation
      { upsert: true, new: true } // Insert if not found and return the updated/created document
    );

    // Check if a syllabus was updated or inserted
    if (result.modifiedCount > 0) {
      // Syllabus was updated
      return res
        .status(200)
        .json(new ApiResponse(200, "Syllabus updated successfully", result));
    } else if (result.upsertedCount > 0) {
      // New syllabus was created
      return res
        .status(201)
        .json(new ApiResponse(201, "Syllabus created successfully", result));
    } else {
      // No update or creation occurred
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Syllabus creation or update failed",
            "No changes were made"
          )
        );
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
};

const updateSyllabus = async (req, res) => {
  try {
    const pdfFileURL = `/public/${req.file.filename}`;
    const { courseName, semester } = req.body;
    const syllabus = await Syllabus.findOneAndUpdate(
      { courseName, semester },
      { link: pdfFileURL },
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
