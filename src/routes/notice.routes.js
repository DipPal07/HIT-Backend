import express from "express";
import {
  createNotice,
  getAllNotices,
} from "../controllers/notice.controller.js";
import { noticeValidator } from "../../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { adminRoleVerify } from "../utils/apiAuthentication.js";
import upload from "../middlewares/multer.middlewares.js";

const noticeRoute = express.Router();
noticeRoute.get("/", getAllNotices);
noticeRoute.post(
  "/",
  adminRoleVerify,
  upload.single("pdf"),
  noticeValidator(),
  validate,
  createNotice
);
export default noticeRoute;
