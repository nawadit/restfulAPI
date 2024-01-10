const express = require("express");
const router = express.Router();
const orderWithIDRouter = require("./orderWithIDRouter");
const { productModel, orderModel } = require("./../../../schemas");
const { getOrder, postOrder } = require("./orderControllers");

router.get("/", getOrder);

router.post("/", postOrder);

router.use("", orderWithIDRouter);

module.exports = router;
