import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorsArray = errors.array().map((error) => ({
      [error.path]: error.msg,
    }));
    const response = new ApiError(422, "Validation Error", errorsArray);
    return res.status(response.statusCode).json(response);
  }
  next();
};
