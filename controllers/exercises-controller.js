import { Exercise, ExerciseCategory } from "../models/exercises-model.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const listExercisesCategories = async (req, res) => {
  const { page = 1, limit = 10, type } = req.query;
  const skip = (page - 1) * limit;
  const query = { filter: { $regex: type, $options: "i" } };

  const totalRecords = await ExerciseCategory.countDocuments(query);
  const result = await ExerciseCategory.find(query, null, { skip, limit });

  const response = { totalRecords, data: result };
  res.json(response);
};

const listExercises = async (req, res) => {
  const { page = 1, limit = 20, id } = req.query;
  const { name } = await ExerciseCategory.findById(id);
  const categoryRegex = { $regex: name, $options: "i" };
  const query = {
    $or: [
      { bodyPart: categoryRegex },
      { equipment: categoryRegex },
      { name: categoryRegex },
      { target: categoryRegex },
    ],
  };
  const skip = (page - 1) * limit;

  const totalRecords = await Exercise.countDocuments(query);
  const result = await Exercise.find(query, null, { skip, limit });
  const response = { totalRecords, data: result };
  res.json(response);
};

export default {
  listExercisesCategories: ctrlWrapper(listExercisesCategories),
  listExercises: ctrlWrapper(listExercises),
};
