const productModel = require("../../../schemas");

module.exports.productGet = (req, res) => {
  productModel
    .find()
    .select("productName productPrice productImage _id")
    .sort({ createdAt: -1 })
    .then((result) => {
      if (result) {
        res.status(200).json({
          result,
        });
      } else {
        res.status(404).json({
          message: "handling get package requests, no entry found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send("error finding list of products");
    });
};

module.exports.productPost = (req, res, next) => {
  console.log(req.file.path);
  const product = new productModel({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    productImage: "/" + req.file.path,
  });
  product
    .save()
    .then((result) => {
      let responseObject = result;
      res.status(200).json(responseObject);
    })
    .catch((error) => {
      res.status(500).json({
        message: "couldnot save the product to the database",
        error,
      });
    });
};

module.exports.getProductWithID = (req, res) => {
  console.log(`searching for product with id ${req.params.id}`);
  const _id = req.params.id;
  productModel
    .findById(_id)
    .then((product) => {
      res.status(200).json({
        product,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "no entry of that id found",
      });
    });
};

module.exports.patchProductWithID = (req, res) => {
  product = {
    productName: req.body.productName,
    productPrice: req.body.productPrice,
  };
  productModel
    .findByIdAndUpdate(req.params.id, product, { new: true })
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "couldnot update",
      });
    });
};

module.exports.deleteProductWithID = (req, res) => {
  productModel
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.status(200).json({
        message: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "couldnot delete the entry",
      });
    });
};
