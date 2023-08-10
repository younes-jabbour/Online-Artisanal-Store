const express = require("express");
var router = express.Router();
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const upload = multer({ dest: "upload/" });

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    console.log(upload);
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Save the Cloudinary URL in the database
    const imageUrl = result.secure_url;

    console.log(imageUrl);

      // const newImage = await prisma.image.create({
      //   data: {
      //     imageUrl,
      //   },
      // });

    res.json(imageUrl);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

module.exports = router;
