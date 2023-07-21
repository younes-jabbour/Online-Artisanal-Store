import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../../../assets/logo.png";
import "./../../../assets/style.css";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function Login() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    select: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(inputs);
  const slides = [
    {
      url: "https://artisans-dumaroc.com/cdn/shop/files/Untitled_750_x_1100_px_1_800x.png?v=1636419333",
    },
    {
      url: "https://www.maroc.ma/sites/default/files/styles/thumbnail_detail_mobile/public/image_actualite/artisanat_2.jpeg?itok=uY1e1Mv2",
    },
    {
      url: "https://media.istockphoto.com/id/180750266/fr/photo/moroccan-potter-travaille-dans-latelier.jpg?s=612x612&w=0&k=20&c=Ve4YHhdL_g1v8jXXMJfYZPdVOoJrm8AL3i4RghMsBok=",
    },
  ];

  // const borderStyle = "border-2 border-red-500 border-solid";

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  //   }, 4000); // Change '4000' to control the time between slide transitions (in milliseconds).

  //   return () => clearInterval(interval);
  // }, [slides.length, currentSlideIndex]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCurrentSlideIndex(0);
  //   }, 1000); // The time before the first transition starts (in milliseconds).

  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <div className="bg-[#EFDEA1] h-screen lg:grid lg:grid-cols-2">
      {/* grid rows */}
      <div className="  grid grid-rows-[120px_1fr] ">
        <img
          className=" p-3 justify-self-center h-full  w-auto"
          src={logo}
          alt=""
        />
        <div className="self-center justify-self-center">
          <Card
            color="transparent"
            shadow={false}
            className=" bg-white max-w-fit p-5 drop-shadow-sm"
          >
            <Typography variant="h4" className="text-center text-BrownDark ">
              Sign Up
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal max-w-fit text-BrownDark  "
            >
              Enter your details to register.
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  label="Email"
                  name="Email"
                  onChange={handleChange}
                />
                <Input
                  type="password"
                  size="lg"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                />
              </div>
              <Button className=" bg-BrownDark mt-6" fullWidth>
                Register
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <a
                  href="https://www.google.com"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Sign In
                </a>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
      {/* image */}

      <div
        className="hidden lg:block  bg-cover bg-no-repeat h-screen transition duration-1000"
        style={{
          backgroundImage: `url(${slides[currentSlideIndex].url})`,
        }}
      >
        <div
          className={` text-white  flex flex-col items-center justify-center h-full bg-black opacity-75 `}
        >
          <div className=" text-3xl">
            Welcome to{" "}
            <span className=" text-BrownLight text-4xl">7irafi,</span>
          </div>
          <div className="typing-demo ">
            where you can discover the world of traditional craftsmanship
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
