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
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Link } from "react-router-dom";
import LessonForm from "./LessonForm";

function SinglePageCourse() {
  const { id, course } = useSelector((state) => state.course);
  const [Selected, setSelected] = useState(1);

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
          <ListItemSuffix>
          </ListItemSuffix>
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
      </List>
    </Card>
  );

  const Course = (
    <div className=" flex flex-col border-2 border-solid border-black gap-4">
      <div className=" flex flex-row gap-2 border-2 border-solid border-red-400">
        <div className="w-96 h-52">
          <img
            src={course.image.path}
            className="h-full w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/10  "
            alt="CourseImage"
          />
        </div>
        <div className="m-5 place-self-center self-center">
          <Typography variant="h2" className="capitalize mb-1">
            {course.title}
          </Typography>
          <Chip
            variant="ghost"
            className="mb-[3.5rem]  w-fit font-extrabold capitalize"
            value={course.category.name}
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
    </div>
  );

  return (
    <>
      {BreadcrumbsCpt}
      <div className="mt-3 flex gap-2 mb-[10rem]">
        {side_bar}
        {Selected === 1 && Course}
        {Selected === 2 && <LessonForm CourseId={id} />}
      </div>
    </>
  );
}

export default SinglePageCourse;
