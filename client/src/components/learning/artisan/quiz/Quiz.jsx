import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
} from "@material-tailwind/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import api from "../../../pages/api";

function Quiz(props) {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: [{ text: "", isCorrect: false }] },
  ]);

  const id = props.courseId;

  const updateQuestionText = (text, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const updateOptionText = (text, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const toggleCorrectOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].isCorrect =
      !updatedQuestions[questionIndex].options[optionIndex].isCorrect;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    const updatedQuestions = [
      ...questions,
      { text: "", options: [{ text: "", isCorrect: false }] },
    ];
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push({
      text: "",
      isCorrect: false,
    });
    setQuestions(updatedQuestions);
  };

  const DeleteOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.pop();
    setQuestions(updatedQuestions);
  };

  const DeleteQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.pop();
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      quizTitle,
      questions,
    };
    console.log(data);
    console.log(id);

    await api.post(`/quiz/NewQuiz/${id}`, data).then((res) => {
      console.log(res);
      window.alert("Quiz Created Successfully");
    });
  };

  const QuizForm = (
    <Card className="w-full max-w-[40rem] m-auto">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid bg-BrownLight place-items-center rounded-b-none py-8 px-4 text-center"
      >
        <div className="mb-4 rounded-full border bg-BrownDark p-6 text-BrownLight">
          <QuestionMarkCircleIcon className="w-10 h-10" />
        </div>
        <Typography variant="h4" className="text-BrownDark">
          Create Quiz
        </Typography>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-4">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Quiz Title
            </Typography>
            <Input
              type="text"
              value={quizTitle}
              className="!border !border-gray-300 bg-white text-gray-900  shadow-gray-900/5 ring-4 ring-transparent  focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
          </div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <Typography
                variant="small"
                color="blue-gray"
                className="my-[0.1rem]"
              >
                Question number {questionIndex + 1}
              </Typography>
              <br />
              <Input
                color="gray"
                value={question.text}
                onChange={(e) =>
                  updateQuestionText(e.target.value, questionIndex)
                }
                label="Enter Question Text"
              />
              <br />
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <Input
                    type="text"
                    className="!border !border-gray-300 bg-white text-gray-900  shadow-gray-900/5 ring-4 ring-transparent  focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    value={option.text}
                    onChange={(e) =>
                      updateOptionText(
                        e.target.value,
                        questionIndex,
                        optionIndex
                      )
                    }
                    placeholder="Enter Option Text"
                  />
                  <Typography
                    variant="small"
                    className="flex items-center my-1 gap-2"
                  >
                    <span>Correct Option</span>
                    <input
                      type="checkbox"
                      className="w-3 h-3 to-green-400"
                      checked={option.isCorrect}
                      onChange={() =>
                        toggleCorrectOption(questionIndex, optionIndex)
                      }
                    />
                  </Typography>
                </div>
              ))}

              <Button
                variant="filled"
                size="sm"
                className="mt-2"
                onClick={() => addOption(questionIndex)}
              >
                Add Option
              </Button>

              <Button
                variant="outlined"
                color="red"
                size="sm"
                onClick={() => DeleteOption(questionIndex)}
                className="mt-2 mx-2"
              >
                Delete Option
              </Button>
            </div>
          ))}
          <div className="flex justify-between mt-5">
            <Button onClick={addQuestion}>Add Question</Button>
            <Button variant="gradient" color="red" onClick={DeleteQuestion}>
              Delete Question
            </Button>
          </div>
        </form>
      </CardBody>
      <div className="my-4 flex items-center justify-center">
        <Button color="green" onClick={handleSubmit} fullWidth>
          Confirm
        </Button>
      </div>
    </Card>
  );

  return <>{QuizForm}</>;
}

export default Quiz;
