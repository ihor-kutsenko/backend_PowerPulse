import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { ProfileSettings } from "../models/profileSettings-model.js";

const profileSettingsValidate = async (req, res, next) => {
  const check = await ProfileSettings.findOne({ owner: req.user.id });
  if (check !== null) throw HttpError(400, "Data has been already added");
  next();
};

export default ctrlWrapper(profileSettingsValidate);
