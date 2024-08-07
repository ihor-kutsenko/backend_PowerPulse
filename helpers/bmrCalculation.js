import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "./HttpError.js";

const bmrCalculation = async (req, res, next) => {
  const { height, currentWeight, birthday, sex, levelActivity } =
    req.body.profileSettings;
  const activityCoefficients = { 1: 1.2, 2: 1.375, 3: 1.55, 4: 1.725, 5: 1.9 };
  const today = new Date().getFullYear();
  const userBirthDay = new Date(birthday).getFullYear();
  const age = today - userBirthDay;
  let bmr;

  if (sex === "male") {
    bmr = Math.round(
      (10 * currentWeight + 6.25 * height - 5 * age + 5) *
        activityCoefficients[levelActivity]
    );
  } else if (sex === "female") {
    bmr = Math.round(
      (10 * currentWeight + 6.25 * height - 5 * age - 161) *
        activityCoefficients[levelActivity]
    );
  } else {
    throw HttpError(400, "Invalid gender");
  }

  req.body.profileSettings = { ...req.body.profileSettings, bmr };
  next();
};

export default ctrlWrapper(bmrCalculation);
