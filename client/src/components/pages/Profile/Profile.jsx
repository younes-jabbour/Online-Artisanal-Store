import React, { useState, useEffect } from "react";

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
import { Navigate, Link } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";

function Profile() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setoldPassword] = useState(null);
  const [newPassword, setnewPassword] = useState(null);
  const [descUser, setDescUser] = useState("");
  const [imgUser, setImgUser] = useState(null);

  const { userInfo } = useUserContext();
  const id = userInfo.id;
  const type = userInfo.type;

  const { data } = useFetchData(`http://localhost:5000/users/${id}`);
  useEffect(() => {
    const FetchData = () => {
      if (data) {
        setUserName(data.name);
        setEmail(data.email);
        setDescUser(data.desc);
        setImageUrl(data.ImgUrl);
      }
    };
    FetchData();
  }, [data]);

  const [categories, Setcategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [imgUrl, setImageUrl] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //users update info

  const [disabled, setDisabled] = useState(true);
  const [Selected, setSelected] = useState(1);
  const [errors, setErrors] = useState({});
  const [ErrorMessage, setErrorMessage] = useState(" ");


  // const validateForm = () => {
  //   const newErrors = {};
  //   // Validate password (Example: Password must be at least 6 characters long)
  //   if (oldPassword.length < 6) {
  //     newErrors.oldPassword = "Password must be at least 6 characters long";
  //   }
  //   if (newPassword.length < 6) {
  //     newErrors.newPassword = "Password must be at least 6 characters long";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0; // Return true if there are no errors
  // };

  // useEffect(() => {
  //   if (oldPassword && newPassword) {
  //     if (oldPassword.length >= 6) {
  //       setErrors({ ...errors, oldPassword: "" });
  //     }
  //     if (newPassword.length >= 6) {
  //       setErrors({ ...errors, newPassword: "" });
  //     }
  //   }
  // }, [oldPassword, newPassword, errors]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgUser(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const UpdateUserInfo = async (e) => {
    // update request handler
    // if (newPassword && oldPassword) {
    //   const isValid = validateForm();
    //   if (!isValid) return;
    // }
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", userName);
      formData.append("email", email);
      formData.append("image", imgUser);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      if (type === "artisan") formData.append("desc", descUser);

      await api
        .put(`/users/update/${id}`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        });
    } catch (err) {
      if (!err.response) {
        setErrorMessage("No server response");
        console.log(err);
      } else if (err.response && err.response.status === 404)
        setErrorMessage("user not found!");
      else if (err.response && err.response.status === 400)
        setErrorMessage("wrong old password !");
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

      const response = await api.post(`/product/newProduct/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
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
        <ListItem Selected={Selected === 1} onClick={() => setSelected(1)}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem selected={Selected === 3} onClick={() => setSelected(3)}>
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
            <ListItemSuffix></ListItemSuffix>
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
        <ListItem className="text-red-800">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 " />
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
            <Avatar src={image} alt="avatar" className="h-20 w-20" />
          ) : imgUrl ? (
            <Avatar src={imgUrl} alt="avatar" className="h-20 w-20" />
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
                // value={disabled ? data.name : null}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                size="md"
                variant="outlined"
                label="email"
                disabled={disabled}
                // value={disabled ? data.email : null}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
          <Input
            size="md"
            variant="outlined"
            value={oldPassword}
            type={visible ? "text" : "password"}
            id="input1"
            disabled={disabled}
            label="old password"
            onChange={(e) => setoldPassword(e.target.value)}
            icon={
              visible ? (
                <EyeSlashIcon onClick={handlEyeClick} />
              ) : (
                <EyeIcon onClick={handlEyeClick} />
              )
            }
          />
          {/* {errors && (
            <Typography variant="small" className="text-red-500 m-0 p-0">
              {errors.oldPassword}
            </Typography>
          )} */}
          <Input
            size="md"
            variant="outlined"
            type="text"
            id="input2"
            disabled={disabled}
            label="new password"
            onChange={(e) => setnewPassword(e.target.value)}
            value={newPassword}
          />
          {/* {errors && (
            <Typography variant="small" className="text-red-500 m-0 p-0">
              {errors.newPassword}
            </Typography>
          )} */}
          <Input
            size="md"
            variant="outlined"
            label="Drop your image here"
            type="file"
            className=""
            name="image"
            accept=".jpg, .png, .gif, .jpeg"
            disabled={disabled}
            onChange={handleImageChange}
          />
          {type === "artisan" && data && (
            <Textarea
              value={descUser}
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
              {Selected === 1 && inputs}
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
