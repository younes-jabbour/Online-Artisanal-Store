const jwt = require("jsonwebtoken");

authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(403);
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, id) => {
    if (err) return res.sendStatus(403);
    req.id = id;
    next();
  });
};


module.exports = {authenticateToken};