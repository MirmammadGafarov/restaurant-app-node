const express = require("express");
const route = express.Router();
const addOrderController = require("../controller/addOrderController");

route.get("/add-order", addOrderController.getAddOrder);
route.post("/add-order", addOrderController.postAddOrder);

module.exports = route;
