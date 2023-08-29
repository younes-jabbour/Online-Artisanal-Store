import React, { useEffect, useState } from "react";
import api from "./components/pages/api";
import { Button, Input, Radio } from "@material-tailwind/react";

import { useUserContext } from "./context/UserContext";

import { useDispatch, useSelector } from "react-redux";

const Test = () => {
  const { userInfo } = useUserContext();

  const [Enrollement, setEnrollement] = useState([]);

  const { course } = useSelector((state) => state.course);

  console.log(course);

  // useEffect(() => {
  //   if (userInfo.IsConnected) {
  //     api
  //       .get(`/enroll/getAllEnroll/${userInfo.id}`)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //   }
  // }, []);

  return (
    <>
      <div>Hello this is test page</div>
    </>
  );
};

export default Test;
