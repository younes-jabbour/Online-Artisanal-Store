import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import api from "../../api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserContext } from "../../../../context/UserContext";

function Post() {
  const { userInfo } = useUserContext();
  const [data, setData] = useState([]);
  console.log(userInfo);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.get("auth/post", ).then((response) => {
        const data = response.data;
        setData(data);
      });
    } catch (err) {
      if (err) console.log(err);
      else if (err.response && err.response.status === 401)
        console.log("Forbidden");
    }
  };

  return (
    <>
      <div className=" flex flex-col gap-6">
        <div>
          <Button onClick={handleSubmit}>Click me</Button>
          <span>{data.name}</span>
          <span>{data.age}</span>
          <span>{data.occupation}</span>
        </div>
        <Link to="/login">
          <Button>Go to login</Button>
        </Link>
      </div>
    </>
  );
}

export default Post;
