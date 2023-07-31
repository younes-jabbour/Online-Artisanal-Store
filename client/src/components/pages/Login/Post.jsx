import React, { useState } from "react";
import axios from "axios";

import { Button } from "@material-tailwind/react";
import api from "../api";

function Post() {
  const [data, setData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.get("auth/post").then((response) => {
        const data = response.data;
        setData(data);
        // console.log(data);
      });
      axios.defaults.withCredentials = true;
    } catch (err) {
      if (err) console.log(err.status);
      else if (err.response && err.response.status === 401)
        console.log("Forbidden");
    }
  };

  return (
    <>
      <Button onClick={handleSubmit}>Click me</Button>
      <span>{data.name}</span>
      <span>{data.age}</span>
      <span>{data.occupation}</span>
    </>
  );
}

export default Post;
