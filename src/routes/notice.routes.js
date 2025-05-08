import express from "express";
import {
  createNotice,
  getAllNotices,
} from "../controllers/notice.controller.js";
import { noticeValidator } from "../../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { adminRoleVerify } from "../utils/apiAuthentication.js";

const noticeRoute = express.Router();
noticeRoute.get("/", getAllNotices);
noticeRoute.post(
  "/",
  adminRoleVerify,
  noticeValidator(),
  validate,
  createNotice
);
export default noticeRoute;
