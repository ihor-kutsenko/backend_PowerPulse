import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user-model.js";

// registration
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create({
    ...req.body,
    password: password,
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
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  await User.findByIdAndUpdate(user._id);

  res.json({
    user: {
      email: user.email,
      name: user.name,
      registrationDate: user.createdAt,
    },
  });
};

// logOut
const logOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id);

  res.status(204).json({
    message: "LogOut success",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signIn: ctrlWrapper(signIn),
  logOut: ctrlWrapper(logOut),
};
