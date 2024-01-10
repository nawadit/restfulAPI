const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const orderSchema = new Schema({
  noOfProducts: {
    type: Number,
    required: true,
  },
  totalNoOfItems: {
    type: Number,
    required: true,
  },
  itemList: {
    type: Object,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);
const productModel = mongoose.model("Product", productSchema);
const orderModel = mongoose.model("Order", orderSchema);

module.exports = {
  productModel,
  orderModel,
  userModel,
};
