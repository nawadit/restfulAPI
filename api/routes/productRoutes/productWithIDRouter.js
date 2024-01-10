const express = require("express");
const router = express.Router();
const { productModel, orderModel } = require("../../../schemas");
const authorization = require("../../middleware/jwt-auth");
const {
  getProductWithID,
  patchProductWithID,
  deleteProductWithID,
} = require("./productControllers");

router.get("/:id", getProductWithID);

router.patch("/:id", authorization, patchProductWithID);

router.delete("/:id", authorization, deleteProductWithID);

router.use((req, res) => {
  res.status(400).json({
    message: "incorrect request type",
  });
});

module.exports = router;
