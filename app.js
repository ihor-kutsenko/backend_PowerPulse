import express, { json } from "express";
import cors from "cors";
import logger from "morgan";
import dotenv from "dotenv/config";

import authRouter from "./routes/auth-router.js";
import profileSettingsRouter from "./routes/profileSettings-router.js";
import exercisesRouter from "./routes/exercises-router.js";
import productsRouter from "./routes/products-router.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/profile-settings", profileSettingsRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
