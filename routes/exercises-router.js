import express from "express";

import controller from "../controllers/exercises-controller.js";
import authenticate from "../middlewares/authenticate.js";

const exercisesRouter = express.Router();

exercisesRouter.get("/", authenticate, controller.listExercises);
exercisesRouter.get(
  "/categories",
  authenticate,
  controller.listExercisesCategories
);

export default exercisesRouter;
