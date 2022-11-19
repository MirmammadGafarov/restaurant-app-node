require("express-async-errors");

const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require("path");
const rootDir = require("../util/path");
const User = require("../models/userSchema");

exports.getLogin = async (req, res, next) => {
  await res.render(path.join(rootDir, "/src/views/login"), {
    pageTitle: "Daxil Olun",
  });
};

exports.postLogin = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  User.findOne({ email: userName }, async function (err, userData) {
    if (!userData) {
      return res.render(path.join(rootDir, "/src/views/login"), {
        pageTitle: "Daxil Olun",
        message: "Daxil etdiyiniz login yanlışdır",
      });
    }

    // check password
    const match = await bcrypt.compare(password, userData.password);

    if (match) {
      req.session.isAuth = 1;

      return res.redirect("/admin");
    }

    return res.render(path.join(rootDir, "/src/views/login"), {
      pageTitle: "Daxil Olun",
      message: "Daxil etdiyiniz şifrə yanlışdır",
    });
  });
};

exports.getLogout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/login");
};
