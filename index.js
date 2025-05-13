import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/utils/db.js";
import healthCheckRoute from "./src/routes/healthCheck.routes.js";
import { ApiError } from "./src/utils/ApiError.js";
import { ApiResponse } from "./src/utils/apiResponse.js";
import authRoute from "./src/routes/auth.routes.js";
import jobAndScholarshipRoute from "./src/routes/jobAndScholarship.routes.js";
import noticeRoute from "./src/routes/notice.routes.js";
import classRoutineRoute from "./src/routes/classRoutine.routes.js";
import syllabusRoute from "./src/routes/syllabus.routes.js";
import upload from "./src/middlewares/multer.middlewares.js";
import { sendfileto } from "./src/controllers/testing.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Absolute path to userlogo directory
const syllabusAndClassRoutineFilePath = path.join(
  __dirname,
  "public/uploads/syllabusAndClassRoutine"
);

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   "/public",
//   express.static(path.join(__dirname, "public/uploads/syllabusAndClassRoutine"))
// );
app.get("/public/:filename", async (req, res) => {
  const filePath = path.join(
    syllabusAndClassRoutineFilePath,
    req.params.filename
  );

  try {
    // Check if file exists
    await fs.access(filePath);
    res.sendFile(filePath);
  } catch (err) {
    res.status(404).send("File not found");
  }
});

app.use("/api", authRoute);
app.use("/api/job-and-scholarship", jobAndScholarshipRoute);
app.use("/api/notice", noticeRoute);
app.use("/api/class-routine", classRoutineRoute);
app.use("/api/syllabus", syllabusRoute);

app.use("/api/v1/health-check", healthCheckRoute);
app.post("/test", upload.single("pdf"), (req, res) => {
  const { name } = req.body;
  console.log(req.file);
  // res.sendFile(`${req.file.path}/${req.file.filename}`, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).send("Error sending file");
  //   }
  // });

  return res.status(200).json({ message: `Hello ${name}` });
});
app.get("/tt", sendfileto);
app.get("/", (req, res) => {
  try {
    const response = new ApiResponse(200, "Server is running", null);
    return res.status(response.statusCode).json(response);
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error.message));
  }
});

connectDB().then(() => {
  app.listen(process.env.PORT || 3399, () => {
    console.log(`Server is running on ${process.env.BASE_URL}`);
  });
});
