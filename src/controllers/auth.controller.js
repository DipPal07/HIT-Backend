import User from "../models/user.models.js";
import { generateToken } from "../utils/apiAuthentication.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { userRoleEnum } from "../utils/constant.js";
import { emailVerificationMailGeneration, sendMail } from "../utils/mail.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, avatar, password, courseName } = req.body;
    const user = await User.create({
      name,
      email,
      avatar,
      password,
      courseName,
      role: userRoleEnum.STUDENT,
    });
    if (!user) {
      const response = new ApiError(
        400,
        "User registration failed",
        "User not created"
      );
      return res.status(response.statusCode).json(response);
    }
    const emailVerificationToken = await user.generateEmailVerificationToken();
    const emailVerificationURL = `${process.env.BASE_URL}/api/verify-email/${emailVerificationToken}`;

    await sendMail({
      toEmail: user.email,
      subject: "please verify your email",
      mailGenContent: emailVerificationMailGeneration(
        user.name,
        emailVerificationURL
      ),
    });
    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationTokenExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
    user.save();
    const response = new ApiResponse(201, "User registered successfully", user);
    return res.status(200).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    console.log(error);

    return res.status(response.statusCode).json(response);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const response = new ApiError(400, "User not found", "User not found");
      return res.status(response.statusCode).json(response);
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      const response = new ApiError(
        400,
        "Invalid password",
        "Invalid password"
      );
      return res.status(response.statusCode).json(response);
    }
    const token = generateToken({ id: user._id, role: user.role });
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      courseName: user.courseName,
      role: user.role,
    };
    const response = new ApiResponse(200, "User logged in successfully", {
      user: userData,
      token,
    });
    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);

    const user = await User.findOne({
      emailVerificationToken: token,
    });
    console.log(user);

    if (!user) {
      const response = new ApiError(400, "Invalid token", "Invalid token");
      return res.status(response.statusCode).json(response);
    }
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save();
    const response = new ApiResponse(200, "Email verified successfully", null);
    console.log(response);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

export { registerUser, loginUser, verifyEmail };
