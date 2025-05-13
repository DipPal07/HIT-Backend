import Notice from "../models/notice.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    if (!notices || notices.length === 0) {
      const response = new ApiError(
        404,
        "No notices found",
        "No notices found"
      );
      return res.status(response.statusCode).json(response);
    }
    const response = new ApiResponse(
      200,
      "Notices fetched successfully",
      notices.reverse()
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const createNotice = async (req, res) => {
  try {
    const pdfFileURL = `/public/${req.file.filename}`;
    const { noticeNo, date } = req.body;
    const notice = await Notice.create({
      noticeNo,
      date,
      link: pdfFileURL,
    });
    if (!notice) {
      const response = new ApiError(
        400,
        "Notice creation failed",
        "Notice creation failed"
      );
      return res.status(response.statusCode).json(response);
    }
    const response = new ApiResponse(
      201,
      "Notice created successfully",
      notice
    );
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

export { getAllNotices, createNotice };
