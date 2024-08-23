import { Product } from "../models/products-model.js";
import { ProfileSettings } from "../models/profileSettings-model.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const listProductsCategory = async (req, res) => {
  const result = await Product.distinct("category");
  res.json(result);
};

const listProducts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, search, category, recommended } = req.query;
  const skip = (page - 1) * limit;
  const { blood } = await ProfileSettings.findOne({ owner });
  let query = {};

  search && (query.title = { $regex: search, $options: "i" });
  category && (query.category = { $regex: category, $options: "i" });
  recommended && (query[`groupBloodNotAllowed.${blood}`] = recommended);
  query = Object.keys(query).length === 0 ? {} : { $and: [query] };

  const totalRecords = await Product.countDocuments(query);
  const result = await Product.find(query, null, { skip, limit });
  const response = { totalRecords, data: result };
  res.json(response);
};

export default {
  listProductsCategory: ctrlWrapper(listProductsCategory),
  listProducts: ctrlWrapper(listProducts),
};
