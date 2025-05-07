import express from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { loginValidator, registerValidator } from "../../validator/index.js";
import {
  loginUser,
  registerUser,
  verifyEmail,
} from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/register", registerValidator(), validate, registerUser);
authRoute.post("/login", loginValidator(), validate, loginUser);
authRoute.get("/verify-email/:token", verifyEmail);

export default authRoute;
