const express = require("express");
const app = express();
const productRouter = require("./api/routes/productRoutes/productRouter");
const orderRouter = require("./api/routes/orderRoutes/orderRouter");
const userRouter = require("./api/routes/userRoutes/userRoute");
const loginRouter = require("./api/routes/loginRouter/loginRoute");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authorization = require("./api/middleware/jwt-auth");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Contol-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
    res.status(200).json({});
    next();
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("./uploads"));

// *************************************connection to database********************
const dbURL =
  "mongodb+srv://spamehereok:spamehereok123@cluster0.xybplbx.mongodb.net/restful-api?retryWrites=true&w=majority";

app.use((req, res, next) => {
  mongoose
    .connect(dbURL)
    .then((result) => {
      console.log(`app.js says ==> connected to the database`);
    })
    .catch((err) => {
      console.log(`app.js says ==> couldnot connect to database`);
    });
  next();
});
// **************************************************************************************

app.use("/product", productRouter);
app.use("/order", authorization, orderRouter);
app.use("/user", userRouter);
app.use("/login", loginRouter);

app.use((req, res) => {
  res.status(400).json({
    message: "incorrect request link",
  });
});

module.exports = app;
