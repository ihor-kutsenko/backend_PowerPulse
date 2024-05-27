import express from "express";
import authController from "../controllers/auth-controller.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
// import {
//   userRegistrationJoiSchema,
//   userLoginJoiSchema,
//   userEmailJoiSchema,
// } from "../models/user-model.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.registration);
authRouter.post("/login", isEmptyBody, authController.login);

export default authRouter;
