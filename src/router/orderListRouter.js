const express = require("express");
const route = express.Router();
const orderListController = require("../controller/orderListController");

route.get("/order-list", orderListController.getOrderList);
route.get("/order-list/:itemId", orderListController.getIndividualOrder);
route.post("/order-list/:itemId", orderListController.postIndividualOrder);

module.exports = route;
