import express from "express";

import controller from "../controllers/products-controller.js";
import authenticate from "../middlewares/authenticate.js";

const productsRouter = express.Router();

productsRouter.get("/", authenticate, controller.listProducts);
productsRouter.get(
  "/categories",
  authenticate,
  controller.listProductsCategory
);

export default productsRouter;
