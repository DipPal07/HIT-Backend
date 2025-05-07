import { body } from "express-validator";
import { availableUseRoles } from "../src/utils/constant.js";
const registerValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .trim()
      // .isAlpha()
      // .withMessage("Name must be alphabetic")
      .isLength({ min: 3, max: 25 })
      .matches(/^[a-zA-Z\s'-]+$/)
      .withMessage("Name must not contain special characters"),
    body("avatar")
      .trim()
      .optional()
      .isURL()
      .withMessage("Avatar must be a valid URL"),
    body("role")
      .notEmpty()
      .trim()
      .isIn(availableUseRoles)
      .withMessage("role is not correct")
      .isAlpha()
      .withMessage("Role must be alphabetic"),
    body("courseName")
      .notEmpty()
      .withMessage("Course name is required")
      .trim()
      .isAlpha()
      .withMessage("Course name must be alphabetic")
      .isLength({ min: 3, max: 25 }),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .trim()
      .isEmail()
      .withMessage("Email is not valid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
};

const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .trim()
      .isEmail()
      .withMessage("Email is not valid"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
};

const forgotPasswordValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .trim()
      .isEmail()
      .withMessage("Email is not valid"),
  ];
};

export { registerValidator, loginValidator, forgotPasswordValidator };
