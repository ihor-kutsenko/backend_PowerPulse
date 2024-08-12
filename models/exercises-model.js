import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
  bodyPart: {
    type: String,
  },
  equipment: {
    type: String,
  },
  gifUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  target: {
    type: String,
  },
  burnedCalories: {
    type: Number,
  },
  time: {
    type: Number,
  },
});

const exerciseCategorySchema = new Schema({
  filter: {
    type: String,
  },
  name: {
    type: String,
  },
  imgURL: {
    type: String,
  },
});

export const Exercise = model("exercise", exerciseSchema);
export const ExerciseCategory = model(
  "exercises-categories",
  exerciseCategorySchema
);
