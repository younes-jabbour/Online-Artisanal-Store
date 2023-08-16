const express = require("express");
var router = express.Router();
const multer = require("multer");
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

// create a new product
router.post(
  "/newProduct/:id",
  upload.single("product_img"),
  async (req, res) => {
    const id = req.params.id;
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
          artisanId: parseInt(id),
        },
      });

      res
        .status(200)
        .json({ message: "Product created successfully", CreateProduct });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  }
);

// return all products of a specific artisan
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const products = await prisma.product.findMany({
      where: {
        artisanId: parseInt(id),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        image: {
          select: {
            path: true,
          },
        },
      },
    });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Error getting products" });
  }
});

// return all available products
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        image: {
          select: {
            path: true,
          },
        },
      },
    });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: "Error getting products" });
  }
});

// delete a specific product
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    const deletedImage = await prisma.image.delete({
      where: {
        id: deletedProduct.imageId,
      },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

router.put("/update/:id", upload.single("product_img"), async (req, res) => {
  const id = req.params.id;
  const { name, price, desc, categoryId, imageId } = req.body;
  console.log(name, price, desc, categoryId, imageId);
  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const imagePath = path.replace(/\\/g, "/");
      const NewImagePath = imagePath.replace("public", "http://localhost:5000");
      const updatedImage = await prisma.image.update({
        where: {
          id: parseInt(imageId),
        },
        data: {
          filename: originalname,
          path: NewImagePath,
        },
      });
      const category = await prisma.category.findFirst({
        where: {
          name: categoryId,
        },
      });

      const updatedProduct = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
          price: parseFloat(price),
          desc: desc,
          categoryId: parseInt(category.id),
          imageId: updatedImage.id,
        },
      });

      res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    } else {
      const category = await prisma.category.findFirst({
        where: {
          name: categoryId,
        },
      });
      const updatedProduct = await prisma.product.update({
        where: {
          id: parseInt(id),
        },
        data: {
          name: name,
          price: parseFloat(price),
          desc: desc,
          categoryId: parseInt(category.id),
        },
      });

      res
        .status(200)
        .json({
          message: "Product updated successfully without updating image",
          updatedProduct,
        });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
});

module.exports = router;
