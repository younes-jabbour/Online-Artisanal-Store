import React, { useState } from "react";
import axios from "axios";
import logo from "../../../../assets/logo.png";
import "../../../../assets/style.css";
import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Register() {
  const [input, setInput] = useState();
  const [errorsMessage, seterrorsMessage] = useState(" ");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    type: input,
  });
  const [values, Setvalues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  //hundlers
  const OnchangeInputs = (e) => {
    Setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChange2 = (value) => {
    setInputs((prev) => ({ ...prev, type: value }));
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    OnchangeInputs(e);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        if (inputs.type === "Visitor") {
          await axios
            .post("http://localhost:5000/users/register", inputs)
            .then((response) => {
              // Handle successful response here
              console.log("Success, Visitor created!", response.data);
            });
          axios.defaults.withCredentials = true;
        } else if (inputs.type === "artisan") {
          await axios
            .post("http://localhost:5000/users/register/artisan", inputs)
            .then((response) => {
              // Handle successful response here
              console.log("Success, artisan created!", response.data);
            });
          axios.defaults.withCredentials = true;
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          seterrorsMessage("Email is already registered!");
        } else {
          console.log(err);
        }
      }
    }
  };

  // validation form

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (values.name.trim() === "") {
      newErrors.name = "Username is required";
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email)) {
      newErrors.email = "Invalid email address";
    }

    // Validate password (Example: Password must be at least 6 characters long)
    if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  return (
    // container GRID COLUMS
    <div className="bg-[#EFDEA1] h-screen lg:grid lg:grid-cols-2">
      {/* grid rows */}
      {/* logo 7IRAFI */}
      <div className="  grid grid-rows-[120px_1fr] ">
        <img
          className=" p-3 justify-self-center h-full border-solid  w-auto"
          src={logo}
          alt=""
        />

        {/* register form */}
        <div className="self-center justify-self-center">
          <Card
            color="transparent"
            shadow={false}
            className=" bg-white max-w-fit p-5 pb-0 bottom-2 shadow-BrownDark "
          >
            <Typography
              variant="h4"
              className="text-center mb-2 text-BrownDark"
            >
              Sign Up
            </Typography>
            <form className="mt-2 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-3.5 ">
                <Input
                  size="lg"
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  color="brown"
                />
                {errors.name && (
                  <div className="error_message">{errors.name}</div>
                )}
                <Input
                  size="lg"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  color="brown"
                />
                {errors.email && (
                  <div className="error_message">{errors.email}</div>
                )}
                <Input
                  type="password"
                  size="lg"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  color="brown"
                />
                {errors.password && (
                  <div className="error_message">{errors.password}</div>
                )}
              </div>

              {/* radio buttoms */}

              <div className="flex gap-10 justify-center">
                <Radio
                  name="type"
                  color="brown"
                  label="Visitor"
                  value="Visitor"
                  ripple={false}
                  onChange={() => {
                    handleChange2("Visitor");
                  }}
                />
                <Radio
                  name="type"
                  color="brown"
                  label="Artisan"
                  value="Artisan"
                  ripple={false}
                  onChange={() => {
                    handleChange2("artisan");
                  }}
                />
              </div>
              {errorsMessage && (
                <div className="font-bold text-red-500 text-center">
                  {errorsMessage}
                </div>
              )}
              <Button
                className="mt-3"
                variant="filled"
                color="brown"
                ripple={false}
                onClick={handleSubmit}
                fullWidth
              >
                Register
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to="/Login">
                  {" "}
                  <span className="signIn"> Sign In</span>
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>

      {/* left image */}

      <div
        className="hidden lg:block  bg-cover bg-no-repeat h-screen transition duration-1000"
        style={{
          backgroundImage: `url("https://artisans-dumaroc.com/cdn/shop/files/Untitled_750_x_1100_px_1_800x.png?v=1636419333")`,
        }}
      >
        <div
          className={` text-white  flex flex-col items-center justify-center h-full bg-black opacity-75 `}
        >
          <div className=" text-3xl">
            Welcome to{" "}
            <span className=" font-Rasputin text-5xl text-BrownLight">
              7irafi
            </span>
          </div>
          <div className="typing-demo ">
            where you can discover the world of traditional craftsmanship
          </div>
        </div>
      </div>
    </div>
  );
}
