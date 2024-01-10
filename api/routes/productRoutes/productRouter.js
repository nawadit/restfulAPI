const express = require("express");
const router = express.Router();
const productWithIDRouter = require("./productWithIDRouter");
const { productModel } = require("../../../schemas");
const multer = require("multer");
const authorization = require("../../middleware/jwt-auth");
const { productGet, productPost } = require("./productControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, "./uploads/");
    } else {
      cb(new Error("invalid filetype"));
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString() +
        req.body.productName.replace(/\s+/g, "_") +
        "." +
        file.mimetype.slice(file.mimetype.indexOf("/") + 1),
    );
  },
});
const upload = multer({ storage: storage });

router.get("/", productGet);

router.post("/", authorization, upload.single("productImage"), productPost);

router.use("/", productWithIDRouter);

module.exports = router;
