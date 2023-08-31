import React, { useEffect, useState } from "react";
import api from "./components/pages/api";
import { Button, Input, Radio } from "@material-tailwind/react";

import { useUserContext } from "./context/UserContext";

import { useDispatch, useSelector } from "react-redux";

const Test = () => {
  const [ktaba, setktaba] = useState("");
  console.log(ktaba);
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
    <div className="w-96 mt-10">
      <Input
        label="test"
        value={ktaba}
        onChange={(e) => setktaba(e.target.value)}
      />
    </div>
  );
};

export default Test;
