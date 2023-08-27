import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Switch,
  Chip,
  Avatar,
  Carousel,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCourseData } from "../../redux/Courselice";

function Courses() {
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);

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

  return (
    <div className="h-full w-full flex flex-wrap gap-3 mx-4 my-1">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        modules={[Navigation]}
        navigation={true}
        className="mySwiper"
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
                  <div className="flex justify-between mb-3">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {course.title}
                    </Typography>
                    <Chip
                      variant="ghost"
                      className="w-fit"
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
                  <Button
                    color="light-blue"
                    ripple={false}
                    variant="gradient"
                    className="capitalize hover:shadow-none flex gap-1 items-center hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-100 "
                    size="sm"
                  >
                    Enroll now
                  </Button>
                  <Link to="/learn/course">
                  
                  <Button
                    size="sm"
                    ripple={false}
                    variant="outlined"
                    color="light-blue"
                    onClick={()=>{dispatch(setCourseData({course}))}}
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
