import Joi from "joi";

export const userAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any required": `'name required field`,
  }),
  email: Joi.string().required().messages({
    "any required": `'email required field`,
  }),
});
