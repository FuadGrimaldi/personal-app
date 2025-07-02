const { required } = require("joi");
const mongoose = require("mongoose");
const { schema } = require("./user.model");
const Schema = mongoose.Schema;

const detailUserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  job: {
    type: String,
    required: [true, "job is required"],
  },
  avatar: {
    type: schema.Types.ObjectId,
    ref: "Image",
    required: [true, "avatar is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.export = mongoose.model("DetailUser", detailUserSchema);
