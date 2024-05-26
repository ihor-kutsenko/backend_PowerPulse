import express from "express";
import authController from "../controllers/auth-controller.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import { userAddSchema } from "../schemas/user-schemas.js";

const userAddValidate = validateBody(userAddSchema);

const authRouter = express.Router();

authRouter.get("/", authController.getAll);
// authRouter.get("/:userId", authController.getById);
// authRouter.post("/", isEmptyBody, userAddValidate, authController.add);
// authRouter.put(
//   "/:userId",
//   isEmptyBody,
//   userAddValidate,
//   authController.updateById
// );
// authRouter.delete("/:userId", authController.deleteById);

export default authRouter;
