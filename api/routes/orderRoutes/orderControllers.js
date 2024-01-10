const { orderModel, productModel } = require("../../../schemas");

module.exports.getOrder = (req, res) => {
  orderModel
    .find()
    .sort({ createdAt: -1 })
    .then((data) => {
      if (data) {
        res.status(500).json(data);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "couldnot get orders",
      });
    });
};

module.exports.postOrder = (req, res) => {
  var notInStock = [];
  console.log(`order/post fired`);
  const itemList = req.body;

  let noOfProducts = 0,
    totalNoOfItems = 0;

  productModel
    .find()
    .sort({ createdAt: -1 })
    .then((productList) => {
      console.log(`searched for products`);
      if (!productList) {
        throw new Error("no entry in product list");
      }
      return productList;
    })
    .then((productList) => {
      console.log(`comparing order and available products`);
      productList.forEach((product) => {
        for (const order in itemList) {
          if (itemList[order].productName == product.productName) {
            noOfProducts++;
            totalNoOfItems += itemList[order].productQuantity;
          }
        }
      });
      if (noOfProducts != Object.keys(itemList).length) {
        console.log(
          `One or more items in the order list are not available in our database`,
        );
        throw new Error(
          "One or more items in the order list are not available in our database",
        );
      } else {
        const order = new orderModel({
          noOfProducts,
          totalNoOfItems,
          itemList,
        });
        return order.save();
      }
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports.getOrderByID = (req, res) => {
  orderModel
    .find()
    .then((data) => {
      if (data) {
        const responseObject = {
          data,
          request: {
            type: "GET, DELETE",
            url: "localhost:3000/" + data._id,
          },
        };
        res.status(200).json();
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports.deleteOrderByID = (req, res) => {
  orderModel
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
