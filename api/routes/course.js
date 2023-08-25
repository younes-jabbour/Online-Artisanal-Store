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
    cb(null, "public/images/course");
  },
  filename: (req, file, cb) => {
    const newFilename = Date.now() + PATH.extname(file.originalname);
    cb(null, newFilename);
    req.newFilename = newFilename;
  },
});

const upload = multer({ storage });

router.post("/newCourse", upload.single("thumbnail"), async (req, res) => {
  const { title, desc, categoryId, UserId } = req.body;
  const { originalname, path } = req.file;
  newFilename = req.newFilename;
  const imagePath = path.replace(/\\/g, "/");
  const NewImagePath = imagePath.replace("public", "http://localhost:5000");

  try {
    const createdImage = await prisma.image.create({
      data: {
        filename: newFilename,
        path: NewImagePath,
      },
    });
    const CreateCourse = await prisma.course.create({
      data: {
        title: title,
        desc: desc,
        categoryId: parseInt(categoryId),
        imageId: createdImage.id,
        UserId: parseInt(UserId),
      },
    });

    res.status(200).json({
      message: "Course created successfully",
      CreateCourse,
      createdImage,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      message: "Error creating course",
      error,
    });
  }
});

router.get("/getCourse", async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: {
        published: true,
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
        User: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      message: "Error fetching courses",
      error,
    });
  }
});

router.get("/getCourse/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findMany({
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
    res.status(200).json({
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      message: "Error fetching course",
      error,
    });
  }
});

router.put("/publish/:id", async (req, res) => {
  const { id } = req.params;
  const { Changed } = req.body;
  try {
    const course = await prisma.course.update({
      where: {
        id: parseInt(id),
      },
      data: {
        published: Changed,
      },
    });
    res.status(200).json({
      message: "Course published successfully",
      course,
    });
  } catch (error) {
    console.error("Error publishing course:", error);
    res.status(500).json({
      message: "Error publishing course",
      error,
    });
  }
});

module.exports = router;
