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
  
    await Promise.all(
      questions.map(async (question) => {
        const createdQuestion = await prisma.question.create({
          data: {
            text: question.text,
            quizId: quiz.id,
          },
        });
  
        await Promise.all(
          question.options.map(async (option) => {
            await prisma.option.create({
              data: {
                text: option.text,
                 IsCorrect: option.isCorrect,
                questionId: createdQuestion.id,
              },
            });
          })
        );
      })
    );
  
    res.status(200).json({ message: "Quiz created successfully" });
  });
  
module.exports = router;
