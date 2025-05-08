import mongoose, { Schema } from "mongoose";
import { availableJobAndScholarship } from "../utils/constant.js";
const jobAndScholarshipSchema = new Schema({
  type: { type: String, enum: availableJobAndScholarship, required: true },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  lastApplyDate: {
    type: Date,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const JobAndScholarship = mongoose.model(
  "JobAndScholarship",
  jobAndScholarshipSchema
);
export default JobAndScholarship;
