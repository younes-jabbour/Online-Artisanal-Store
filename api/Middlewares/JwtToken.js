const jwt = require("jsonwebtoken");
require("dotenv").config();

// This is the secret key for the access Token.
const secretKey = process.env.ACCESS_SECRET_TOKEN;

const verifyJwtToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. Token is missing." });
  }
  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid token format." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ error: "Token has expired." });
    }
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyJwtToken;

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// // this is the secret key for the acess Token.
// secretKey = process.env.ACCESS_SECRET_TOKEN;

// verifyJwtToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   const [scheme, token] = authHeader.split(" ");

//   if (scheme !== "Bearer" || !token) {
//     return res.sendStatus(401).json({ error: "Invalid token format." });
//   }
//   try {
//     const decoded = jwt.verify(token, secretKey);

//     req.user = decoded;

//     next();
//   } catch (err) {
//     return res.status(403).json({ error: "Invalid token." });
//   }
// };

// module.exports = verifyJwtToken;
