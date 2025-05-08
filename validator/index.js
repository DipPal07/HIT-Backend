import { body } from "express-validator";
import {
  availableJobAndScholarship,
  availableUseRoles,
} from "../src/utils/constant.js";
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

const jobAndScholarshipValidator = () => {
  return [
    body("type")
      .notEmpty()
      .withMessage("Title is required")
      .isIn(availableJobAndScholarship)
      .withMessage("Type is not correct"),
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Title must be at least 10 characters"),

    body("description")
      .notEmpty()
      .withMessage("Description is required")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),
    body("applyLink")
      .notEmpty()
      .withMessage("Link is required")
      .trim()
      .isURL()
      .withMessage("Link must be a valid URL"),
    body("image").optional().isURL().withMessage("Image must be a valid URL"),
    body("lastApplyDate")
      .notEmpty()
      .withMessage("Last apply date is required")
      .isDate()
      .withMessage("Last apply date must be a valid date"),
  ];
};

const noticeValidator = () => {
  return [
    body("noticeNo").isNumeric().notEmpty().withMessage("Title is required"),
    body("date")
      .notEmpty()
      .withMessage("Date is required")
      .isDate()
      .withMessage("Date must be a valid date"),
    body("link")
      .notEmpty()
      .withMessage("Link is required")
      .trim()
      .isURL()
      .withMessage("Link must be a valid URL"),
  ];
};

const syllabusValidator = () => {
  return [
    body("courseName")
      .notEmpty()
      .withMessage("Course name is required")
      .trim()
      .isAlpha()
      .withMessage("Course name must be alphabetic")
      .isLength({ min: 3, max: 25 }),
    body("semester")
      .notEmpty()
      .withMessage("Semester is required")
      .trim()
      .isAlpha()
      .withMessage("Semester must be alphabetic"),
    body("link")
      .notEmpty()
      .withMessage("Link is required")
      .trim()
      .isURL()
      .withMessage("Link must be a valid URL"),
  ];
};
const classRoutineValidator = () => {
  return [
    body("courseName")
      .notEmpty()
      .withMessage("Course name is required")
      .trim()
      .isAlpha()
      .withMessage("Course name must be alphabetic")
      .isLength({ min: 3, max: 25 }),
    body("semester")
      .notEmpty()
      .withMessage("Semester is required")
      .trim()
      .isAlpha()
      .withMessage("Semester must be alphabetic"),
    body("link")
      .notEmpty()
      .withMessage("Link is required")
      .trim()
      .isURL()
      .withMessage("Link must be a valid URL"),
  ];
};
export {
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  jobAndScholarshipValidator,
  noticeValidator,
  syllabusValidator,
  classRoutineValidator,
};
