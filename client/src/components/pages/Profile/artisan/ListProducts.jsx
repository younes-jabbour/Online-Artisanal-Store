import React, { useState, useEffect } from "react";
import Header from "../../Layout/Header";
import api from "../../api";
import { useUserContext } from "../../../../context/UserContext";

import {
  Card,
  Typography,
  Button,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import DialogCpt from "../component/DialogCpt";

const TABLE_HEAD = ["image", "name", "price", "category", "edit", "delete"];

function ListProducts() {
  const { userInfo } = useUserContext();
  const id = userInfo.id;
  console.log(userInfo);
  const [isLoading, setIsLoading] = React.useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [Mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState({});
  const [idDeletedProduct, setidDeletedProduct] = useState();
  const handleOpen = () => setOpen(!open);
  //Attention Drawer
  const [openAttentionDrawer, setOpenAttentionDrawer] = React.useState(false);

  const handleOpenAttentionDrawer = () =>
    setOpenAttentionDrawer(!openAttentionDrawer);

  console.log(tableRows);

  useEffect(() => {
    const handleClick = async () => {
      try {
        const response = await api.get(`product/${id}`);
        const products = response.data.products;
        const table_info = products.map((product) => {
          return {
            index: product.id,
            name: product.name,
            price: product.price,
            category: product.category.name,
            description: product.desc,
            image: product.image.path,
            imageId: product.imageId,
          };
        });
        setTableRows(table_info);
        setIsLoading(true);
        setMounted(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    handleClick();
    return () => {
      setMounted(false);
      setIsLoading(false);
      setTableRows(false);
    };
  }, []);

  //handle clicking to edit functions
  const DeleteProduct = () => async () => {
    try {
      const response = await api.delete(`/product/delete/${idDeletedProduct}`);
      console.log(response);
      handleOpenAttentionDrawer();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const AttentionDrawer = (
    <>
      <Dialog open={openAttentionDrawer} handler={handleOpenAttentionDrawer}>
        <DialogHeader>
          <Typography variant="h5" className=" m-auto" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" className="" variant="h4">
            You should read this!
          </Typography>
          <Typography className="text-center font-normal">
            Before you proceed, just wanted to make sure you're absolutely sure
            about deleting the product
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
            onClick={handleOpenAttentionDrawer}
          >
            close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={DeleteProduct(idDeletedProduct)}
          >
            Ok, i confirme
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );

  const Table = (
    <Card className="h-full max-w-max m-auto mt-10">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? tableRows.map((info) => {
                return (
                  <tr key={info.index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Avatar
                        src={info.image}
                        alt="products"
                        size="lg"
                        variant="rounded"
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {info.name}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {info.price}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {info.category}
                      </Typography>
                    </td>
                    {/* edit product */}
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Edit Product">
                        <IconButton
                          color="yellow"
                          onClick={() => {
                            setInfo({ ...info });
                            handleOpen();
                          }}
                          variant="text"
                        >
                          <PencilIcon className="h-4 w-4 " />
                        </IconButton>
                      </Tooltip>
                    </td>
                    {/* delete product */}
                    <td className="p-4 border-b border-blue-gray-50">
                      <Tooltip content="Delete product">
                        <IconButton
                          onClick={() => {
                            handleOpenAttentionDrawer();
                            setidDeletedProduct(info.index);
                          }}
                          color="red"
                          variant="text"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="brown" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="brown" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <>
      {Table}
      <DialogCpt open={open} handleOpen={handleOpen} info={info} />
      {AttentionDrawer}
    </>
  );
}
export default ListProducts;
