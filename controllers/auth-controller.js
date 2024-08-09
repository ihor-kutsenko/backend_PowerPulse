import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import gravatar from "gravatar";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import cloudinary from "../helpers/cloudinary.js";
import User from "../models/user-model.js";
import { ProfileSettings } from "../models/profileSettings-model.js";

const { JWT_SECRET } = process.env;

// registration
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURL,
    email: email,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
      registrationDate: newUser.createdAt,
    },
  });
};

// login
const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is invalid");
  }
  const settings = await ProfileSettings.findOne(
    { owner: user.id },
    "-_id -createdAt -updatedAt -owner"
  );

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is invalid");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      email: user.email,
      name: user.name,
      registrationDate: user.createdAt,
      avatarURL: user.avatarURL,
      profileSettings: settings,
    },
    token: token,
  });
};

// getCurrentUser
const getCurrent = async (req, res) => {
  const { name, email, token, id, createdAt, avatarURL } = req.user;
  const settings = await ProfileSettings.findOne(
    { owner: id },
    "-_id -createdAt -updatedAt -owner"
  );

  res.json({
    user: {
      name: name,
      email: email,
      registrationDate: createdAt,
      avatarURL: avatarURL,
      profileSettings: settings,
    },
    token: token,
  });
};

// logOut
const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Sign Out success",
  });
};

// updateAvatar
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: avatarTempPath } = req.file;
  try {
    const result = await cloudinary.uploader.upload(avatarTempPath);
    await fs.unlink(avatarTempPath);
    await User.findByIdAndUpdate(_id, { avatarURL: result.secure_url });

    res.json({
      avatarURL: result.secure_url,
    });
  } catch (error) {
    console.error("error loading avatar:", error);
    res.status(500).json({ error: "error loading avatar:" });
  }
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
