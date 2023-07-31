var express = require('express');
var router = express.Router();
const UsersController = require("../controllers/UsersController");



router.post("/register",UsersController.CreateUser);
router.post("/register/artisan",UsersController.CreateArtisan);


module.exports = router;
