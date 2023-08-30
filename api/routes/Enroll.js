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

// delete a enrollement record of a user from a course

router.delete("/deleteEnroll/:userId/:CourseId", async (req, res) => {
  try {
    const { userId, CourseId } = req.params;

    const enrollment = await prisma.enrollment.findMany({
      where: {
        userId: parseInt(userId),
        courseId: parseInt(CourseId),
      },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    const completedLesson = await prisma.completedLesson.deleteMany({
      where: {
        enrollementId: enrollment.id,
      },
    });

    const enroll = await prisma.enrollment.deleteMany({
      where: {
        userId: parseInt(userId),
        courseId: parseInt(CourseId),
      },
    });
    console.log(enroll);

    return res.json(enroll);
  } catch (error) {
    console.error("Error deleting enrollment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// update isCompleted field of a enrollment record to true

router.put("/updateEnroll/:userId/:CourseId", async (req, res) => {
  try {
    const { userId, CourseId } = req.params;

    const enrollment = await prisma.enrollment.findMany({
      where: {
        userId: parseInt(userId),
        courseId: parseInt(CourseId),
      },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    const enroll = await prisma.enrollment.updateMany({
      where: {
        userId: parseInt(userId),
        courseId: parseInt(CourseId),
      },
      data: {
        isCompleted: true,
      },
    });

    return res.json(true);
  } catch (error) {
    console.error("Error updating enrollment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// get all enrollement with iscompleted true

router.get("/getCompletedEnroll/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: parseInt(userId),
        isCompleted: true,
      },
    });

    return res.json(enrollments);
  } catch (error) {
    console.error("Error getting enrollments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
