import express from "express";
import {
  createNotice,
  getAllNotices,
} from "../controllers/notice.controller.js";
import { noticeValidator } from "../../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { adminRoleVerify } from "../utils/apiAuthentication.js";
import upload from "../middlewares/multer.middlewares.js";
import Notice from "../models/notice.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const noticeRoute = express.Router();
noticeRoute.get("/", getAllNotices);
noticeRoute.delete("/:id", adminRoleVerify, async (req, res) => {
  const { id } = req.params;
  try {
    // Assuming you have a deleteNotice function in your controller
    const result = await Notice.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      const response = new ApiError(
        404,
        "Failed to delete notice",
        "Failed to delete notice"
      );
      return res.status(response.statusCode).json(response);
    }

    const response = new ApiResponse(
      200,
      "Notices Deleted Successfully",
      result
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
});
noticeRoute.post(
  "/",
  adminRoleVerify,
  upload.single("pdf"),
  noticeValidator(),
  validate,
  createNotice
);
export default noticeRoute;
