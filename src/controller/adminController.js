require("express-async-errors");

const path = require("path");
const rootDir = require("../util/path");
const Admin = require("../models/adminSchema");

exports.getAdmin = (req, res, next) => {
  res.render(path.join(rootDir, "/src/views/admin"), {
    pageTitle: "Admin Paneli",
  });
};

exports.postAdmin = async (req, res, next) => {
  const { foodName, foodPrice, deskName } = req.body;

  const desk = new Admin({
    desk: {
      deskName,
    },
  });

  const food = new Admin({
    food: {
      foodName,
      foodPrice,
    },
  });

  if (deskName) {
    await desk.save();
  } else {
    await food.save();
  }

  res.redirect("/admin");
};
