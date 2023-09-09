const express = require("express");
var router = express.Router();
const multer = require("multer");
const PATH = require("path");
const fs = require("fs");

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

// Create a new lesson for a specific course
// router.post(
//   "/NewLesson/:id",
//   upload.fields([{ name: "images" }, { name: "videos" }]),
//   async (req, res) => {
//     const { title, text, isIntroduction } = req.body;

//     const { id } = req.params;
//     const courseId = parseInt(id);

//     const imageFiles = req.files["images"] || null;
//     const videoFiles = req.files["videos"] || null;

//     if (!imageFiles || !videoFiles) {
//       if (!imageFiles && !videoFiles) {
//         try {
//           const lesson = await prisma.Lesson.create({
//             data: {
//               title: title,
//               desc: text,
//               courseId,
//               IsIntroduction: isIntroduction === "true" ? true : false,
//             },
//           });
//           return res.status(200).send("Lesson created successfully");
//         } catch (error) {
//           console.error(error);
//           return res.status(500).send("Internal server error.");
//         }
//       } else if (!imageFiles) {
//         try {
//           const lesson = await prisma.Lesson.create({
//             data: {
//               title: title,
//               desc: text,
//               courseId,
//               IsIntroduction: isIntroduction === "true" ? true : false,
//             },
//           });

//           const lessonId = lesson.id;

//           const videos = videoFiles.map((file) => {
//             const { filename, path } = file;
//             const videoPath = path.replace(/\\/g, "/");
//             const NewVideoPath = videoPath.replace(
//               "public/images",
//               "http://localhost:5000"
//             );

//             return {
//               filename: filename,
//               path: NewVideoPath,
//             };
//           });

//           const lessonVideos = videos.map(async (video) => {
//             await prisma.LessonVideo.create({
//               data: {
//                 filename: video.filename,
//                 path: video.path,
//                 lessonId,
//               },
//             });
//           });

//           return res.status(200).send("Lesson created successfully");
//         } catch (error) {
//           console.error(error);
//           return res.status(500).send("Internal server error.");
//         }
//       } else if (!videoFiles) {
//         try {
//           const lesson = await prisma.Lesson.create({
//             data: {
//               title: title,
//               desc: text,
//               courseId,
//               IsIntroduction: isIntroduction === "true" ? true : false,
//             },
//           });

//           const lessonId = lesson.id;

//           const images = imageFiles.map((file) => {
//             const { filename, path } = file;
//             const imagePath = path.replace(/\\/g, "/");
//             const NewImagePath = imagePath.replace(
//               "public/images",
//               "http://localhost:5000"
//             );

//             return {
//               filename: filename,
//               path: NewImagePath,
//             };
//           });

//           const lessonImages = images.map(async (image) => {
//             await prisma.LessonImage.create({
//               data: {
//                 filename: image.filename,
//                 path: image.path,
//                 lessonId,
//               },
//             });
//           });

//           return res.status(200).send("Lesson created successfully");
//         } catch (error) {
//           console.error(error);
//           return res.status(500).send("Internal server error.");
//         }
//       }
//     }

//     try {
//       const lesson = await prisma.Lesson.create({
//         data: {
//           title: title,
//           desc: text,
//           courseId,
//           IsIntroduction: isIntroduction === "true" ? true : false,
//         },
//       });

//       const lessonId = lesson.id;

//       const videos = videoFiles.map((file) => {
//         const { filename, path } = file;
//         const videoPath = path.replace(/\\/g, "/");
//         const NewVideoPath = videoPath.replace(
//           "public/images",
//           "http://localhost:5000"
//         );

//         return {
//           filename: filename,
//           path: NewVideoPath,
//         };
//       });

//       const images = imageFiles.map((file) => {
//         const { filename, path } = file;
//         const imagePath = path.replace(/\\/g, "/");
//         const NewImagePath = imagePath.replace(
//           "public/images",
//           "http://localhost:5000"
//         );

//         return {
//           filename: filename,
//           path: NewImagePath,
//         };
//       });

//       const lessonImages = images.map(async (image) => {
//         await prisma.LessonImage.create({
//           data: {
//             filename: image.filename,
//             path: image.path,
//             lessonId,
//           },
//         });
//       });

//       const lessonVideos = videos.map(async (video) => {
//         await prisma.LessonVideo.create({
//           data: {
//             filename: video.filename,
//             path: video.path,
//             lessonId,
//           },
//         });
//       });

//       res.status(200).send("Lesson created successfully");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal server error.");
//     }
//   }
// );

