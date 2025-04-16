import mongoose, { Schema } from "mongoose";
const noticeSchema = new Schema({
  noticeNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
