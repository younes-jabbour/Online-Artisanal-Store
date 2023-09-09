import React, { useState, useEffect } from "react";

import api from "../../pages/api";
import { useUserContext } from "../../../context/UserContext";
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
    <div className="h-full w-full flex flex-wrap justify-center gap-1 my-1">
      {Courses.course &&
        Courses.course.map((course) => (
          <CourseCard id={course.id} course={course} />
        ))}
    </div>
  );
}

export default ListCourses;
