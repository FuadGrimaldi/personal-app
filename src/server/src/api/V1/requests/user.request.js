const Joi = require("joi");

const createUserSchema = Joi.object({
  // account
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),

  // avatar (ObjectId)
  avatar: Joi.string().allow("", null),

  // profile
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  phone: Joi.string().required(),
  job: Joi.string().required(),

  // address
  country: Joi.string().required(),
  province: Joi.string().required(),
  city: Joi.string().required(),
  address_details: Joi.string().required(),

  // optional
  description: Joi.string().allow("", null),
});

module.exports = {
  createUserSchema,
};
