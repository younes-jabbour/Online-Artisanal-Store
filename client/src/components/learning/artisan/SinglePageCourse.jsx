import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Breadcrumbs,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Link } from "react-router-dom";
import LessonForm from "./LessonForm";
import api from "../../pages/api";
import Quiz from "./quiz/Quiz";
import { CheckBadgeIcon, TrashIcon } from "@heroicons/react/24/outline";

function SinglePageCourse() {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = {
    toolbar: toolbarOptions,
  };
  const [idDeleted, setidDeleted] = useState();
  const [open, setOpen] = React.useState();
  const [openQuiz, setOpenQuiz] = React.useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [openAttentionDrawer, setOpenAttentionDrawer] = useState(false);
  const [name, setname] = useState("");

  const handleOpenAttentionDrawer = () =>
    setOpenAttentionDrawer(!openAttentionDrawer);

  const handleOpenImage = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const handleOpenQuiz = (value) => setOpenQuiz(openQuiz === value ? 0 : value);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const { id, course } = useSelector((state) => state.course);
  const [Selected, setSelected] = useState(1);
  const [Mounted, setMounted] = useState(false);
  const [Lessons, setLessons] = useState([]);
  const [QuizFetch, setQuiz] = useState({});

  const [Intro, setIntro] = useState([]);

  const handleDeleteLesson = (id) => async () => {
    try {
      await api.delete(`/lesson/DeleteLesson/${id}`).then((res) => {
        handleOpenAttentionDrawer();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteQuiz = (id) => async () => {
    try {
      await api.delete(`/quiz/DeleteQuiz/${id}`).then((res) => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const FetchLessons = async () => {
      setMounted(true);

      await api.get(`/lesson/GetLessons/${id}`).then((res) => {
        setLessons(
          res.data.filter((lesson) => lesson.IsIntroduction === false)
        );
        setIntro(res.data.find((lesson) => lesson.IsIntroduction === true));
        console.log(res.data);
      });
    };
    FetchLessons();
    return () => {
      setMounted(false);
    };
  }, [Mounted, id]);

  useEffect(() => {
    const FetchQuiz = async () => {
      setMounted(true);

      await api.get(`/quiz/GetQuiz/${id}`).then((res) => {
        setQuiz(res.data);
      });
    };
    FetchQuiz();
    return () => {
      setMounted(false);
      setQuiz([]);
    };
  }, [Mounted, id]);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

  const CUSTOM_ANIMATION = {
    mount: { scale: 1 },
    unmount: { scale: 1 },
    // transition: {
    //   type: "spring",
    //   damping: 20,
    //   stiffness: 100,
    // },

    // //make it slow
    // duration: 0.5,
  };

  const AttentionDialog = (
    <Dialog open={openAttentionDrawer} handler={handleOpenAttentionDrawer}>
      <DialogHeader>
        <Typography variant="h5" className=" m-auto" color="blue-gray">
          Your Attention is Required!
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-16 w-16 text-red-500"
        >
          <path
            fillRule="evenodd"
            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
            clipRule="evenodd"
          />
        </svg>
        <Typography color="red" className="" variant="h4">
          You should read this!
        </Typography>
        <Typography className="text-center font-normal">
          Before you proceed, just wanted to make sure you're absolutely sure
          about deleting the {name}
        </Typography>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button
          variant="text"
          color="blue-gray"
          onClick={handleOpenAttentionDrawer}
        >
          close
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={
            name === "lesson"
              ? handleDeleteLesson(idDeleted)
              : handleDeleteQuiz(idDeleted)
          }
        >
          Ok, i confirme
        </Button>
      </DialogFooter>
    </Dialog>
  );

  const IntroAccordion = (
    <div>
      {Intro && (
        <div key={Intro.id}>
          <Accordion
            open={open === Intro.id}
            icon={<Icon id={Intro.id} open={open} />}
            className="mb-2 rounded-lg border border-blue-gray-100 px-4 duration-75"
            animate={CUSTOM_ANIMATION}
          >
            <AccordionHeader
              onClick={() => handleOpen(Intro.id)}
              className={`border-b-0 transition-colors ${
                open === Intro.id ? "text-blue-500 hover:!text-blue-700" : ""
              }`}
            >
              {Intro.title}
            </AccordionHeader>
            <AccordionBody className="pt-0 text-base font-normal">
              <ReactQuill
                modules={modules}
                value={Intro.desc}
                readOnly={true}
                theme={"bubble"}
              />

              {Intro.LessonImage && Intro.LessonImage.length > 0 && (
                <div className="flex flex-col gap-2">
                  <Typography
                    variant="small"
                    className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500"
                  >
                    Lesson Images
                  </Typography>
                  <div className="flex flex-row gap-3">
                    {Intro.LessonImage.map((image) => (
                      <>
                        <Card
                          className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                          onClick={() => handleOpenImage(image.path)}
                        >
                          <div className="w-52 h-52">
                            <img
                              src={image.path}
                              className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/70  "
                              alt="CourseImage"
                            />
                          </div>
                        </Card>
                      </>
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
              {Intro.LessonVideo && Intro.LessonVideo.length > 0 && (
                <div className="flex flex-col gap-2 mt-5">
                  <Typography
                    variant="small"
                    className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500"
                  >
                    Lesson Videos
                  </Typography>
                  <div className="flex flex-row gap-3">
                    {Intro.LessonVideo.map((video) => (
                      <div className="w-52 h-52">
                        <video
                          src={video.path}
                          className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/10  "
                          alt="CourseImage"
                          controls
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  color="red"
                  variant="gradient"
                  className="mt-10 capitalize mr-10 hover:shadow-none flex gap-1 items-center"
                  // onClick={handleDeleteLesson(Intro.id)}
                  onClick={() => {
                    handleOpenAttentionDrawer();
                    setidDeleted(Intro.id);
                    setname("lesson");
                  }}
                >
                  <TrashIcon className="h-4 w-4 m-0 p-0" />
                  <span className="font-normal">Delete</span>
                </Button>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      )}
    </div>
  );

  const DefaultAccordion = (
    <div>
      {Lessons &&
        Lessons.map((lesson) => (
          <div key={lesson.id}>
            <Accordion
              open={open === lesson.id}
              icon={<Icon id={lesson.id} open={open} />}
              className="mb-2 rounded-lg border border-blue-gray-100 px-4 duration-75"
              animate={CUSTOM_ANIMATION}
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
                <ReactQuill
                  modules={modules}
                  value={lesson.desc}
                  readOnly={true}
                  theme={"bubble"}
                />

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
                        <>
                          <Card
                            className="cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
                            onClick={() => handleOpenImage(image.path)}
                          >
                            <div className="w-52 h-52">
                              <img
                                src={image.path}
                                className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/70  "
                                alt="CourseImage"
                              />
                            </div>
                          </Card>
                        </>
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
                            className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/10  "
                            alt="CourseImage"
                            controls
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-end">
                  <Button
                    color="red"
                    variant="gradient"
                    className="mt-10 capitalize mr-10 hover:shadow-none flex gap-1 items-center"
                    // onClick={Delete(lesson.id)}
                    onClick={() => {
                      handleOpenAttentionDrawer();
                      setidDeleted(lesson.id);
                      setname("lesson");
                    }}
                  >
                    <TrashIcon className="h-4 w-4 m-0 p-0" />
                    <span className="font-normal">Delete</span>
                  </Button>
                </div>
              </AccordionBody>
            </Accordion>
          </div>
        ))}
    </div>
  );

  const BreadcrumbsCpt = (
    <Breadcrumbs className="my-5">
      <Link to="/profile" className="opacity-60">
        Profile
      </Link>
      <Link to="/profile/course" className="opacity-60">
        Courses
      </Link>
      <Link to="/profile/course/lessons">lesson</Link>
    </Breadcrumbs>
  );

  const side_bar = (
    <Card className="h-fit w-full rounded max-w-[16rem] p-4 shadow-xl border-[1px] border-solid border-blue-gray-900 shadow-blue-gray-900/5">
      <List>
        <ListItem
          ripple={false}
          selected={Selected === 1}
          onClick={() => setSelected(1)}
        >
          <ListItemPrefix>{/* icons here */}</ListItemPrefix>
          Course
          <ListItemSuffix></ListItemSuffix>
        </ListItem>
        <ListItem
          ripple={false}
          selected={Selected === 2}
          onClick={() => setSelected(2)}
        >
          {" "}
          <ListItemPrefix></ListItemPrefix>
          <span>Create new lesson</span>
        </ListItem>
        <ListItem
          ripple={false}
          selected={Selected === 3}
          onClick={() => setSelected(3)}
        >
          <ListItemPrefix>{/* icons here */}</ListItemPrefix>
          Create Quiz
          <ListItemSuffix></ListItemSuffix>
        </ListItem>
      </List>
    </Card>
  );

  const QuizCpt = (
    <Accordion
      open={openQuiz === 1}
      icon={<Icon id={1} open={openQuiz} />}
      className="mb-2 rounded-lg border border-blue-gray-100 px-4"
    >
      <AccordionHeader
        onClick={() => handleOpenQuiz(1)}
        className={`border-b-0 transition-colors ${
          openQuiz === 1 ? "text-blue-500 hover:!text-blue-700" : ""
        }`}
      >
        {QuizFetch && QuizFetch.title}
      </AccordionHeader>
      <AccordionBody className="pt-0 text-base font-normal">
        {QuizFetch &&
          QuizFetch.Questions &&
          QuizFetch.Questions.length > 0 &&
          QuizFetch.Questions.map((question, index) => (
            <div className="mt-10 mx-3">
              <Chip
                variant="ghost"
                color="blue"
                className="rounded-lg w-fit mb-5"
                value={`Question number` + ` ` + `${index + 1}`}
              />
              <span className="ml-2">{question.text}</span>
              <div className="flex flex-col mt-5 gap-1">
                {question.options.map((option, index) => (
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={option.IsCorrect}
                      id={option.id}
                      value={option.id}
                    />
                    {option.IsCorrect ? (
                      <Chip
                        value={
                          <div className="flex flex-row gap-2 items-center">
                            <CheckBadgeIcon className="h-4 w-4 m-0 p-0" />
                            <label
                              className="text-sm lowercase m-0 p-0"
                              for={option.id}
                            >
                              {option.text}
                            </label>
                          </div>
                        }
                        variant="ghost"
                        color="green"
                        className="ml-5 w-fit lowercase text-sm"
                      />
                    ) : (
                      <label className="ml-5 text-sm lowercase" for={option.id}>
                        {option.text}
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

        <div className="flex justify-end">
          {QuizFetch && (
            <Button
              color="red"
              variant="gradient"
              className="mt-10 capitalize mr-10 hover:shadow-none flex gap-1 items-center"
              // onClick={handleDeleteQuiz(QuizFetch.id)}
              onClick={() => {
                handleOpenAttentionDrawer();
                setidDeleted(QuizFetch.id);
                setname("quiz");
              }}
            >
              <TrashIcon className="h-4 w-4 m-0 p-0" />
              <span className="font-normal">Delete</span>
            </Button>
          )}
        </div>
      </AccordionBody>
    </Accordion>
  );

  const Course = (
    <div className=" mx-5 w-full h-full flex flex-col  gap-4">
      <div className=" flex flex-row gap-7 ">
        <div className="mx-5 self-end justify-self-end">
          <Typography variant="h2" className="capitalize mb-1">
            {course.title}
          </Typography>
          <Chip
            variant="ghost"
            className="mb-[3.5rem]  w-fit font-extrabold capitalize"
            value={course.category.name}
          />
        </div>
        <div className="w-96 m-auto h-52">
          <img
            src={course.image.path}
            className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/10  "
            alt="CourseImage"
          />
        </div>
      </div>
      <Typography
        variant="small"
        className="font-bold text-gray-600 border-b-[2px] border-solid w-fit border-gray-500"
      >
        Course Description
      </Typography>
      <ReactQuill value={course.desc} readOnly={true} theme={"bubble"} />
      {IntroAccordion}
      {DefaultAccordion}
      {QuizFetch && QuizCpt}
    </div>
  );

  return (
    <>
      {BreadcrumbsCpt}
      <div className="mt-3 flex gap-2 mb-[10rem]">
        {side_bar}
        {Selected === 1 && Course}
        {Selected === 2 && <LessonForm CourseId={id} />}
        {Selected === 3 && <Quiz courseId={id} />}
      </div>
      {idDeleted && AttentionDialog}
    </>
  );
}

export default SinglePageCourse;
