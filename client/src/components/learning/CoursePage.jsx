import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Chip,
  Avatar,
  Breadcrumbs,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BookmarkIcon,
  LockClosedIcon,
  CheckIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { PublicApi } from "../pages/api";
import api from "../pages/api";
import axios from "axios";

function CoursePage() {
  // State variable for Accordion
  const { userInfo, Enrollement, completedEnrollement } = useUserContext();
  const { course } = useSelector((state) => state.course);
  const [Mounted, setMounted] = useState(false);

  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpenQuiz = (value) => setOpenQuiz(openQuiz === value ? 0 : value);
  const [openQuiz, setOpenQuiz] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const courseId = course.id;
  const userId = userInfo.id;

  const [isEnrolled, setisEnrolled] = useState(false);
  const [FecthCourse, setFecthCourse] = useState([]);
  const [FetchQuiz, setFetchQuiz] = useState({});
  const [QuizName, setQuizName] = useState({});
  const [Enroll, setEnroll] = useState({});
  // State variables for lessons and images
  const [LessonsNames, setLessonsNames] = useState([]);
  const [LessonIntroduction, setLessonIntroduction] = useState(null);

  const [userResponses, setUserResponses] = useState({});
  const [showScore, setShowScore] = useState(false);

  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [QuizFetched, setQuizFetched] = useState(false); // Fetch quiz after all lessons are completed
  const [isCompleted, setIsCompleted] = useState(false); //PUT request to math that the course is completed

  const [courseCompleted, setcourseCompleted] = useState(false); // Check if course already completed

  useEffect(() => {
    const handleQuizSubmit = async () => {
      try {
        if (quizCompleted) {
          await axios
            .put(
              `http://localhost:5000/enroll/updateEnroll/${userId}/${courseId}`
            )
            .then((res) => setIsCompleted(true))
            .then((res) => {
              setTimeout(() => {
                window.location.reload();
              });
            }, 2000);
        }
      } catch (error) {
        console.log("Error submitting quiz:", error);
      }
    };
    handleQuizSubmit();

    return () => {
      setIsCompleted(false);
    };
  }, [quizCompleted, userId, courseId, isCompleted]);

  const [CompletedLessons, setCompletedLessons] = useState([]);
  const [LessonsNumber, setLessonsNumber] = useState(0);
  const [completedLessonsNumber, setcompletedLessonsNumber] = useState(0);

  // Handle quiz option selection
  const handleOptionSelect = (questionId, selectedOptionId) => {
    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: selectedOptionId,
    }));
  };
  // set number of lessons
  useEffect(() => {
    setLessonsNumber(FecthCourse.length);

    return () => {
      setLessonsNumber(0);
    };
  }, [FecthCourse]);

  // set number of completed lessons
  useEffect(() => {
    setcompletedLessonsNumber(CompletedLessons.length);

    return () => {
      setcompletedLessonsNumber(0);
    };
  }, [completedLessonsNumber, CompletedLessons]);

  // Handle course enrollement
  const handleEnrollement = async () => {
    if (!userInfo.IsConnected)
      return window.alert("You must be logged in to enroll in a course");
    try {
      await axios
        .post(`http://localhost:5000/enroll/newEnroll/${userId}`, { courseId })
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle opening an image in a dialog
  const handleOpenImage = (imagePath) => {
    setSelectedImage(imagePath);
  };

  //Fetching Quiz after enrollement and completed lessons
  useEffect(() => {
    const fetchQuiz = async () => {
      if (
        completedLessonsNumber > 0 &&
        LessonsNumber > 0 &&
        completedLessonsNumber === LessonsNumber
      ) {
        try {
          await api.get(`/quiz/getQuiz/${course.id}`).then((res) => {
            setFetchQuiz(res.data);
            setQuizFetched(true);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchQuiz();
  }, [completedLessonsNumber, LessonsNumber, course.id]);

  // Fetch course data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (course) {
        const promises = [];
        setMounted(true);
        // Fetch lesson names excluding introduction
        if (!isEnrolled) {
          promises.push(
            PublicApi.get(`/lesson/GetLessonName/${course.id}`).then((res) => {
              const filteredLessons = res.data.filter(
                (lesson) => lesson.IsIntroduction === false
              );
              setLessonsNames(filteredLessons);
            })
          );
        } else {
          promises.push(
            api.get(`/lesson/GetLessons/${course.id}`).then((res) => {
              const filteredCourse = res.data.filter(
                (lesson) => lesson.IsIntroduction === false
              );
              setFecthCourse(filteredCourse);
            })
          );

          promises.push(
            api.get(`/quiz/getQuizName/${course.id}`).then((res) => {
              setQuizName(res.data);
            })
          );
          promises.push(
            api
              .get(`/completedLesson/getCompletedLessons/${Enroll.id}`)
              .then((res) => {
                setCompletedLessons(res.data);
              })
          );
        }

        // Fetch introduction lesson in any case
        promises.push(
          PublicApi.get(`/lesson/GetIntroduction/${course.id}`).then((res) => {
            setLessonIntroduction(res.data[0]);
          })
        );

        try {
          await Promise.all(promises);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const foundCourse = Enrollement.find(
        (c) => c.courseId === courseId && c.userId === userId
      );
      const foundCompletedCourse = completedEnrollement.find(
        (enroll) => enroll.courseId === courseId && enroll.userId === userId
      );
      setcourseCompleted(!!foundCompletedCourse);
      console.log("foundCourse", foundCompletedCourse);

      setEnroll(foundCourse);
      setisEnrolled(!!foundCourse);
    };

    fetchData();
    return () => {
      setMounted(false);
      setLessonsNames([]);
      setFecthCourse([]);
      setFetchQuiz([]);
      setLessonIntroduction(null);
    };
  }, [
    courseId,
    Enrollement,
    userId,
    isEnrolled,
    course,
    completedEnrollement,
    courseCompleted,
    Enroll,
  ]);

  // make the lesson as completed in the database in the enrollement db
  const handleLessonCompleted = async (lessonId) => {
    try {
      await api
        .post(`/completedLesson/newCompletedLesson/${lessonId}/${Enroll.id}`)
        .then((res) => {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Breadcrumbs component
  const BreadcrumbsCpt = (
    <Breadcrumbs className="my-5">
      <Link to="/learn">Learn</Link>
      <Link to="/learn/course" className="opacity-60">
        Course
      </Link>
    </Breadcrumbs>
  );

  const QuizAccordion = FetchQuiz ? (
    <div className="mx-16 h-full flex flex-col gap-4">
      <Accordion
        open={openQuiz === 1}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpenQuiz(1)}
          className={`border-b-0 transition-colors ${
            openQuiz === 1 ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          {FetchQuiz && FetchQuiz.title}
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-normal">
          {FetchQuiz &&
            FetchQuiz.Questions &&
            FetchQuiz.Questions.length > 0 &&
            FetchQuiz.Questions.map((question, index) => (
              <div className="mt-10 mx-3" key={index}>
                <Chip
                  variant="ghost"
                  color="blue"
                  className="rounded-lg w-fit mb-5"
                  value={`Question number` + ` ` + `${index + 1}`}
                />
                <span className="ml-2">{question.text}</span>
                <div className="flex flex-col mt-5 gap-1">
                  {question.options.map((option, index) => (
                    <div
                      className={`flex flex-row gap-2 items-center }`}
                      key={option.id}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        id={option.id}
                        value={option.id}
                        checked={userResponses[question.id] === option.id}
                        onChange={() =>
                          handleOptionSelect(question.id, option.id)
                        }
                      />
                      <label
                        className="ml-5 text-sm lowercase"
                        htmlFor={option.id}
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          <div className="flex justify-end">
            {courseCompleted ? (
              <Chip
                value="completed"
                size="lg"
                className="m-2 text-sm"
                variant="ghost"
                color="green"
              />
            ) : (
              <Button
                color="blue"
                variant="gradient"
                className="mt-10 capitalize mr-10 hover:shadow-none flex gap-1 items-center"
                onClick={() => {
                  const score = FetchQuiz.Questions.reduce(
                    (accScore, question) => {
                      const userSelectedOptionId = userResponses[question.id];
                      const correctOptionId = question.options.find(
                        (option) => option.IsCorrect
                      ).id;

                      const isCorrect =
                        userSelectedOptionId === correctOptionId;
                      return isCorrect ? accScore + 1 : accScore;
                    },
                    0
                  );

                  setQuizScore(score);
                  setShowScore(true);
                  setQuizCompleted(score > FetchQuiz.Questions.length / 2); // Set quizCompleted state to true if score is greater than or equal to the number of questions
                  // handleQuizSubmit();
                }}
              >
                {" "}
                Submit
              </Button>
            )}
          </div>

          {/* Display quiz score and completion message */}
          {QuizFetched && showScore && typeof quizScore !== "undefined" && (
            <div className="text-center mt-4">
              <Typography
                variant="h6"
                className={`font-bold ${
                  quizScore > FetchQuiz.Questions.length / 2
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {quizScore > FetchQuiz.Questions.length / 2
                  ? `Congratulations! You scored ${quizScore} out of ${FetchQuiz.Questions.length}.`
                  : `Try again. You scored ${quizScore} out of ${FetchQuiz.Questions.length}.`}
              </Typography>
              {quizCompleted && true && (
                <Chip
                  value="Congratulations 🎉! You have successfully completed the quiz and
                the course as well!"
                  size="lg"
                  variant="ghost"
                  color="green"
                  className="text-sm"
                />
              )}
            </div>
          )}
        </AccordionBody>
      </Accordion>
    </div>
  ) : null;

  // First section of the page

  const FirstSection = course && (
    <div className="mx-16 w-fit h-full flex flex-col gap-4">
      <div className="flex flex-row gap-[24rem]">
        <div className="self-center justify-self-center">
          {/* Display category chip based on course category */}
          <Chip
            size="lg"
            variant="ghost"
            className="mb-[1.5rem] w-fit font-extrabold capitalize "
            value={course.category.name}
            color={
              course.category.name === "Wicker"
                ? "green"
                : course.category.name === "leather"
                ? "orange"
                : course.category.name === "The dinaderie"
                ? "red"
                : course.category.name === "carpets"
                ? "orange"
                : course.category.name === "Ceramics and pottery"
                ? "purple"
                : "gray"
            }
          />
          {/* Display course title */}
          <Typography variant="h1" className="capitalize mb-1 max-w-[35rem]">
            {course && course.title}
          </Typography>
        </div>
        <div className="w-[28rem] m-auto h-60">
          {/* Display course image */}
          <img
            src={course.image.path}
            className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/10"
            alt="CourseImage"
          />
        </div>
      </div>
      <div className="">
        {/* Display course description using ReactQuill */}
        <Typography
          variant="h6"
          className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500 mb-3"
        >
          Course Description
        </Typography>
        <ReactQuill
          value={course.desc}
          className=""
          readOnly={true}
          theme={"bubble"}
        />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Avatar size="md" src={course.User.ImgUrl} alt={course.User.name} />
        <Typography variant="h6" className="capitalize">
          <span className="text-gray-600">Instructor:</span> {course.User.name}
        </Typography>
      </div>
      {Mounted && !isEnrolled ? (
        // Display 'Enroll Now' button if not enrolled
        <Button
          variant="gradient"
          color="blue-gray"
          className="w-fit mt-2 flex gap-1 items-center shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          onClick={handleEnrollement}
        >
          <span>Enroll Now</span>
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      ) : courseCompleted ? (
        <Button
          variant="outlined"
          color="green"
          className="w-fit flex mt-2 gap-1 items-center shadow-none"
        >
          <span>Completed</span>
          <CheckBadgeIcon className="h-5 w-5 ml-1" />
        </Button>
      ) : (
        // Display 'Enrolled' button if already enrolled
        <Button
          variant="outlined"
          color="blue-gray"
          className="w-fit flex mt-2 gap-1 items-center shadow-none"
        >
          <span>enrolled</span>
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  // Title for the second section
  const SectionTwoTitle = (
    <div className="flex justify-between items-center">
      <Typography variant="h4" color="gray" className="my-14 mx-16">
        What you'll learn
      </Typography>
      {/* Display course completion message */}
      {courseCompleted && (
        <div className="mr-10">
          <Chip
            value="Congratulations 🎉! You have successfully completed the quiz and
                the course as well!"
            size="lg"
            variant="ghost"
            color="green"
            className="text-sm p-3"
          />
        </div>
      )}

      {/* Hide progress if quiz is completed */}
      {completedLessonsNumber > 0 && !quizCompleted && !courseCompleted && (
        <div className="mr-20">
          <label htmlFor="file" className="block text-gray-600 mb-2">
            You have completed {completedLessonsNumber} out of {LessonsNumber}{" "}
            lessons
          </label>
          <div className="relative w-full h-4 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 transition-all ease-in-out"
              style={{
                width: `${(completedLessonsNumber / LessonsNumber) * 100}%`,
              }}
            ></div>
            <progress
              id="file"
              className="w-full h-full opacity-0"
              value={completedLessonsNumber}
              max={LessonsNumber}
            ></progress>
          </div>
        </div>
      )}
    </div>
  );
  // Locked lessons in an Accordion
  const LockedAccordion = (
    <div className="mx-16 mb-3">
      {LessonsNames &&
        LessonsNames.length > 0 &&
        LessonsNames.map((lesson) => (
          <Accordion
            className="mb-2 rounded-lg border border-blue-gray-100 px-4"
            icon={<LockClosedIcon className="h-5 w-5" />}
            disabled
          >
            <AccordionHeader className={`border-b-0 transition-colors`}>
              {lesson.title}
            </AccordionHeader>
          </Accordion>
        ))}
    </div>
  );

  const QuizLockedAccordion = (
    <div>
      <div className="mx-16 mb-3">
        <Accordion
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
          icon={<LockClosedIcon className="h-5 w-5" />}
          disabled
        >
          <AccordionHeader className={`border-b-0 transition-colors`}>
            Quiz
          </AccordionHeader>
        </Accordion>
      </div>
    </div>
  );

  // Introduction lesson in an Accordion

  const IntroAccordion = (
    <div>
      {LessonIntroduction ? (
        <div className="mx-16 mt-10 mb-3">
          <Accordion
            open={open === LessonIntroduction.id}
            className="mb-2 rounded-lg border border-blue-gray-100 px-4 duration-75"
          >
            <AccordionHeader
              onClick={() => handleOpen(LessonIntroduction.id)}
              className={`border-b-0 transition-colors ${
                open === LessonIntroduction.id
                  ? "text-blue-500 hover:!text-blue-700"
                  : ""
              }`}
            >
              {LessonIntroduction.title}
            </AccordionHeader>
            <AccordionBody className="pt-0 text-base font-normal">
              {/* Display introduction lesson description */}
              <ReactQuill
                value={LessonIntroduction.desc}
                readOnly={true}
                theme={"bubble"}
              />

              {/* Display images associated with the introduction lesson */}
              {LessonIntroduction.LessonImage &&
                LessonIntroduction.LessonImage.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="small"
                      className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500"
                    >
                      Lesson Images
                    </Typography>
                    <div className="flex flex-row gap-3">
                      {LessonIntroduction.LessonImage.map((image) => (
                        <Card
                          className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                          onClick={() => handleOpenImage(image.path)}
                        >
                          <div className="w-52 h-52">
                            <img
                              src={image.path}
                              className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/70"
                              alt="CourseImage"
                            />
                          </div>
                        </Card>
                      ))}
                      {selectedImage && (
                        <Dialog
                          size="lg"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                          }}
                          open={Boolean(selectedImage)}
                          handler={() => setSelectedImage(null)}
                        >
                          <DialogBody divider={false} className="p-0">
                            <img
                              alt="nature"
                              className="h-full w-full object-cover object-center"
                              src={selectedImage}
                            />
                          </DialogBody>
                        </Dialog>
                      )}
                    </div>
                  </div>
                )}

              {/* Display videos associated with the introduction lesson */}
              {LessonIntroduction.LessonVideo &&
                LessonIntroduction.LessonVideo.length > 0 && (
                  <div className="flex flex-col gap-2 mt-5">
                    <Typography
                      variant="small"
                      className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500"
                    >
                      Lesson Videos
                    </Typography>
                    <div className="flex flex-row gap-3">
                      {LessonIntroduction.LessonVideo.map((video) => (
                        <div className="w-52 h-52">
                          <video
                            src={video.path}
                            className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/10"
                            alt="CourseImage"
                            controls
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </AccordionBody>
          </Accordion>
        </div>
      ) : null}
    </div>
  );

  const LessonAccordion = ({ lesson }) => {
    return (
      <div>
        {lesson ? (
          <div className="mx-16 mb-3">
            <Accordion
              open={open === lesson.id}
              className="mb-2 rounded-lg border border-blue-gray-100 px-4 duration-75"
            >
              <AccordionHeader
                onClick={() => handleOpen(lesson.id)}
                className={`border-b-0 transition-colors ${
                  open === lesson.id ? "text-blue-500 hover:!text-blue-700" : ""
                }`}
              >
                {lesson.title}
              </AccordionHeader>
              <AccordionBody className="pt-0 text-base font-normal">
                {/* Display introduction lesson description */}
                <ReactQuill
                  value={lesson.desc}
                  readOnly={true}
                  theme={"bubble"}
                />

                {/* Display images associated with the introduction lesson */}
                {lesson.LessonImage && lesson.LessonImage.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <Typography
                      variant="small"
                      className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500"
                    >
                      Lesson Images
                    </Typography>
                    <div className="flex flex-row gap-3">
                      {lesson.LessonImage.map((image) => (
                        <Card
                          className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                          onClick={() => handleOpenImage(image.path)}
                        >
                          <div className="w-52 h-52">
                            <img
                              src={image.path}
                              className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/70"
                              alt="CourseImage"
                            />
                          </div>
                        </Card>
                      ))}
                      {selectedImage && (
                        <Dialog
                          size="lg"
                          animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0.9, y: -100 },
                          }}
                          open={Boolean(selectedImage)}
                          handler={() => setSelectedImage(null)}
                        >
                          <DialogBody divider={false} className="p-0">
                            <img
                              alt="nature"
                              className="h-full w-full object-cover object-center"
                              src={selectedImage}
                            />
                          </DialogBody>
                        </Dialog>
                      )}
                    </div>
                  </div>
                )}

                {/* Display videos associated with the introduction lesson */}
                {lesson.LessonVideo && lesson.LessonVideo.length > 0 && (
                  <div className="flex flex-col gap-2 mt-5">
                    <Typography
                      variant="small"
                      className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500"
                    >
                      Lesson Videos
                    </Typography>
                    <div className="flex flex-row gap-3">
                      {lesson.LessonVideo.map((video) => (
                        <div className="w-52 h-52">
                          <video
                            src={video.path}
                            className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/10"
                            alt="CourseImage"
                            controls
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-end">
                  {!CompletedLessons.find(
                    (CompletedLesson) => CompletedLesson.lessonId === lesson.id
                  ) && true ? (
                    <Button
                      color="blue"
                      variant="gradient"
                      className="mt-10 capitalize mr-10 hover:shadow-none flex gap-1 items-center"
                      onClick={() => handleLessonCompleted(lesson.id)}
                    >
                      {/* <TrashIcon className="h-4 w-4 m-0 p-0" /> */}
                      <span>Mark as completed</span>
                    </Button>
                  ) : (
                    <Chip
                      size="lg"
                      variant="ghost"
                      value="completed"
                      color="green"
                    />
                  )}
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      {BreadcrumbsCpt}
      {/* Display FirstSection */}
      {course && FirstSection}
      {/* Display SectionTwoTitle */}
      {SectionTwoTitle}
      {/* Display IntroAccordion if there is an introduction lesson */}
      {LessonIntroduction ? IntroAccordion : null}
      {/* Display LockedAccordion */}
      {!isEnrolled && LockedAccordion}
      {FecthCourse &&
        FecthCourse.map((lesson) => <LessonAccordion lesson={lesson} />)}
      {!QuizFetched && QuizLockedAccordion}
      {QuizFetched && QuizAccordion}
    </div>
  );
}

export default CoursePage;
