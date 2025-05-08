import { ApiError } from "./ApiError.js";
import jwt from "jsonwebtoken";
import { userRoleEnum } from "./constant.js";

const studentRoleVerify = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token || !authHeader) {
      const response = new ApiError(
        401,
        "Token not provided",
        [],
        "Unauthorized"
      );
      return res.status(response.statusCode).json(response);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== userRoleEnum.ADMIN) {
      const response = new ApiError(401, "Invalid token", [], "Unauthorized");
      return res.status(response.statusCode).json(response);
    }
    req.user = decoded;
    next();
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};
const adminRoleVerify = (req, res, next) => {
  try {
    // if (!req.headers["authorization"]) {
    //   const response = new ApiError(409, "Token not provided");
    //   console.log(response);

    //   return res.status(response.statusCode).json(response);
    // }
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      const response = new ApiError(
        401,
        "Token not provided",
        [],
        "Unauthorized"
      );

      return res
        .status(response.statusCode)
        .json({ ...response, message: response.message });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded || decoded.role !== userRoleEnum.ADMIN) {
      const response = new ApiError(401, "Invalid token", [], "Unauthorized");
      console.log(response.message);

      return res
        .status(response.statusCode)
        .json({ ...response, message: response.message });
    }
    req.user = decoded;
    next();
  } catch (error) {
    const response = new ApiError(500, "Internal Server Error", error.message);
    return res.status(response.statusCode).json(response);
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export { studentRoleVerify, adminRoleVerify, generateToken };
