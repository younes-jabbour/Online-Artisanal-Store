var express = require("express");
var router = express.Router();
const UsersController = require("../controllers/UsersController");
const GetUserById = require("../controllers/UsersController");
const UpdateUser = require("../controllers/UsersController");
const JwtToken = require("../Middlewares/JwtToken");

const multer = require("multer");
const PATH = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/users");
    },
    filename: (req, file, cb) => {
      const newFilename = Date.now() + PATH.extname(file.originalname);
      cb(null, newFilename);
      req.newFilename = newFilename;
    },
  });
  
  const upload = multer({ storage });

router.post("/register", UsersController.CreateUser);
// router.post("/register/artisan", UsersController.CreateArtisan);

router.put("/update/:id",upload.single("image"), UsersController.UpdateUser);

router.get("/:id", UsersController.GetUserById);

module.exports = router;
