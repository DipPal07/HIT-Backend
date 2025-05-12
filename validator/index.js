import { body, query } from "express-validator";
import {
  availableJobAndScholarship,
  availableUseRoles,
  semester,
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
    body("avatar").trim().optional(),
    body("courseName").notEmpty().withMessage("Course name is required").trim(),
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
    body("image").optional(),
    body("lastApplyDate")
      .notEmpty()
      .withMessage("Last apply date is required")
      .isDate()
      .withMessage("Last apply date must be a valid date"),
    body("companyName")
      .notEmpty()
      .withMessage("Company name is required")
      .trim(),
    body("eligibility")
      .notEmpty()
      .withMessage("Eligibility is required")
      .trim(),
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
    // body("link").notEmpty().withMessage("Link is required").trim(),
  ];
};

const syllabusValidator = () => {
  return [
    body("courseName").notEmpty().withMessage("Course name is required").trim(),
    body("semester")
      .notEmpty()
      .withMessage("Semester is required")
      .trim()
      .isAlpha()
      .withMessage("Semester must be alphabetic"),
  ];
};
const classRoutineValidator = () => {
  return [
    body("courseName").notEmpty().withMessage("Course name is required").trim(),
    body("semester")
      .notEmpty()
      .withMessage("Semester is required")
      .trim()
      .isAlpha()
      .withMessage("Semester must be alphabetic")
      .isIn(semester)
      .withMessage("Semester is not correct"),
  ];
};
const classRoutineFinderValidator = () => {
  return [
    query("courseName")
      .notEmpty()
      .withMessage("Course name is required")
      .trim(),
    query("semester")
      .notEmpty()
      .withMessage("Semester is required")
      .trim()
      .isAlpha()
      .withMessage("Semester must be alphabetic")
      .isIn(semester)
      .withMessage("Semester is not correct"),
  ];
};
const syllabusFinderValidator = () => {
  return [
    query("courseName")
      .notEmpty()
      .withMessage("Course name is required")
      .trim(),
    query("semester")
      .notEmpty()
      .withMessage("Semester is required")
      .trim()
      .isAlpha()
      .withMessage("Semester must be alphabetic")
      .isIn(semester)
      .withMessage("Semester is not correct"),
  ];
};
export {
  syllabusFinderValidator,
  registerValidator,
  loginValidator,
  forgotPasswordValidator,
  jobAndScholarshipValidator,
  noticeValidator,
  syllabusValidator,
  classRoutineValidator,
  classRoutineFinderValidator,
};
