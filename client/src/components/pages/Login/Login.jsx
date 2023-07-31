import React, { useState } from "react";
import axios from "axios";
import logo from "./../../../assets/logo.png";
import "./../../../assets/style.css";
import api from "../api";
import {
  Card,
  Input,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Login() {
  const [ErrorMessage, setErrorMessage] = useState(" ");
  const [input, setInput] = useState();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    type: input,
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChange2 = (value) => {
    setInputs((prev) => ({ ...prev, type: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/login", inputs).then((response) => {
        localStorage.setItem("AccessToken", response.data.AccessToken);
        localStorage.setItem("RefreshToken", response.data.RefreshToken);
        console.log("Tokens are in the localStorage");
      });
      axios.defaults.withCredentials = true;
    } catch (err) {
      if (err.response && err.response.status === 404)
        setErrorMessage("Email not found!");
      else if (err.response && err.response.status === 400)
        setErrorMessage("wrong email or password !");
      else if (err.response && err.response.status === 401 )  
          console.log("Forbidden");
    }
  };

  return (
    <div className="bg-[#EFDEA1] h-screen">
      {/* grid rows */}
      {/* logo 7IRAFI */}
      <div className="  grid grid-rows-[120px_1fr] ">
        <img
          className=" p-3 justify-self-start h-full  w-auto"
          src={logo}
          alt=""
        />

        {/* register form */}
        <div className="self-center justify-self-center">
          <Card
            color="transparent"
            shadow={false}
            className=" bg-white max-w-fit p-5  shadow-BrownDark "
          >
            <Typography variant="h4" className="text-center text-BrownDark">
              Sign in
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  size="lg"
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  color="brown"
                />
                <Input
                  type="password"
                  size="lg"
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  color="brown"
                />
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
                    handleChange2("visitor");
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
              {ErrorMessage && (
                <div className="font-bold text-red-500 text-center">
                  {ErrorMessage}
                </div>
              )}
              <Button
                className="mt-6"
                variant="filled"
                color="brown"
                ripple={false}
                onClick={handleSubmit}
                fullWidth
              >
                Login
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <span href="#" className="signIn">
                  <Link to="/register"> Sign up</Link>
                </span>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
