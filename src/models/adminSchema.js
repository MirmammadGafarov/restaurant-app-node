const { Schema, model } = require("mongoose");
const adminSchema = new Schema({
  desk: {
    deskName: String,
  },
  food: {
    foodName: String,
    foodPrice: Number,
  },
});

module.exports = model("Admin", adminSchema);
