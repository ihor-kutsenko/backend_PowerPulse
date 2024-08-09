import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import { ProfileSettings } from "../models/profileSettings-model.js";
import User from "../models/user-model.js";

const addProfileSettings = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await ProfileSettings.create({
    ...req.body.profileSettings,
    owner,
  });
  res.status(201).json(result);
};

const updateProfileSettings = async (req, res) => {
  const { id, _id: owner } = req.user;
  const result = await ProfileSettings.findOneAndUpdate(
    { owner: id },
    req.body.profileSettings,
    { new: true }
  );
  if (result === null) {
    await ProfileSettings.create({ ...req.body.profileSettings, owner });
  }
  const dataResult = await ProfileSettings.findOne(
    { owner: id },
    "-updatedAt -_id -createdAt"
  );

  const userChange = await User.findOneAndUpdate(
    { _id: id },
    { name: req.body.name }
  );
  const user = await User.findOne({ _id: id });
  if (!userChange) throw HttpError(404, "Not Found");

  res.json({
    user: {
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
      registrationDate: user.createdAt,
      profileSettings: dataResult,
    },
  });
};

const getProfileSettings = async (req, res) => {
  const { id } = req.user;
  const result = await ProfileSettings.findOne(
    { owner: id },
    "-updatedAt -_id"
  );
  const user = await User.findOne({ _id: id });

  if (!result || !user) throw HttpError(404, "Not Found");

  res.json({
    user: {
      email: user.email,
      name: user.name,
      avatarURL: user.avatarURL,
      registrationDate: user.createdAt,
      profileSettings: result,
    },
  });
};

export default {
  addProfileSettings: ctrlWrapper(addProfileSettings),
  updateProfileSettings: ctrlWrapper(updateProfileSettings),
  getProfileSettings: ctrlWrapper(getProfileSettings),
};
