import mongoose, { Schema } from "mongoose";

const classRoutineSchema = new Schema({
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

const ClassRoutine = mongoose.model("ClassRoutine", classRoutineSchema);
export default ClassRoutine;
