import React, { useEffect, useState } from "react";
import api from "./components/pages/api";
import { Button, Input } from "@material-tailwind/react";

const Test = () => {
  const [Course, setCourse] = useState("");
  console.log(Course);

  return (
    <>
      <div className="w-72">
        <Input value={Course} onChange={(e)=>setCourse(e.target.value)} label="Username" />
      </div>
    </>
  );
};

export default Test;
