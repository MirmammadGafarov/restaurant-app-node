require("dotenv").config();
const express = require("express");

const path = require("path");
const rootDir = require("./src/util/path");
const bodyParser = require("body-parser");
require("./src/config/db");

const session = require("express-session");

const authRouter = require("./src/router/authRouter");
const adminRouter = require("./src/router/adminRouter");
const homeRouter = require("./src/router/homeRouter");
const orderListRouter = require("./src/router/orderListRouter");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const cookieParser = require("cookie-parser");
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(rootDir, "public")));

app.use(function (req, res, next) {
  res.locals.isAuth = req.session.isAuth;
  next();
});
app.use(authRouter);
app.use(adminRouter);
app.use(orderListRouter);
app.use(homeRouter);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT || 3000, async () => {
  console.log("Server started");
});
