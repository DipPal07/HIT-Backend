import mongoose, { Schema } from "mongoose";

const syllabusSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  semester: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Syllabus = mongoose.model("Syllabus", syllabusSchema);
export default Syllabus;
