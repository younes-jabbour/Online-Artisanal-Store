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
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCourseData } from "../../redux/Courselice";
import { useUserContext } from "../../context/UserContext";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import useFetchData from "../../hooks/useFetchData";

function ListCoursesPage() {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [emptyCategorie, setemptyCategorie] = useState(false);
  const { userInfo } = useUserContext();
  const userId = userInfo.id;
  const { data, error } = useFetchData("http://localhost:5000/categorie");

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [noMatchingCourses, setNoMatchingCourses] = useState(false);

  useEffect(() => {
    if (data) {
      setCategory(data);
    } else {
      console.error("Error fetching categories:", error);
    }
    return () => {
      setCategory([]);
    };
  }, [data]);

  useEffect(() => {
    const FetchCourses = async () => {
      try {
        await axios
          .get("http://localhost:5000/courses/getCourse")
          .then((res) => {
            setCourses(res.data.courses);
            // console.log(res.data.courses);
          });
      } catch (err) {
        console.error(err);
      }
    };

    FetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const matchesCategory =
        selectedCategory === null || course.categoryId === selectedCategory;
      if (selectedCategory !== null) {
        return matchesCategory;
      }
      return true;
    });

    const noMatching = courses.length > 0 && filtered.length === 0;
    setNoMatchingCourses(noMatching);

    setFilteredCourses(filtered);
  }, [selectedCategory, courses]);

  const FirstSection = (
    <div className="bg-BrownLight h-32 flex items-center justify-center border-b-[2px] border-solid border-BrownDark">
      <Typography variant="h2" className="text-BrownDark">
        Our Courses
      </Typography>
    </div>
  );

  const SelectCpt = (
    <div className="flex flex-row justify-between w-full">
      <div className="w-72">
        <Select
          color="blue"
          value={emptyCategorie ? "" : null}
          onChange={(value) => {
            setSelectedCategory(value);
            setemptyCategorie(false);
          }}
          label="Select categorie"
        >
          {category &&
            category.map((categorie) => (
              <Option key={categorie.id} value={categorie.id}>
                {categorie.name}
              </Option>
            ))}
        </Select>
      </div>
      <Button
        size="md"
        variant="text"
        ripple={false}
        className="flex gap-1 items-center"
        color="gray"
        onClick={() => {
          setSelectedCategory(null);
          setemptyCategorie(true);
        }}
      >
        <span>see all Courses</span>
        <ArrowLongRightIcon className="h-5 w-5" />
      </Button>
    </div>
  );

  const handleEnrollement = async (id) => {
    if (!userInfo.IsConnected)
      return window.alert("You must be logged in to enroll in a course");
    try {
      await axios
        .post(`http://localhost:5000/enroll/newEnroll/${userId}`, { courseId : id })
        .then((res) => {
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const Courses = (
    <div className="h-full w-full flex flex-wrap gap-[5rem] justify-center mt-5 mb-[10rem]">
      {noMatchingCourses ? (
        <Typography>No matching courses found.</Typography>
      ) : (
        courses &&
        filteredCourses.map((course) => (
          <Card className="mt-[3rem] w-[24rem] border-solid border-[1px] border-gray-500/20">
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
              {!course.Enrollment.find((enroll) => enroll.userId === userId) ? (
                <Button
                  color="light-blue"
                  ripple={false}
                  variant="gradient"
                  className="capitalize hover:shadow-none flex gap-1 items-center hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-100 "
                  size="sm"
                  onClick={()=>handleEnrollement(course.id)}
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
        ))
      )}
    </div>
  );

  return (
    <>
      <div>{FirstSection}</div>
      <div className="flex mx-10 mt-10">{SelectCpt}</div>
      <div className="">{Courses}</div>
    </>
  );
}

export default ListCoursesPage;
