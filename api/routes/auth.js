var express = require("express");
var router = express.Router();

const authController = require("../controllers/authController");
const verifyJwtToken = require("../Middlewares/JwtToken");

const posts = {
  name: "John",
  age: 30,
  occupation: "Engineer",
};

router.post("/login", authController.Login);
router.get("/refresh", authController.refresh_token);
router.post("/logout", authController.Logout); 

router.get("/post", verifyJwtToken, (req, res) => {
  res.json(posts);
});

module.exports = router;
