require("dotenv").config();
const express = require("express");
const path = require("path");
const rootDir = require("./src/util/path");
const bodyParser = require("body-parser");
const dbConnection = require("./src/config/db");
const orderListRouter = require("./src/router/orderListRouter");
const homeRouter = require("./src/router/homeRouter");
const adminRouter = require("./src/router/adminRouter");
const addOrderRouter = require("./src/router/addOrderRouter");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use(orderListRouter);
app.use(adminRouter);
app.use(addOrderRouter);
app.use(homeRouter);

const PORT = process.env.PORT;

app.listen(PORT || 5000, async () => {
  console.log("Server started");
});
