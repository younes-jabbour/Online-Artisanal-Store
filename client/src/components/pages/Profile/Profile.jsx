import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import api from "../api";
import {
  Avatar,
  Select,
  Option,
  Textarea,
  Breadcrumbs,
  Button,
  Input,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  EyeIcon,
  EyeSlashIcon,
  CameraIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { useUserContext } from "../../../context/UserContext";
import { Navigate, Link, Outlet } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";

function Profile() {
  const [categories, Setcategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //users update info
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [descUser, setDescUser] = useState("");
  const [imgUser, setImgUser] = useState(null);
  const { userInfo } = useUserContext();

  const [disabled, setDisabled] = useState(true);

  const id = userInfo.id;
  const type = userInfo.type;

  //Get user info by type (artisan or client)
  const { data, loading, error } = useFetchData(
    `http://localhost:5000/users/${id}`
  );

  const UpdateUserInfo = async (e) => {
    // update request handler
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("email", email);
      formData.append("img", imgUser);
      if (type === "artisan") formData.append("desc", descUser);
      const response = await api.put(`/users/update/${type}/${id}`, formData, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("desc", desc);
      formData.append("product_img", image);
      formData.append("categoryId", categoryId);
      console.log(formData);

      const response = await api.post(`/product/newProduct/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(response.data);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      if (userInfo.type === "artisan") {
        try {
          const response = await api.get("/categorie");
          Setcategories(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getCategories();
  }, []);

  const handleButtonClick = () => {
    // Call both functions when the button is clicked
    handleOpen();
  };

  const handlEyeClick = () => {
    setVisible(!visible);
  };

  const handleOpen = () => setOpen(!open);

  const side_bar = (
    <Card className="h-fit w-full  rounded-none max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          menu
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem className=" ">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <span onClick={handleButtonClick}>Create new product</span>
        </ListItem>
        <Link to="/profile/list_of_products">
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            List of Products
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
        </Link>
        <Link to="/profile/course">
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard of courses
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );

  const Dialog_cpt = (
    <>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        andler={handleOpen}
      >
        <DialogHeader className="text-center">
          Create your new product here
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center">
            <div className="w-72 flex flex-col gap-4">
              <Input
                name="name"
                variant="outlined"
                label="Product name"
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                size="lg"
                label="Select a categorie here"
                onChange={(value) => setCategoryId(value)}
              >
                {categories.map((category) => (
                  <Option value={category.id} children={category.name}></Option>
                ))}
              </Select>
              <Input
                name="price"
                variant="outlined"
                label="Price"
                // value={Inputs.name}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Textarea
                size="lg"
                label="Add a Description here of the Product"
                value={desc}
                name="desc"
                onChange={(e) => setDesc(e.target.value)}
              />
              <Input
                size="lg"
                name="image"
                accept=".jpg, .png, .gif, .jpeg"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                label="drop image here"
              ></Input>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            onClick={handleSubmit}
            variant="gradient"
            type="submit"
            color="green"
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
  const inputs = (
    <>
      <div className="mt-[-2rem] mx-auto  flex flex-col h-fit items-center w-96">
        <div className=" rounded-full mb-3">
          {image ? (
            <Avatar src={image} alt="avatar" size="xl" />
          ) : (
            <CameraIcon className="h-12 w-12 " />
          )}
        </div>
        <div
          className=" flex w-96 flex-col items-center shadow-
          sm  gap-6"
        >
          {data && (
            <>
              <Input
                size="md"
                variant="outlined"
                label="name"
                disabled={disabled}
                value={disabled ? data.name : null}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                size="md"
                variant="outlined"
                label="email"
                disabled={disabled}
                value={disabled ? data.email : null}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
          <Input
            size="md"
            variant="outlined"
            value=""
            type={visible ? "text" : "password"}
            id="input"
            disabled={disabled}
            label="password"
            icon={
              visible ? (
                <EyeSlashIcon onClick={handlEyeClick} />
              ) : (
                <EyeIcon onClick={handlEyeClick} />
              )
            }
          />
          <Input
            size="md"
            variant="outlined"
            label="Drop your image here"
            type="file"
            className=""
            name="image"
            accept=".jpg, .png, .gif, .jpeg"
            disabled={disabled}
            onChange={(e) => setImgUser(e.target.files[0])}
          />
          {type === "artisan" && data && (
            <Textarea
              value={disabled ? data.desc : null}
              disabled={disabled}
              className=""
              onChange={(e) => setDescUser(e.target.value)}
              label="Description"
            />
          )}
        </div>
        <div className="flex gap-5 mt-4">
          <Button
            variant="filled"
            color="green"
            onClick={UpdateUserInfo}
            className=""
          >
            confirme changes
          </Button>
          <Button
            variant="filled"
            color="yellow"
            onClick={() => {
              setDisabled(false);
            }}
            className=""
          >
            update profile
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {userInfo.IsConnected ? (
        <>
          <div className="mt-7">
            <Breadcrumbs>
              {/* <a href="1" className="opacity-60">
                Docs
              </a> */}
              <Link to="/" className="opacity-60">
                Home
              </Link>
              <a href="/profile">Profile</a>
            </Breadcrumbs>
          </div>
          {type === "artisan" ? (
            <div className=" h-fit grid grid-cols-[300px_1fr]">
              <div>{side_bar}</div>
              {Dialog_cpt}
              {inputs}
            </div>
          ) : (
            <>{inputs}</>
          )}
        </>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
}

export default Profile;
