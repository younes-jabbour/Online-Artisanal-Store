var express = require("express");
var router = express.Router();
const UsersController = require("../controllers/UsersController");
const GetUserById = require("../controllers/UsersController");
const UpdateUser = require("../controllers/UsersController");

router.post("/register", UsersController.CreateUser);
router.post("/register/artisan", UsersController.CreateArtisan);

router.put("/update/:type/:id", UsersController.UpdateUser);

router.get("/:type/:id", UsersController.GetUserById);

module.exports = router;
