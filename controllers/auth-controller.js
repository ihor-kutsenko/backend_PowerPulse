import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user-model.js";

const { JWT_SECRET } = process.env;

// registration
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
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
    },
    token: token,
  });
};

// getCurrentUser
const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.json({
    user: {
      name: name,
      email: email,
    },
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

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
