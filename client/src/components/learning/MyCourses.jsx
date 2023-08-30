import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
  Breadcrumbs,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import api from "../pages/api";
import { setCourseData } from "../../redux/Courselice";
import { useDispatch } from "react-redux";

import AttentionDialog from "../pages/Profile/AttentionDialog";

function MyCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useUserContext();
  const userId = userInfo.id;
  const [FetchCourses, setFetchCourses] = useState([]);
  const { completedEnrollement } = useUserContext();
  const [idDeleted, setidDeleted] = useState();

  const [openAttentionDrawer, setOpenAttentionDrawer] = React.useState(false);

  const handleOpenAttentionDrawer = () =>
    setOpenAttentionDrawer(!openAttentionDrawer);

  useEffect(() => {
    try {
      api.get(`/enroll/getEnrollDetails/${userId}`).then((res) => {
        setFetchCourses(res.data);
      });
    } catch (error) {
      console.log(error);
    }

    return () => {
      setFetchCourses([]);
    };
  }, []);

  const BreadcrumbsCpt = (
    <Breadcrumbs className="my-5">
      <Link to="/profile" className="">
        Profile
      </Link>
      <Link to="/profile/my_courses" className=" opacity-60">
        My Courses
      </Link>
    </Breadcrumbs>
  );

  const Delete = async (CourseId) => {
    try {
      await api.delete(`/enroll/deleteEnroll/${userId}/${CourseId}`);
      handleOpenAttentionDrawer();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const CourseCard = ({ course }) => {
    return (
      <Card className="mb-20 mx-10 w-[24rem] border-solid border-[1px] border-gray-500/20">
        <CardHeader color="blue-gray" className=" h-48">
          <img
            src={course.image?.path}
            alt="card"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="flex justify-between">
            <Typography variant="h5" color="blue-gray" className="mb-2 ">
              {course.title}
            </Typography>
          </div>
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
        </CardBody>
        <CardFooter className="pt-0 flex items-center justify-between">
          <Button
            ripple={false}
            variant={`${
              completedEnrollement.find(
                (enroll) => enroll.courseId === course.id
              )
                ? "outlined"
                : "filled"
            }`}
            className="capitalize hover:shadow-none"
            color="green"
            size="sm"
            onClick={() => {
              dispatch(setCourseData({ course: course }));
              navigate("/learn/course");
            }}
          >
            {!completedEnrollement.find(
              (enroll) => enroll.courseId === course.id
            )
              ? "continue your learn"
              : "Course completed"}
          </Button>
          <Button
            ripple={false}
            variant="outlined"
            color="red"
            className="capitalize hover:shadow-none"
            size="sm"
            onClick={() => {
              handleOpenAttentionDrawer();
              setidDeleted(course.id);
            }}
          >
            unenroll
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      {BreadcrumbsCpt}
      <div className="flex gap-3 mt-[4rem] flex-wrap ">
        {FetchCourses &&
          FetchCourses.length > 0 &&
          FetchCourses.map((c) => <CourseCard course={c.course} />)}
      </div>
      <AttentionDialog
        openAttentionDrawer={openAttentionDrawer}
        handleOpenAttentionDrawer={handleOpenAttentionDrawer}
        Delete={Delete}
        idDeleted={idDeleted}
        name="course"
      />
    </>
  );
}

export default MyCourses;
