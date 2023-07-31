const jwt = require("jsonwebtoken");
require("dotenv").config();

// this is the secret key for the acess Token.
secretKey = process.env.ACCESS_SECRET_TOKEN;

verifyJwtToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Split the header value by space to get the token
  const [scheme, token] = authHeader.split(" ");

  // Check if the token has the correct Bearer scheme
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format." });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, secretKey);

    // Add the decoded token data to the request object for further use in the route handlers
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyJwtToken;
