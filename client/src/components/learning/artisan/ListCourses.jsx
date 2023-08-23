import React, { useState, useEffect, createContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Switch,
  Chip,
} from "@material-tailwind/react";
import {
  // CheckBadgeIconIcon,
  // CheckIcon,
  CheckCircleIcon,
  // XCircleIcon,
  // ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import api from "../../pages/api";
import { useUserContext } from "../../../context/UserContext";
import SinglePageCourse from "./SinglePageCourse";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

function ListCourses() {
  const [Courses, setCourses] = useState([]);
  const [Mounted, setMounted] = useState(false);

  // Courses && console.log(Courses);
  // console.log(Courses.course[0]);
  const { userInfo } = useUserContext();

  const id = userInfo.id;

  useEffect(() => {
    setMounted(true);
    api.get(`/courses/getCourse/${id}`).then((res) => {
      setCourses(res.data);
    });
    return () => {
      setMounted(false);
      setCourses([]);
    };
  }, []);
  return (
    <div className="h-full w-full flex flex-wrap gap-1 mx-4 my-1">
      {Courses.course &&
        Courses.course.map((course) => (
          <CourseCard id={course.id} course={course} />
        ))}
    </div>
  );
}

export default ListCourses;