router.post(
  "/NewLesson/:id",
  upload.fields([{ name: "images" }, { name: "videos" }]),
  async (req, res) => {
    const { title, text, isIntroduction } = req.body;
    const { id } = req.params;
    const courseId = parseInt(id);
    const imageFiles = req.files["images"] || [];
    const videoFiles = req.files["videos"] || [];

    try {
      const lesson = await prisma.Lesson.create({
        data: {
          title,
          desc: text,
          courseId,
          IsIntroduction: isIntroduction === "true",
        },
      });

      const lessonId = lesson.id;

      const videos = videoFiles.map((file) => {
        const { filename, path } = file;
        const videoPath = path.replace(/\\/g, "/");
        const newVideoPath = videoPath.replace(
          "public/images",
          "http://localhost:5000"
        );

        return {
          filename,
          path: newVideoPath,
        };
      });

      const images = imageFiles.map((file) => {
        const { filename, path } = file;
        const imagePath = path.replace(/\\/g, "/");
        const newImagePath = imagePath.replace(
          "public/images",
          "http://localhost:5000"
        );

        return {
          filename,
          path: newImagePath,
        };
      });

      const [lessonImages, lessonVideos] = await Promise.all([
        prisma.LessonImage.createMany({
          data: images.map((image) => ({
            filename: image.filename,
            path: image.path,
            lessonId,
          })),
        }),
        prisma.LessonVideo.createMany({
          data: videos.map((video) => ({
            filename: video.filename,
            path: video.path,
            lessonId,
          })),
        }),
      ]);

      res.status(200).send("Lesson created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }
);

// Get all lessons for a specific course

router.get("/GetLessons/:id", async (req, res) => {
  const { id } = req.params;
  const courseId = parseInt(id);

  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        courseId: courseId,
      },
      include: {
        LessonImage: {
          select: {
            filename: true,
            path: true,
          },
        },
        LessonVideo: {
          select: {
            filename: true,
            path: true,
          },
        },
      },
    });

    res.status(200).json(lessons); // Send the lessons data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// delete lesson and its images and videos from the database
router.delete("/DeleteLesson/:id", async (req, res) => {
  const { id } = req.params;
  const lessonId = parseInt(id);

  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const lessonImages = await prisma.lessonImage.findMany({
      where: {
        lessonId: lessonId,
      },
    });

    const lessonVideos = await prisma.lessonVideo.findMany({
      where: {
        lessonId: lessonId,
      },
    });

    const images = lessonImages.map((image) => {
      const { filename } = image;
      const Path = PATH.join(
        __dirname,
        "../public/images/lesson/img",
        filename
      );
      return Path;
    });

    const videos = lessonVideos.map((video) => {
      const { filename } = video;
      const Path = PATH.join(
        __dirname,
        "../public/images/lesson/video",
        filename
      );
      return Path;
    });

    images.forEach((image) => {
      fs.unlinkSync(image);
    });

    videos.forEach((video) => {
      fs.unlinkSync(video);
    });

    await prisma.lessonImage.deleteMany({
      where: {
        lessonId: lessonId,
      },
    });

    await prisma.lessonVideo.deleteMany({
      where: {
        lessonId: lessonId,
      },
    });

    await prisma.CompletedLesson.deleteMany({
      where: {
        lessonId: lessonId,
      },
    });

    await prisma.lesson.delete({
      where: {
        id: lessonId,
      },
    });

    res.status(200).send("Lesson deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// get lesson name by course id

router.get("/GetLessonName/:id", async (req, res) => {
  const { id } = req.params;
  const courseId = parseInt(id);

  try {
    const lesson = await prisma.lesson.findMany({
      where: {
        courseId: courseId,
      },
      select: {
        title: true,
        IsIntroduction: true,
      },
    });
    res.status(200).json(lesson); // Send the lessons data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

//get lesson where Introduction is true
router.get("/GetIntroduction/:id", async (req, res) => {
  const { id } = req.params;
  const courseId = parseInt(id);

  try {
    const lesson = await prisma.lesson.findMany({
      where: {
        courseId: courseId,
        IsIntroduction: true,
      },
      include: {
        LessonImage: {
          select: {
            filename: true,
            path: true,
          },
        },
        LessonVideo: {
          select: {
            filename: true,
            path: true,
          },
        },
      },
    });
    if (!lesson) res.status(404).json({ error: "Lesson not found" });

    res.status(200).json(lesson); // Send the lessons data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

// find if lesson with field isIntroduction is true exists for a course
router.get("/IsIntroduction/:id", async (req, res) => {
  const { id } = req.params;
  const courseId = parseInt(id);

  try {
    const lesson = await prisma.lesson.findMany({
      where: {
        courseId: courseId,
        IsIntroduction: true,
      },
    });

    if (lesson.length > 0) {
      res.status(200).json(true);
    } else {
      res.status(404).json({ "the introduction don't exist": false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
