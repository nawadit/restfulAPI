// const jwt = require("jsonwebtoken");
// module.exports = (req, res, next) => {
//   try {
//     const token = jwt.verify(
//       req.headers.authorization.split("")[1],
//       process.env.jsonWebTokenKey
//     );
//     req.userData = token;
//     next();
//   } catch (error) {
//     res.status(404).json({ message: "auth failed 5", error });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.jsonWebTokenKey,
    );

    // Attach the decoded token to the request for further use if needed
    req.userData = decodedToken;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed", error });
  }
};
