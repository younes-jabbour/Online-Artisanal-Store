const express = require("express");
var router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/NewQuiz/:id", async (req, res) => {
  const { id } = req.params;
  const { quizTitle, questions } = req.body;

  const quiz = await prisma.quiz.create({
    data: {
      title: quizTitle,
      courseId: parseInt(id),
    },
  });

  for (const questionData of questions) {
    const createdQuestion = await prisma.question.create({
      data: {
        text: questionData.text,
        quizId: quiz.id,
      },
    });

    for (const optionData of questionData.options) {
      await prisma.option.create({
        data: {
          text: optionData.text,
          IsCorrect: optionData.isCorrect,
          questionId: createdQuestion.id,
        },
      }); 
    }
  }
  res.status(200).json({ message: "Quiz created successfully" });
});

router.get("/getQuiz/:id", async (req, res) => {
  const { id } = req.params;

  const quiz = await prisma.quiz.findFirst({
    where: {
      courseId: parseInt(id),
    },
    include: {
      Questions: {
        include: {
          options: true,
        },
      },
    },
  });

  res.status(200).json(quiz);
});

router.delete("/deleteQuiz/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the quiz with the specified ID along with its questions and options
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(id) },
      include: {
        Questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Delete options associated with each question
    for (const question of quiz.Questions) {
      await prisma.option.deleteMany({
        where: { questionId: question.id },
      });
    }

    // Delete questions associated with the quiz
    await prisma.question.deleteMany({
      where: { quizId: quiz.id },
    });

    // Delete the quiz itself
    await prisma.quiz.delete({
      where: { id: quiz.id },
    });

    res
      .status(200)
      .json({ message: "Quiz and its related data deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the quiz" });
  }
});

// get quiz name and id by using course id
router.get("/getQuizName/:courseId", async (req, res) => {
  const { courseId } = req.params;

  const quiz = await prisma.quiz.findMany({
    where: {
      courseId: parseInt(courseId),
    },
    select: {
      id: true,
      title: true,
    },
  });

  res.status(200).json(quiz);
});

module.exports = router;

// get quiz and there questions and ther options related to course by using id of course.

// router.delete("/deleteQuiz/:id", async (req, res) => {
//   const { id } = req.params;

//   const quiz = await prisma.quiz.delete({
//     where: {
//       id: parseInt(id),
//     },
//     include: {
//       Questions: {
//         include: {
//           options: true,
//         },
//       },
//     },
//   });

//   res.status(200).json(quiz);
// });

/*

app.delete('/quizzes/:quizId', async (req, res) => {
  const { quizId } = req.params;

  try {
    // Find the quiz with the specified ID along with its questions and options
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(quizId) },
      include: {
        Questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Delete options associated with each question
    for (const question of quiz.Questions) {
      await prisma.option.deleteMany({
        where: { questionId: question.id },
      });
    }

    // Delete questions associated with the quiz
    await prisma.question.deleteMany({
      where: { quizId: quiz.id },
    });

    // Delete the quiz itself
    await prisma.quiz.delete({
      where: { id: quiz.id },
    });

    res.status(200).json({ message: 'Quiz and its related data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the quiz' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
*/
