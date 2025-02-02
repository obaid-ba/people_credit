const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  tel: {
    type: Number,
  },
  active: {
    type: Boolean,
  },
});
const UserModel = model("users", UserSchema);
module.exports = UserModel;
