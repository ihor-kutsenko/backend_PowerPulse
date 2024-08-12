import { Router } from "express";

import controller from "../controllers/exercises-controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/", authenticate, controller.listExercises);
router.get("/categories", authenticate, controller.listExercisesCategories);

export default router;
