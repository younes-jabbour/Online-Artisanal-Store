var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
var prisma = new PrismaClient();

router.post(
  "/newCompletedLesson/:lessonId/:enrollementId",
  async (req, res) => {
    const { lessonId, enrollementId } = req.params;
    try {
      const completedLesson = await prisma.completedLesson.create({
        data: {
          completed: true,
          lessonId: parseInt(lessonId),
          enrollmentId: parseInt(enrollementId),
        },
      });
      res.json(completedLesson);
    } catch (error) {
      res.json(error);
    }
  }
);

// get all completed lessons where enrollmentId = enrollmentId
router.get("/getCompletedLessons/:enrollmentId", async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const completedLessons = await prisma.completedLesson.findMany({
      where: {
        enrollmentId: parseInt(enrollmentId),
      },
    });

    res.json(completedLessons);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
