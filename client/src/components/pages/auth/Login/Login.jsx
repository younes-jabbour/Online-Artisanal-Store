import React, { useState } from "react";
import axios from "axios";
import logo from "../../../../assets/logo.png";
import "../../../../assets/style.css";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function AlertCustomCloseIcon({ props }) {
  const { open, closeAlert, ErrorMessage } = props;
  return (
    <>
      <Alert
        className="rounded-none border-l-4 border-red-500 bg-red-500/10 font-medium text-red-500"
        open={open}
        icon={<Icon />}
        action={
          <Button
            variant="text"
            color="red"
            size="sm"
            className="!absolute top-3 right-3"
            onClick={closeAlert}
          >
            Close
          </Button>
        }
      >
        {ErrorMessage}
      </Alert>
    </>
  );
}

function Login() {
  const [open, setOpen] = React.useState(false);
  const openAlert = () => setOpen(true);
  const closeAlert = () => setOpen(false);
  const [success, Setsuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(" ");
  // const [input, setInput] = useState();
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const alertProps = {
    open: open,
    openAlert: openAlert,
    closeAlert: closeAlert,
    ErrorMessage: ErrorMessage,
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(inputs.email)) {
      newErrors.email = "Invalid email address";
    }

    // Validate password (Example: Password must be at least 6 characters long)
    if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    try {
      if (isFormValid) {
        const response = await axios.post(
          "http://localhost:5000/auth/login",
          inputs,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        localStorage.setItem("AccessToken", response.data.AccessToken);
        Setsuccess(true);
        window.location.href = "/";
      }
    } catch (err) {
      Setsuccess(false);
      openAlert();
      if (!err.response) {
        setErrorMessage("No server response");
        console.log(err);
      } else if (err.response && err.response.status === 404)
        setErrorMessage("Email not found!");
      else if (err.response && err.response.status === 400)
        setErrorMessage("wrong email or password !");
      else if (err.response && err.response.status === 401)
        console.log("Forbidden");
    }
  };

  return (
    <>
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
              {success ? (
                <div>good</div>
              ) : (
                <AlertCustomCloseIcon props={alertProps} />
              )}

              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <Input
                    size="lg"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    color="brown"
                    autoComplete="off"
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

                {/* <div className="flex gap-10 justify-center">
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
                </div> */}
                <Button
                  className="mt-6"
                  variant="filled"
                  type="submit"
                  color="brown"
                  ripple={false}
                  onClick={handleSubmit}
                  fullWidth
                >
                  Login
                </Button>
                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  you don't have account yet?{" "}
                  <Link to="/register">
                    <span className="signIn">Sign up</span>
                  </Link>
                </Typography>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
