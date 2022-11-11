const express = require("express");
const route = express.Router();
const adminController = require("../controller/adminController");

route.get("/admin", adminController.getAdmin);
route.post("/admin", adminController.postAdmin);

module.exports = route;
