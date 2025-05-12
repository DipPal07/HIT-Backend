import JobAndScholarship from "../models/jobAndScholarship.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getAllJobsAndScholarships = async (req, res) => {
  try {
    const jobs = await JobAndScholarship.find();
    if (!jobs || jobs.length === 0) {
      const response = new ApiError(404, "No jobs found", "No jobs found");
      return res.status(response.statusCode).json(response);
    }
    const response = new ApiResponse(200, "Jobs fetched successfully", jobs);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const createJobAndScholarship = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      lastApplyDate,
      applyLink,
      image,
      companyName,
      eligibility,
    } = req.body;
    const job = await JobAndScholarship.create({
      title,
      description,
      type,
      lastApplyDate,
      applyLink,
      image,
      companyName,
      eligibility,
    });
    if (!job) {
      const response = new ApiError(
        400,
        "Job creation failed",
        "Job creation failed"
      );
      return res.status(response.statusCode).json(response);
    }
    const response = new ApiResponse(201, "Job created successfully", job);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};
export { getAllJobsAndScholarships, createJobAndScholarship };
