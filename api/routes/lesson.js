const express = require("express");
var router = express.Router();
const multer = require("multer");
const PATH = require("path");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "images") {
      cb(null, "public/images/lesson/img");
    } else if (file.fieldname === "videos") {
      cb(null, "public/images/lesson/video");
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + PATH.extname(file.originalname);
    const newFilename = file.fieldname + "_" + uniqueSuffix;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

router.post(
  "/NewLesson/:id",
  upload.fields([{ name: "images" }, { name: "videos" }]),
  async (req, res) => {
    const { title, text } = req.body;

    const { id } = req.params;
    const courseId = parseInt(id);

    const imageFiles = req.files["images"];
    const videoFiles = req.files["videos"];

    const images = imageFiles.map((file) => {
      const { filename, path } = file;
      const imagePath = path.replace(/\\/g, "/");
      const NewImagePath = imagePath.replace(
        "public/images",
        "http://localhost:5000"
      );

      return {
        filename: filename,
        path: NewImagePath,
      };
    });

    const videos = videoFiles.map((file) => {
      const { filename, path } = file;
      const videoPath = path.replace(/\\/g, "/");
      const NewVideoPath = videoPath.replace(
        "public/images",
        "http://localhost:5000"
      );

      return {
        filename: filename,
        path: NewVideoPath,
      };
    });

    try {
      const lesson = await prisma.Lesson.create({
        data: {
          title: title,
          desc : text,
          courseId,
        },
      });

      const lessonId = lesson.id;

      const lessonImages = images.map(async (image) => {
        await prisma.LessonImage.create({
          data: {
            filename: image.filename,
            path: image.path,
            lessonId,
          },
        });
      });

      const lessonVideos = videos.map(async (video) => {
        await prisma.LessonVideo.create({
          data: {
            filename: video.filename,
            path: video.path,
            lessonId,
          },
        });
      });

      res.status(200).send("Lesson created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }
);

module.exports = router;
