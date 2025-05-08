import { ApiError } from "../utils/ApiError.js";

const createClassRoutine = async (req, res) => {
  try {
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const getClassRoutineByClassName = async (req, res) => {
  try {
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};
