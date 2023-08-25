import React, { useEffect, useState } from "react";
import api from "./components/pages/api";
import { Button, Input, Radio } from "@material-tailwind/react";

const Test = () => {
  const [Course, setCourse] = useState("");
  console.log(Course);

  return (
    <>
      <div className="w-72">
        <label>Choose your interests:</label>
        <input
          type="checkbox"
          id="interest1"
          name="interests"
          value="interest1"
        />
        <label for="interest1">Interest 1</label>

        <input
          type="checkbox"
          id="interest2"
          name="interests"
          value="interest2"
        />
        <label for="interest2">Interest 2</label>

        <input
          type="checkbox"
          id="interest3"
          name="interests"
          value="interest3"
        />
        <label for="interest3">Interest 3</label>
      </div>
    </>
  );
};

export default Test;
