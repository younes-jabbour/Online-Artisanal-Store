var express = require("express");
var router = express.Router();
const verifyJwtToken = require("../Middlewares/JwtToken");

const categorieController = require("../controllers/categorieController");

router.get("/", categorieController.getCategories);

module.exports = router;
