const express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/newEnroll/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { courseId } = req.body;

    // Check if the user and course exist before proceeding
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Create a new enrollment record
    const enrollment = await prisma.enrollment.create({
      data: {
        date: new Date(),
        courseId: parseInt(courseId),
        userId: parseInt(userId),
      },
    });

    // return res.json(enrollment);

    const Lessons_Quiz = await prisma.course.findUnique({
      where: { id: parseInt(courseId) },
      include: {
        lesson: {
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
        },
        quiz: true,
      },
    });

    return res.json(Lessons_Quiz);
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getEnroll/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: parseInt(userId) },
    });

    return res.json(enrollments);
  } catch (error) {
    console.error("Error getting enrollments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getAllEnroll/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await prisma.enrollment.findMany({
      where: { userId: parseInt(userId) },
      include: {
        course: {
          include: {
            lesson: {
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
            },
          },
          include: {
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
        },
      },
    });

    return res.json(enrollments);
  } catch (error) {
    console.error("Error getting enrollments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getEnrollDetails/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollment = await prisma.enrollment.findMany({
      where: { userId: parseInt(userId) },
      include: {
        course: {
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
            User: {
              select: {
                name: true,
                ImgUrl: true,
              },
            },
          },
        },
      },
    });
    return res.json(enrollment);
  } catch (error) {
    console.error("Error getting enrollments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
