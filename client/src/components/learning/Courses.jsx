import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourseData } from "../../redux/Courselice";

import { useUserContext } from "../../context/UserContext";

function Courses() {
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);

  const { userInfo } = useUserContext();

  const userId = userInfo.id;

  useEffect(() => {
    const FetchCourses = async () => {
      try {
        await axios
          .get("http://localhost:5000/courses/getCourse")
          .then((res) => {
            setCourses(res.data.courses);
          });
      } catch (err) {
        console.error(err);
      }
    };

    FetchCourses();
  }, []);

  const handleEnrollement = async (id) => {
    if (!userInfo.IsConnected)
      return window.alert("You must be logged in to enroll in a course");
    try {
      await axios
        .post(`http://localhost:5000/enroll/newEnroll/${userId}`, {
          courseId: id,
        })
        .then((res) => {
          window.alert("You have successfully enrolled in the course");
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-wrap gap-3 mx-4 my-1">
      <Swiper
        modules={[Virtual]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        className="mySwiper"
        virtual
      >
        {courses &&
          courses.map((course) => (
            <SwiperSlide>
              <Card className="mt-[4rem] w-[24rem] border-solid border-[1px] border-gray-500/20">
                <CardHeader color="blue-gray" className=" h-48">
                  <img
                    src={course.image.path}
                    alt="card"
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <Chip
                    variant="ghost"
                    className="w-fit h-fit mb-3"
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
                    value={course.category.name}
                  />
                  <div className="flex justify-between mb-3">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {course.title}
                    </Typography>
                  </div>
                  <div className="mx-5 flex items-center gap-4">
                    <Avatar
                      className="h-10 w-10"
                      src={course.User.ImgUrl}
                      alt="avatar"
                    />
                    <div className="mx-5">
                      <Typography variant="h6">Creator</Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {course.User.name}
                      </Typography>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 mt-4 flex items-center justify-between">
                  {!course.Enrollment.find(
                    (enroll) => enroll.userId === userId
                  ) ? (
                    <Button
                      color="light-blue"
                      ripple={false}
                      variant="gradient"
                      className="capitalize hover:shadow-none flex gap-1 items-center hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-100 "
                      size="sm"
                      onClick={() => handleEnrollement(course.id)}
                    >
                      Enroll now
                    </Button>
                  ) : (
                    <Button
                      color="light-blue"
                      ripple={false}
                      variant="outlined"
                      className="capitalize hover:shadow-none flex gap-1 items-center "
                      size="sm"
                    >
                      Enrolled
                    </Button>
                  )}
                  <Link to="/learn/course">
                    <Button
                      size="sm"
                      ripple={false}
                      variant="outlined"
                      color="light-blue"
                      onClick={() => {
                        dispatch(
                          setCourseData({
                            course: course,
                          })
                        );
                        console.log({ course: course });
                      }}
                      className="capitalize hover:shadow-none flex gap-1 items-center hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-100 "
                    >
                      <span>More Details</span>
                      <ArrowLongRightIcon className="h-5 w-5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Courses;
