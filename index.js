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

app.use("/api", authRoute);
app.use("/api/job-and-scholarship", jobAndScholarshipRoute);
app.use("/api/notice", noticeRoute);

app.use("/api/v1/health-check", healthCheckRoute);
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
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
});
