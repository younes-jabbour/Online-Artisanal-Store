import React, { useEffect, useState } from "react";
import api from "./components/pages/api";
import { Button } from "@material-tailwind/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Test = () => {
  const [Course, setCourse] = useState([]);
  console.log(Course);
  const handleClick = async () => {
    const response = await api.get("/courses/getCourse");
    setCourse(response.data.courses);
  };

  return (
    <>
     <video src=""></video>
    </>
  );
};

export default Test;
