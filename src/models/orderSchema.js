const { Schema, model } = require("mongoose");
const orderSchema = new Schema({
  deskName: String,
  finish: {
    type: String,
    default: "Sonlandırılmayıb",
  },
  totalPrice: {
    type: Number,
    default: 0,
  },

  food: [],
});

module.exports = model("Order", orderSchema);
