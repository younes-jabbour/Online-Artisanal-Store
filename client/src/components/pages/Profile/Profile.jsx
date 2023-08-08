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
  // IconButton,
  // SpeedDial,
  // SpeedDialHandler,
  // SpeedDialContent,
  // SpeedDialAction,
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
import Header from "../Layout/Header";
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
import { Navigate } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";

function Profile() {
  const location = useLocation();

  // const [selectedFile, setSelectedFile] = useState(null);
  // const [image, Setimage] = useState(null);
  const [categories, Setcategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  // const [info, setInfo] = useState({ name: "empty", email: "empty" });

  const { userInfo } = useUserContext();
  const id = userInfo.id;
  const type = userInfo.type;

  const { data, loading, error } = useFetchData(
    `http://localhost:5000/users/${type}/${id}`
  );
  // setInfo(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("desc", desc);
      formData.append("product_img", image);
      formData.append("categoryId", categoryId);

      const response = await api.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categorie");
        Setcategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  // const handleFileChange = (e) => {
  //   const formData = new FormData();
  //   formData.append("image", e.target.files[0]);
  //   Setinputs((prevState) => ({ ...prevState, product_img: formData }));
  // };

  // const FormatImages = () => {};

  const handleButtonClick = () => {
    // Call both functions when the button is clicked
    handleOpen();
  };

  const handlEyeClick = () => {
    setVisible(!visible);
  };

  const handleOpen = () => setOpen(!open);

  // const labelProps = {
  //   variant: "small",
  //   color: "blue-gray",
  //   className:
  //     "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal w-32 ",
  // };

  // const speed_dial = (
  //   <div className="relative h-12 w-full pr-10 border-solid border-2 border-green-700 ">
  //     <div className="absolute bottom-2 right-4">
  //       <SpeedDial>
  //         <SpeedDialHandler>
  //           <IconButton size="lg" className="rounded-full">
  //             <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
  //           </IconButton>
  //         </SpeedDialHandler>
  //         <SpeedDialContent>
  //           <SpeedDialAction>
  //             <HomeIcon className="h-5 w-5" />
  //             <Typography {...labelProps}>Create Product</Typography>
  //           </SpeedDialAction>
  //         </SpeedDialContent>
  //       </SpeedDial>
  //     </div>
  //   </div>
  // );

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
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
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
          Create your new product here 🪄
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
  //  border-red-300 border-solid border-2
  const inputs = (
    <div className="mt-[-2rem]  flex flex-col h-fit items-center">
      <div className=" rounded-full mb-3">
        {image ? (
          <Avatar src={image} alt="avatar" size="xl" />
        ) : (
          <CameraIcon className="h-12 w-12 " />
        )}
      </div>
      {/* { image &&  <img src={image} alt="image_uploaded" /> } */}
      <div
        className=" flex w-96 flex-col items-center shadow-
          sm  gap-6"
      >
        {data && (
          <>
            <Input size="md" variant="static" label="name" value={data.name} />
            <Input
              size="md"
              variant="static"
              label="email"
              value={data.email}
            />
          </>
        )}
        <Input
          size="md"
          variant="static"
          value="appah"
          type={visible ? "text" : "password"}
          id="input"
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
          variant="static"
          label="Drop your image here"
          type="file"
          className=""
          name="image"
          accept=".jpg, .png, .gif, .jpeg"
          // onChange={handleFileChange}  
        />
        {type === "artisan" && data && (<Textarea value={data.desc} className="" label="Description" />)  }
      </div>

      <Button variant="outlined" className="mt-1 w-36">
        update
      </Button>
    </div>
  );

  return (
    <>
      {userInfo.IsConnected ? (
        <>
          <Header />
          <div className="mt-7">
            <Breadcrumbs>
              {/* <a href="1" className="opacity-60">
                Docs
              </a> */}
              <a href="2" className="opacity-60">
                Home
              </a>
              <a href="3">Profile</a>
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
        <Navigate to="/" replace={true} state={{ from: location }} />
      )}
    </>
  );
}

export default Profile;
