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

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { BookmarkIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import api from "../pages/api";

function CoursePage() {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // Get the 'course' from Redux state
  const { course } = useSelector((state) => state.course);

  // State variables for lessons and images
  const [LessonsNames, setLessonsNames] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [LessonIntroduction, setLessonIntroduction] = useState(null);

  // Handle opening an image in a dialog
  const handleOpenImage = (imagePath) => {
    setSelectedImage(imagePath);
  };

  // Fetch course data on component mount
  useEffect(() => {
    const FetchLessonsName = async () => {
      // Fetch lesson names excluding introduction
      await api.get(`/lesson/GetLessonName/${course.id}`).then((res) => {
        setLessonsNames(
          res.data.filter((lesson) => lesson.IsIntroduction === false)
        );
      });

      // Fetch introduction lesson
      await api.get(`/lesson/GetIntroduction/${course.id}`).then((res) => {
        setLessonIntroduction(res.data[0]);
      });
    };
    FetchLessonsName();
  }, []);

  // State for enrollment status
  const [Enrolled, setEnrolled] = useState(false);

  // Breadcrumbs component
  const BreadcrumbsCpt = (
    <Breadcrumbs className="my-5">
      <Link to="/learn">Learn</Link>
      <Link to="/learn/course" className="opacity-60">
        Course
      </Link>
    </Breadcrumbs>
  );

  // First section of the page
  const FirstSection = (
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
      {!Enrolled ? (
        // Display 'Enroll Now' button if not enrolled
        <Button
          variant="gradient"
          color="blue-gray"
          className="w-fit mt-2 flex gap-1 items-center shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          <span>Enroll Now</span>
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      ) : (
        // Display 'Enrolled' button if already enrolled
        <Button
          variant="outlined"
          color="blue-gray"
          className="w-fit flex mt-2 gap-1 items-center shadow-none"
        >
          <span>Enrolled</span>
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  // Title for the second section
  const SectionTwoTitle = (
    <Typography variant="h4" color="gray" className="my-14 mx-16">
      What you'll learn
    </Typography>
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

  return (
    <div>
      {/* Display Breadcrumbs component */}
      {BreadcrumbsCpt}
      {/* Display FirstSection */}
      {FirstSection}
      {/* Display SectionTwoTitle */}
      {SectionTwoTitle}
      {/* Display IntroAccordion if there is an introduction lesson */}
      {LessonIntroduction ? IntroAccordion : null}
      {/* Display LockedAccordion */}
      {LockedAccordion}
    </div>
  );
}

export default CoursePage;
