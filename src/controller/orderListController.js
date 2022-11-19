require("express-async-errors");

const path = require("path");
const rootDir = require("../util/path");
const Order = require("../models/orderSchema");

exports.getOrderList = (req, res, next) => {
  Order.find({}, function (err, data) {
    const totalPrice = [];

    data.forEach((element) => {
      let calculatedPriceArray = element.food.map((item) =>
        Number(item.calculatedPrice)
      );
      let sumResult = calculatedPriceArray.reduce((part, a) => part + a, 0);
      totalPrice.push(sumResult);
    });

    res.render(path.join(rootDir, "/src/views/orderList"), {
      pageTitle: "Sifarişlər",
      data: data,
      totalPrice: totalPrice,
    });
  });
};

exports.getIndividualOrder = (req, res) => {
  const getRequestedId = req.params.itemId;
  Order.findOne({ _id: getRequestedId }, function (err, data) {
    const calculatedPrice = data.food.map((item) =>
      Number(item.calculatedPrice)
    );

    const totalPrice = calculatedPrice.reduce((part, a) => part + a, 0);

    res.render(path.join(rootDir, "/src/views/individualOrder"), {
      pageTitle: "Sifariş",
      id: getRequestedId,
      deskName: data.deskName,
      finish: data.finish,
      food: data.food,
      status: req.body.status,
      totalPrice: totalPrice,
    });
  });
};

exports.postIndividualOrder = async (req, res) => {
  const getRequestedId = req.params.itemId;

  const food = [];

  const {
    finish,
    totalPrice,
    rowNum,
    foodName,
    quantity,
    calculatedPrice,
    orderTime,
    status,
    pullBack,
  } = req.body;

  if (typeof status == "string") {
    const singleWish = {
      rowNum,
      foodName,
      quantity,
      calculatedPrice,
      orderTime,
      status,
      pullBack,
    };
    food.push(singleWish);
  } else {
    for (let i = 0; i < status.length; i++) {
      const multipleWish = {
        rowNum: rowNum[i],
        foodName: foodName[i],
        quantity: quantity[i],
        calculatedPrice: calculatedPrice[i],
        orderTime: orderTime[i],
        status: status[i],
        pullBack: pullBack[i],
      };
      food.push(multipleWish);
    }
  }

  await Order.updateMany(
    { _id: getRequestedId },
    { finish: finish, food: food, totalPrice: totalPrice }
  );

  res.redirect("/order-list");
};
