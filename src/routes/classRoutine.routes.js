import express from "express";
import {
  createClassRoutine,
  getClassRoutineByClassNameAndSemester,
  updateClassRoutine,
} from "../controllers/classRoutine.controller.js";
import {
  classRoutineFinderValidator,
  classRoutineValidator,
} from "../../validator/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { adminRoleVerify } from "../utils/apiAuthentication.js";

const classRoutineRoute = express.Router();

classRoutineRoute.get(
  "/",
  classRoutineFinderValidator(),
  validate,
  getClassRoutineByClassNameAndSemester
);
classRoutineRoute.post(
  "/",
  adminRoleVerify,
  classRoutineValidator(),
  validate,
  createClassRoutine
);
classRoutineRoute.put(
  "/",
  adminRoleVerify,
  classRoutineValidator(),
  validate,
  updateClassRoutine
);
export default classRoutineRoute;
