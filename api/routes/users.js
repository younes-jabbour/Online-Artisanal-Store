var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../Middleware/authmiddleware')

const UsersController = require("../controllers/UsersController");

router.post("/register",UsersController.CreateUser);

router.post("/register/artisan",UsersController.CreateArtisan);

router.post("/login",UsersController.Login);

router.get("/posts",authenticateToken,UsersController.getPost)

module.exports = router;
