import React, { useState, useEffect } from "react";
import Header from "../../pages/Layout/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api from "../../pages/api";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Input,
  Select,
  Option,
  Button,
  Alert,
  Breadcrumbs,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import useFetchData from "../../../hooks/useFetchData";
import { useUserContext } from "../../../context/UserContext";
import ListCourses from "./ListCourses";
import { Link } from "react-router-dom";

function Dashboard() {
  const [Selected, setSelected] = useState(1);
  const [Success, setSuccess] = useState(false); // for success message
  const [Desc, setDesc] = useState(""); // for description
  const [selectedFile, setSelectedFile] = useState(null); // for image
  const [Title, setTitle] = useState("");
  const [Category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { userInfo } = useUserContext();

  const { data, loading, error } = useFetchData(
    "http://localhost:5000/categorie"
  );

  useEffect(() => {
    setCategories(data);

    return () => {
      setCategories([]);
    };
  }, [data]);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", Title);
      formData.append("desc", Desc);
      formData.append("categoryId", Category);
      formData.append("thumbnail", selectedFile);
      formData.append("UserId", userInfo.id);
      // send this to the backend ...
      const res = await api.post("/courses/newCourse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Success) {
      alert("course created successfully");
      window.location.reload();
    }
  }, [Success]);

  const BreadcrumbsCpt = (
    <Breadcrumbs className="my-5">
      <Link to="/profile" className="opacity-60">
        Profile
      </Link>
      <Link to="/profile/course" className=" ">
        Courses
      </Link>
    </Breadcrumbs>
  );

  const side_bar = (
    <Card className="h-fit w-full rounded max-w-[20rem] p-4 shadow-xl  shadow-blue-gray-900/5">
      <List>
        <ListItem
          ripple={false}
          selected={Selected === 1}
          onClick={() => setSelected(1)}
        >
          <ListItemPrefix>{/* icons here */}</ListItemPrefix>
          courses
          <ListItemSuffix></ListItemSuffix>
        </ListItem>
        <ListItem
          ripple={false}
          selected={Selected === 2}
          onClick={() => setSelected(2)}
        >
          {" "}
          <ListItemPrefix></ListItemPrefix>
          <span>Create new course</span>
        </ListItem>
      </List>
    </Card>
  );

  const CoursForm = (
    <Card className="w-full max-w-[40rem] m-auto">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid bg-BrownLight place-items-center rounded-b-none py-8 px-4 text-center"
      >
        <div className="mb-4 rounded-full border bg-BrownDark p-6 text-BrownLight">
          <PencilSquareIcon className="w-10 h-10" />
        </div>
        <Typography variant="h4" className="text-BrownDark">
          Create your course here
        </Typography>
      </CardHeader>
      {/* body */}
      <CardBody>
        <form className="flex flex-col gap-4">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Course Title
            </Typography>
            <Input
              type="text"
              // placeholder="Course title"
              className="!border !border-gray-300 bg-white text-gray-900  shadow-gray-900/5 ring-4 ring-transparent  focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Category of course
            </Typography>
            <Select
              size="lg"
              className="!border !border-gray-300 bg-white text-gray-900  shadow-gray-900/5 "
              labelProps={{ className: "hidden" }}
              containerProps={{ className: "min-w-[100px]" }}
              label="Select a categorie here"
              onChange={(value) => setCategory(value)}
            >
              {categories &&
                categories.map((category) => (
                  <Option
                    value={category.id}
                    name="category"
                    children={category.name}
                  ></Option>
                ))}
            </Select>
          </div>
          <div className="my-1">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Description
            </Typography>
            <ReactQuill theme="snow" value={Desc} onChange={setDesc} />
          </div>

          <div className="my-1">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Thumbnail of course
            </Typography>
            <div className="flex flex-col gap-2 flex-wrap h-full w-full items-center justify-center bg-sky-400">
              <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 fill-white text-BrownDark"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </label>
                <input
                  id="upload"
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                />
              </div>
              {selectedFile ? (
                <>
                  {/* Display selected file name */}
                  <span>{selectedFile.name}</span>
                  <Button
                    size="sm"
                    variant="gradient"
                    color="red"
                    onClick={() => setSelectedFile(null)} // Remove selected file
                  >
                    Remove
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </form>
      </CardBody>
      <cardFooter className="my-4 flex item-center">
        <Button
          variant="gradient"
          color="green"
          className="w-fit h-fit my-0 mx-auto"
          onClick={handleClick}
        >
          confirme
        </Button>
      </cardFooter>
    </Card>
  );
  return (
    <>
      {BreadcrumbsCpt}
      <div className="mt-3 flex gap-2 mb-[10rem]">
        {side_bar}
        {Selected === 1 && <ListCourses />}
        {Selected === 2 && categories && CoursForm}
      </div>
    </>
  );
}

export default Dashboard;
