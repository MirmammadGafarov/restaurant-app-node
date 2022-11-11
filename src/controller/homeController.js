const path = require("path");
const rootDir = require("../util/path");

exports.getHome = (req, res, next) => {
  res.render(path.join(rootDir, "/src/views/home"), {
    pageTitle: "Ana Səhifə",
  });
};
