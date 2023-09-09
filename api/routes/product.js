const express = require("express");
var router = express.Router();
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const PATH = require("path");
const verifyJwtToken = require("../Middlewares/JwtToken");
const fs = require("fs");

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/product");
  },
  filename: (req, file, cb) => {
    const newFilename = Date.now() + PATH.extname(file.originalname);
    cb(null, newFilename);
    req.newFilename = newFilename;
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
    newFilename = req.newFilename; //////////////////////////////////// nom de l'image
    const imagePath = path.replace(/\\/g, "/");
    const NewImagePath = imagePath.replace("public", "http://localhost:5000");

    try {
      const createdImage = await prisma.image.create({
        data: {
          filename: newFilename,
          path: NewImagePath,
        },
      });
      const CreateProduct = await prisma.product.create({
        data: {
          name: name,
          price: parseFloat(price),
          desc: desc,
          categoryId: parseInt(categoryId),
          imageId: createdImage.id,
          UserId: parseInt(id),
        },
      });

      res.status(200).json({
        message: "Product created successfully",
        CreateProduct,
        createdImage,
      });
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
        UserId: parseInt(id),
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
        category: {
          select: {
            name: true,
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

// get the first tree products
router.get("/first/tree", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      skip: 0,
      take: 3,
      include: {
        image: {
          select: {
            path: true,
          },
        },
        category: {
          select: {
            name: true,
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

  const Productfounded = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      Comment: true,
    },
  });

  if (!Productfounded)
    return res.status(400).json({ error: "Product not found" });

  if (Productfounded.Comment.length > 0) {
    await prisma.comment.deleteMany({
      where: {
        productId: parseInt(id),
      },
    }); // delete all comments of this product
  }

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
    const imagePath = PATH.join(
      __dirname,
      "../public/images/product",
      deletedImage.filename
    );
    fs.unlinkSync(imagePath); // delete image from folder

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
});

router.put("/update/:id", upload.single("product_img"), async (req, res) => {
  const id = req.params.id;
  const { name, price, desc, categoryId, imageId } = req.body;
  newFilename = req.newFilename; //////////////////////////////////// nom de l'image
  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const imagePath = path.replace(/\\/g, "/");
      const NewImagePath = imagePath.replace("public", "http://localhost:5000");

      const previousImage = await prisma.image.findFirst({
        where: {
          id: parseInt(imageId),
        },
      });
      const Path = PATH.join(
        __dirname,
        "../public/images/product",
        previousImage.filename
      );
      console.log(previousImage.filename);
      fs.unlinkSync(Path); // delete image from folder

      const updatedImage = await prisma.image.update({
        where: {
          id: parseInt(imageId),
        },
        data: {
          filename: newFilename,
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

      res.status(200).json({
        message: "Product updated successfully without updating image",
        updatedProduct,
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
});

router.post("/comment/:idProduct/:idUser", async (req, res) => {
  const idProduct = req.params.idProduct;
  const idUser = req.params.idUser;
  const { text, rate } = req.body;
  try {
    const createdComment = await prisma.comment.create({
      data: {
        text: text,
        productId: parseInt(idProduct),
        userId: parseInt(idUser),
        rate: parseInt(rate),
        date: new Date(),
      },
    });
    res
      .status(200)
      .json({ message: "Comment created successfully", createdComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment" });
  }
});

router.get("/comment/:idProduct", async (req, res) => {
  const idProduct = req.params.idProduct;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        productId: parseInt(idProduct),
      },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            ImgUrl: true,
          },
        },
      },
    });
    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error getting comments:", error);
    res.status(500).json({ error: "Error getting comments" });
  }
});

// delete the comment of a specific user of a specific product

router.delete("/comment/delete/:idComment", async (req, res) => {
  const idComment = req.params.idComment;
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: parseInt(idComment),
      },
    });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment" });
  }
});

// update the comment of a specific user of a specific product

router.put("/comment/update/:idProduct/:idUser", async (req, res) => {
  const idProduct = req.params.idProduct;
  const idUser = req.params.idUser;
  const { text, rate } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        productId: parseInt(idProduct),
        userId: parseInt(idUser),
      },
      data: {
        text: text,
        rate: parseInt(rate),
      },
    });
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Error updating comment" });
  }
});

module.exports = router;
