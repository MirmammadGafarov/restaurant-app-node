require("express-async-errors");

const path = require("path");
const rootDir = require("../util/path");
const Order = require("../models/orderSchema");
const Admin = require("../models/adminSchema");

exports.getAddOrder = (req, res, next) => {
  Admin.find({}, function (err, data) {
    res.render(path.join(rootDir, "/src/views/home"), {
      data: data,
      pageTitle: "Sifariş Yarat",
    });
  });
};

exports.postAddOrder = async (req, res, next) => {
  const wishListContainer = {
    deskName: "",
    food: [],
  };

  const {
    deskName,
    rowNum,
    foodName,
    quantity,
    calculatedPrice,
    orderTime,
    status,
    pullBack,
  } = req.body;

  if (typeof deskName == "string") {
    wishListContainer.deskName = deskName;
    const singleWish = {
      rowNum,
      foodName,
      quantity,
      calculatedPrice,
      orderTime,
      status,
      pullBack,
    };
    wishListContainer.food.push(singleWish);
  } else {
    for (let i = 0; i < foodName.length; i++) {
      wishListContainer.deskName = deskName[0];
      const multipleWish = {
        rowNum: rowNum[i],
        foodName: foodName[i],
        quantity: quantity[i],
        calculatedPrice: calculatedPrice[i],
        orderTime: orderTime[i],
        status: status[i],
        pullBack: pullBack[i],
      };
      wishListContainer.food.push(multipleWish);
    }
  }

  const order = new Order({
    deskName: wishListContainer.deskName,
    food: wishListContainer.food,
  });

  await order.save();

  res.redirect("/order-list");
};
