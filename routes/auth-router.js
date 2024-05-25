import express from "express";
import ctrl from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.get("/", ctrl.getAll);
authRouter.get("/:userId", ctrl.getById);
authRouter.post("/", ctrl.add);
authRouter.put("/:userId", ctrl.updateById);
authRouter.delete("/:userId", ctrl.deleteById);

export default authRouter;
