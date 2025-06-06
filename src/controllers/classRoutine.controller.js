import ClassRoutine from "../models/classRoutine.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// const createClassRoutine = async (req, res) => {
//   try {
//     const { courseName, semester } = req.body;
//     const existingClassRoutine = await ClassRoutine.findOne({
//       courseName,
//       semester,
//     });
//     if (existingClassRoutine) {
//       const response = new ApiError(
//         400,
//         "Class routine already exists",
//         "Class routine already exists"
//       );
//       return res.status(response.statusCode).json(response);
//     }
//     const pdfFileURL = `/public/${req.file.filename}`;
//     const classRoutine = await ClassRoutine.create({
//       courseName,
//       semester,
//       link: pdfFileURL,
//     });
//     if (!classRoutine) {
//       const response = new ApiError(
//         400,
//         "Class routine creation failed",
//         "Class routine creation failed"
//       );
//       return res.status(response.statusCode).json(response);
//     }
//     const response = new ApiResponse(
//       201,
//       "Class routine created successfully",
//       classRoutine
//     );

//     return res.status(response.statusCode).json(response);
//   } catch (error) {
//     const response = new ApiError(500, "Internal Server Error", error.message);
//     return res.status(response.statusCode).json(response);
//   }
// };
const createClassRoutine = async (req, res) => {
  try {
    const { courseName, semester } = req.body;
    const pdfFileURL = `/public/${req.file.filename}`;

    // Try to update the existing class routine
    const result = await ClassRoutine.updateOne(
      { courseName, semester }, // Filter condition
      { $set: { link: pdfFileURL } }, // Update operation
      { upsert: true, new: true } // Return the updated document
    );

    // Check if a routine was updated or inserted
    if (result.modifiedCount > 0) {
      // Routine was updated
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Class routine updated successfully", result)
        );
    } else if (result.upsertedCount > 0) {
      // New routine was created
      return res
        .status(201)
        .json(
          new ApiResponse(201, "Class routine created successfully", result)
        );
    } else {
      // No update or creation occurred
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            "Class routine creation or update failed",
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

const updateClassRoutine = async (req, res) => {
  try {
    const pdfFileURL = `/public/${req.file.filename}`;
    const { courseName, semester } = req.body;
    const classRoutine = await ClassRoutine.findOneAndUpdate(
      { courseName, semester },
      { link: pdfFileURL },
      { new: true }
    );
    if (!classRoutine) {
      const response = new ApiError(
        404,
        "Class routine not found",
        "Class routine not found"
      );
      return res.status(response.statusCode).json(response);
    }
    const response = new ApiResponse(
      200,
      "Class routine updated successfully",
      classRoutine
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const getClassRoutineByClassNameAndSemester = async (req, res) => {
  try {
    const { courseName, semester } = req.query;
    const classRoutine = await ClassRoutine.findOne({ courseName, semester });
    if (!classRoutine) {
      const response = new ApiError(
        404,
        "Class routine not found",
        "Class routine not found"
      );
      return res.status(response.statusCode).json(response);
    }
    const response = new ApiResponse(
      200,
      "Class routine fetched successfully",
      classRoutine
    );
    setTimeout(() => {
      return res.status(response.statusCode).json(response);
    }, 1000);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

export {
  createClassRoutine,
  getClassRoutineByClassNameAndSemester,
  updateClassRoutine,
};
