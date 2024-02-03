import React, { useEffect, useState } from "react";
import {
  Select,
  Option,
  Textarea,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
} from "@material-tailwind/react";
import useFetchData from "../../../../hooks/useFetchData";
import api from "../../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function DialogCpt(props) {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
  ];
  const modules = {
    toolbar: toolbarOptions,
  };

  const { open, handleOpen, info } = props;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setName(info.name);
    setPrice(info.price);
    setDesc(info.description);
    setCategoryId(info.category);
    return () => {
      setName("");
      setPrice("");
      setDesc("");
      setCategoryId("");
    };
  }, [info]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("desc", desc);
      formData.append("product_img", image);
      formData.append("categoryId", categoryId);
      formData.append("imageId", info.imageId);
      // console.log(formData);

      // this loop is for testing the formData
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      const response = await api.put(`/product/update/${info.index}`, formData);
      console.log(response);
      handleOpen();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const { data, loading, error } = useFetchData(
    "http://localhost:5000/categorie"
  );

  // fetching categories from the api
  useEffect(() => {
    setCategories(data);
  }, [data, info]);
  // return of the component
  return (
    <Dialog
      open={open}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      andler={handleOpen}
    >
      <DialogHeader className="flex justify-center">
        {/* <span></span> // title */}
        <Avatar src={info.image} alt="products" size="xxl" />
      </DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col items-center">
          <div className="w-[30rem] flex flex-col gap-4">
            {/* Product name */}
            <Input
              name="name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Product name"
            />
            {/* Product category */}
            <Select
              size="lg"
              value={categoryId}
              onChange={(value) => setCategoryId(value)}
              label="Select a categorie here"
            >
              {categories &&
                categories.map((category) => (
                  <Option
                    value={category.name}
                    name="category"
                    children={category.name}
                  ></Option>
                ))}
            </Select>
            {/* Product price */}
            <Input
              name="price"
              variant="outlined"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {/* Product description */}
            {/* <Textarea
              size="lg"
              label="Add a Description here of the Product"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
            /> */}
            {/* <div > */}
              <ReactQuill
                modules={modules}
                theme="snow"
                value={desc}
                onChange={setDesc}
                className="overflow-auto max-h-[9rem]"
              />
            {/* </div> */}
            {/* Product image */}
            <Input
              size="lg"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept=".jpg, .png, .gif, .jpeg"
              type="file"
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
  );
}

export default DialogCpt;
