import express from "express";
import { profileSettingsJoiAddSchema } from "../models/profileSettings-model.js";
import validateBodyAuth from "../decorators/validateBodyAuth.js";
import authenticate from "../middlewares/authenticate.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import profileSettingsValidate from "../middlewares/profileSettingsValidate.js";
import bmrCalculation from "../helpers/bmrCalculation.js";
import profileSettingsController from "../controllers/profileSettings-controller.js";

const profileSettingsRouter = express.Router();
const profileSettingsJoiValidate = validateBodyAuth(
  profileSettingsJoiAddSchema
);

profileSettingsRouter.use(authenticate);
profileSettingsRouter.post(
  "/",
  isEmptyBody,
  profileSettingsJoiValidate,
  bmrCalculation,
  profileSettingsValidate,
  profileSettingsController.addProfileSettings
);

profileSettingsRouter.put(
  "/",
  isEmptyBody,
  profileSettingsJoiValidate,
  bmrCalculation,
  profileSettingsController.updateProfileSettings
);

profileSettingsRouter.get("/", profileSettingsController.getProfileSettings);

export default profileSettingsRouter;
