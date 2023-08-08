const express = require("express");
var router = express.Router();
const multer = require("multer");
// const cloudinary = require("../utils/cloudinary"); // Import the Cloudinary configuration
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const verifyJwtToken = require("../Middlewares/JwtToken");

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("product_img"), async (req, res) => {
  const { name, price, desc, categoryId } = req.body;
  const { originalname, path } = req.file;
  const imagePath = path.replace(/\\/g, "/");
  const NewImagePath = imagePath.replace("public", "http://localhost:5000");
  try {
    const createdImage = await prisma.image.create({
      data: {
        filename: originalname,
        path: NewImagePath,
      },
    });
    // console.log(createdImage);
    const CreateProduct = await prisma.product.create({
      data: {
        name: name,
        price: parseFloat(price),
        desc: desc,
        categoryId: parseInt(categoryId),
        imageId: createdImage.id,
      },
    });

    res
      .status(200)
      .json({ message: "Product created successfully", CreateProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
});

module.exports = router;
