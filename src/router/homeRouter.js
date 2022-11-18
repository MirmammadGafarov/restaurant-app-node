const express = require("express");
const route = express.Router();
const homeController = require("../controller/homeController");

route.get("/", homeController.getAddOrder);
route.post("/", homeController.postAddOrder);

module.exports = route;
