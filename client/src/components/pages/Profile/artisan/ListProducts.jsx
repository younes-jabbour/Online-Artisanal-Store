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
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import DialogCpt from "../component/DialogCpt";

const TABLE_HEAD = ["image", "name", "price", "category", "edit", "delete"];

function ListProducts() {
  const { userInfo } = useUserContext();
  const id = userInfo.id;
  const [isLoading, setIsLoading] = React.useState(false);
  const [tableRows, setTableRows] = useState([]);
  const [Mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState({});
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    const handleClick = async () => {
      try {
        const response = await api.get(`product/${id}`);
        const products = response.data.products;
        console.log(products);
        const table_info = products.map((product) => {
          return {
            index: product.id,
            name: product.name,
            price: product.price,
            category: product.category.name,
            description: product.desc,
            image: product.image.path,
            imageId : product.imageId,
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
  const DeleteProduct = (id) => async () => {
    try {
      const response = await api.delete(`/product/delete/${id}`);
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
                          onClick={DeleteProduct(info.index)}
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
      <Header />
      {Table}
      <DialogCpt open={open} handleOpen={handleOpen} info={info} />
    </>
  );
}
export default ListProducts;
