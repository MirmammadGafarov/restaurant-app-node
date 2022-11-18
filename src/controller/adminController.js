const path = require("path");
const rootDir = require("../util/path");
const Admin = require("../models/adminSchema");

exports.getAdmin = (req, res, next) => {
  if (!req.session.isAuth) {
    return res.redirect("/login");
  }

  res.render(path.join(rootDir, "/src/views/admin"), {
    pageTitle: "Admin Paneli",
    isAuth: req.session.isAuth,
  });
};

exports.postAdmin = (req, res, next) => {
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
    desk.save();
  } else {
    food.save();
  }

  res.redirect("/admin");
};
