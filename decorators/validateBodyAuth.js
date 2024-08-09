import HttpError from "../helpers/HttpError.js";

const validateBodyAuth = (schema) => {
  const func = async (req, res, next) => {
    if (
      req.method === "PUT" ||
      (req.method === "POST" && req.baseUrl === "/api/profile-settings")
    ) {
      const { error } = schema.validate(req.body.profileSettings);
      if (error) {
        return next(HttpError(400, error.message));
      }
    } else {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(HttpError(400, error.message));
      }
    }
    next();
  };
  return func;
};

export default validateBodyAuth;
