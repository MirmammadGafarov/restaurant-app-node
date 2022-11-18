const express = require("express");
const route = express.Router();
const authController = require("../controller/authController");

route.get("/login", authController.getLogin);
route.post("/login", authController.postLogin);

route.get("/logout", authController.getLogout);

module.exports = route;
