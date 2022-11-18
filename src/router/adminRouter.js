const express = require("express");
const route = express.Router();
const adminController = require("../controller/adminController");
const isAuth = require("../middleware/auth");

route.get("/admin", isAuth, adminController.getAdmin);
route.post("/admin", isAuth, adminController.postAdmin);

module.exports = route;
