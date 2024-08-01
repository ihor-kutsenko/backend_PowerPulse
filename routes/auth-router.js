import express from "express";

import authController from "../controllers/auth-controller.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";
import {
  userSignupJoiSchema,
  userSigninJoiSchema,
  // userEmailJoiSchema,
} from "../models/user-model.js";

const userSignupValidate = validateBody(userSignupJoiSchema);
const userSigninValidate = validateBody(userSigninJoiSchema);

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody,
  userSignupValidate,
  authController.signup
);

authRouter.post(
  "/signin",
  isEmptyBody,
  userSigninValidate,
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
