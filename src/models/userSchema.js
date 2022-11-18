const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  userName: String,
  password: String,
});

module.exports = model("User", orderSchema);
