const express = require("express");
const router = express.Router();
const { getOrderByID, deleteOrderByID } = require("./orderControllers");

router.get("/:id", getOrderByID);

router.delete("/:id", deleteOrderByID);

router.use((req, res) => {
  res.status(400).json({
    message: "invalid request type from orderWithIDRouters",
  });
});

module.exports = router;
