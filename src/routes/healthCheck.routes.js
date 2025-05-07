import express from "express";
import { ApiResponse } from "../utils/apiResponse.js";

const healthCheckRoute = express.Router();

healthCheckRoute.get("/", (req, res) => {
  // const response = new ApiResponse(200, "Server is running", null);
  res.status(response.statusCode).json(response);
});

export default healthCheckRoute;
