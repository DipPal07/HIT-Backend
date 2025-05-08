import express from "express";
import {
  createSyllabus,
  getSyllabusByCourseAndSemester,
  updateSyllabus,
} from "../controllers/syllabus.controller.js";
import { adminRoleVerify } from "../utils/apiAuthentication.js";
import {
  syllabusFinderValidator,
  syllabusValidator,
} from "../../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";

const syllabusRoute = express.Router();

// Get syllabus by course name and semester via query parameters
syllabusRoute.get(
  "/",
  syllabusFinderValidator(),
  validate,
  getSyllabusByCourseAndSemester
);

// Create a new syllabus (admin only)
syllabusRoute.post(
  "/",
  adminRoleVerify,
  syllabusValidator(),
  validate,
  createSyllabus
);

// Update existing syllabus (admin only)
syllabusRoute.put(
  "/",
  adminRoleVerify,
  syllabusValidator(),
  validate,
  updateSyllabus
);

export default syllabusRoute;
