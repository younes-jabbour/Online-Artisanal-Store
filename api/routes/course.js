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
            id: true,
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
            ImgUrl: true,
          },
        },
        Enrollment: {
          select: {
            userId: true,
            courseId: true,
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

// get courses with a limit of 4 courses
router.get("/getCourseLimit", async (req, res) => {
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
            ImgUrl: true,
          },
        },
      },
      take: 4,
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

// delete course and there image and the tables that are related to it

router.delete("/deleteCourse/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const courseFind = await prisma.course.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!courseFind) {
      return res.status(404).json({ message: "Course not found" });
    }

    const CourseFounded = await prisma.course.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        lesson: {
          include: {
            LessonVideo: true,
            LessonImage: true,
          },
        },
        Enrollment: {
          include: {
            CompletedLesson: true,
          },
        },
        quiz: {
          include: {
            Questions: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    // Delete lessons
    if (CourseFounded.lesson && CourseFounded.lesson.length > 0) {
      for (let i = 0; i < CourseFounded.lesson.length; i++) {
        const lesson = CourseFounded.lesson[i];

        // Delete lesson images and videos
        for (let j = 0; j < lesson.LessonImage.length; j++) {
          const lessonImage = lesson.LessonImage[j];
          const lessonImageFilePath = PATH.join(
            __dirname,
            "../public/images/lesson/img",
            lessonImage.filename
          );
          fs.unlinkSync(lessonImageFilePath);
        }

        for (let j = 0; j < lesson.LessonVideo.length; j++) {
          const lessonVideo = lesson.LessonVideo[j];
          const lessonVideoFilePath = PATH.join(
            __dirname,
            "../public/images/lesson/video",
            lessonVideo.filename
          );
          fs.unlinkSync(lessonVideoFilePath);
        }

        await prisma.lessonImage.deleteMany({
          where: {
            lessonId: lesson.id,
          },
        });

        await prisma.lessonVideo.deleteMany({
          where: {
            lessonId: lesson.id,
          },
        });

        await prisma.completedLesson.deleteMany({
          where: {
            lessonId: lesson.id,
          },
        });

        await prisma.lesson.delete({
          where: {
            id: lesson.id,
          },
        });
      }
    }
    console.log("Lesson deleted");

    if (
      CourseFounded.quiz &&
      CourseFounded.quiz.Questions &&
      CourseFounded.quiz.Questions.length > 0
    ) {
      for (const question of CourseFounded.quiz.Questions) {
        await prisma.option.deleteMany({
          where: { questionId: question.id },
        });
      }

      // Delete questions associated with the quiz
      await prisma.question.deleteMany({
        where: { quizId: CourseFounded.quiz.id },
      });
    }
    // Delete the quiz itself
    if (CourseFounded.quiz) {
      await prisma.quiz.delete({
        where: { id: CourseFounded.quiz.id },
      });
    }

    // Delete quizzes
    // if (CourseFounded.quiz && CourseFounded.quiz.length > 0) {
    //   for (let i = 0; i < CourseFounded.quiz.length; i++) {
    //     const quiz = CourseFounded.quiz[i];

    //     for (let j = 0; j < quiz.Questions.length; j++) {
    //       const question = quiz.Questions[j];

    //       await prisma.option.deleteMany({
    //         where: {
    //           questionId: question.id,
    //         },
    //       });
    //     }

    //     await prisma.quiz.delete({
    //       where: {
    //         id: quiz.id,
    //       },
    //     });
    //   }
    // }

    console.log("Quiz deleted");

    // Delete enrollments
    if (CourseFounded.Enrollment && CourseFounded.Enrollment.length > 0) {
      for (let i = 0; i < CourseFounded.Enrollment.length; i++) {
        const enrollment = CourseFounded.Enrollment[i];

        await prisma.completedLesson.deleteMany({
          where: {
            enrollmentId: enrollment.id,
          },
        });

        await prisma.enrollment.delete({
          where: {
            id: enrollment.id,
          },
        });
      }
    }
    console.log("Enrollment deleted");

    const deletedImage = await prisma.image.delete({
      where: {
        id: courseFind.imageId,
      },
    });

    const imagePath = PATH.join(
      __dirname,
      "../public/images/course",
      deletedImage.filename
    );
    fs.unlinkSync(imagePath); // delete image from folder

    console.log("Image deleted");

    const deletedCourse = await prisma.course.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "Course deleted successfully",
      deletedCourse,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({
      message: "Error deleting course",
      error,
    });
  }
});

module.exports = router;
