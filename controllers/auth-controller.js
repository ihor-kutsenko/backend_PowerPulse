import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user-model.js";

const getAll = async (req, res) => {
  const result = await User.find();
  res.json(result);
};

// const getById = async (req, res) => {
//   const { userId } = req.params;
//   const result = await users.getUserById(userId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }

//   res.json(result);
// };

// const add = async (req, res) => {
//   const result = await users.addUser(req.body);
//   res.status(201).json(result);
// };

// const updateById = async (req, res) => {
//   const { userId } = req.params;
//   const result = await users.updateUser(userId, req.body);
//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }
//   res.json(result);
// };

// const deleteById = async (req, res) => {
//   const { userId } = req.params;
//   const result = await users.removeUser(userId);
//   if (!result) {
//     throw HttpError(404, "Not Found");
//   }

//   res.status(200).json({ message: "user deleted" });
// };

export default {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
};
// -----------------------------------------------------------------------------------
// // registration
// const registration = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw httpError(409, "Email in use");
//   }

//   const newUser = await User.create({
//     ...req.body,
//     password: password,
//     email: email,
//   });

//   res.status(201).json({
//     user: {
//       email: newUser.email,
//       name: newUser.name,
//     },
//   });
// };

// // login
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(401, "Email or password is wrong");
//   }
//   await User.findByIdAndUpdate(user.id);

//   res.json({
//     user: {
//       email: user.email,
//       name: user.name,
//     },
//   });
// };

// // logOut
// const logOut = async (req, res) => {
//   const { id } = req.user;
//   await User.findByIdAndUpdate(id);

//   res.status(204).json({
//     message: "LogOut success",
//   });
// };

// export default {
//   registration: ctrlWrapper(registration),
//   login: ctrlWrapper(login),
//   logOut: ctrlWrapper(logOut),
// };
