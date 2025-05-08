import express from "express";
import {
  createJobAndScholarship,
  getAllJobsAndScholarships,
} from "../controllers/jobAndScholarship.controller.js";
import { jobAndScholarshipValidator } from "../../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { adminRoleVerify } from "../utils/apiAuthentication.js";

const jobAndScholarshipRoute = express.Router();

jobAndScholarshipRoute.get("/", getAllJobsAndScholarships);
jobAndScholarshipRoute.post(
  "/",
  adminRoleVerify,
  jobAndScholarshipValidator(),
  validate,
  createJobAndScholarship
);

export default jobAndScholarshipRoute;
