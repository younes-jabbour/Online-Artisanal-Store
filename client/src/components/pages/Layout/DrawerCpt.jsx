import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ButtonGroup,
  Chip,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  MinusIcon,
  MinusCircleIcon,
  MinusSmallIcon,
  PlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeProduct,
  increaseProduct,
  decreaseProduct,
} from "../../../redux/cartRedux";

import api from "../api";

import { useUserContext } from "../../../context/UserContext";

const img_url =
  "https://www.lavieeco.com/wp-content/uploads/2023/04/porterie-artisanat-maroc-tourisme-maroc.jpg";

function ShoppingCart() {
  const cartItems = useSelector((state) => state.cart.products);

  return (
    <>
      {cartItems.map((item) => (
        <OrderCard item={item} />
      ))}
    </>
  );
}
const OrderCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <Card className="max-w-[26rem] max-h-[110px] p-0 flex-row ">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={item.image}
          alt="card_image"
          className="h-full m-0 w-full object-cover"
        />
      </CardHeader>
      <CardBody className="m-0 pt-1 flex flex-col justify-between">
        <Typography variant="h4" color="blue-gray" className="">
          {item.name}
        </Typography>

        <ButtonGroup variant="outlined" className="mb-[-1rem]" size="sm">
          <Button
            onClick={() => dispatch(increaseProduct(item))}
            ripple={false}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Chip value={item.quantity} className="px-3" />
          <Button
            ripple={false}
            onClick={() => dispatch(decreaseProduct(item))}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
        </ButtonGroup>
      </CardBody>
      <div className="flex flex-col justify-between items-center">
        <IconButton
          variant="text"
          color="red"
          onClick={() => dispatch(removeProduct(item))}
          ripple={false}
        >
          <TrashIcon color="red" className=" w-5 h-5" />
        </IconButton>
        <Chip value={item.price+" $"} className="px-3 mb-3" />
      </div>
    </Card>
  );
};
export function DrawerCpt({ props }) {
  const { userInfo } = useUserContext();

  const cartItems = useSelector((state) => state.cart.products);
  const Total = useSelector((state) => state.cart.Total);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const products = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
    setProducts(products);
  }, [cartItems]);

  const handleClickPayement = async (e) => {
    e.preventDefault();
    try {
      await api.post("payment/checkout", Products).then((res) => {
        window.location.href = res.data.url;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { open, closeDrawer, openDrawer } = props;

  return (
    <React.Fragment>
      <Drawer
        open={open}
        placement="right"
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            <div className="flex items-center gap-2">
              <span> Your bag is here </span>
              <ShoppingBagIcon className="h-5 w-5 ml-2" />
            </div>
          </Typography>
          <IconButton
            variant="text"
            className=""
            color="blue-gray"
            onClick={closeDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        {/* overflow-scroll */}
        <div className="h-screen  grid m-0 p-0 grid-cols-2 overflow-y-auto">
          <div className="flex flex-row flex-wrap   overflow-y-auto">
            <ShoppingCart />
          </div>
          {cartItems.length > 0 && (
            <Card className="mt-6 w-96 h-fit justify-self-center ">
              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 text-center"
                >
                  Summary of your items
                </Typography>
                <br />
                <>
                  <>
                    {cartItems.map((item) => (
                      <div className="flex justify-between" key={item.id}>
                        <span>{item.name}</span>
                        <span>{item.TotalPrice} $</span>
                      </div>
                    ))}
                  </>
                </>

                <div className=" flex justify-between mt-10">
                  <span>Total</span>
                  <div>{Total+ " $"}</div>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button
                  onClick={
                    userInfo?.IsConnected
                      ? handleClickPayement
                      : () => window.alert("You need to login first")
                  }
                  shadow={false}
                  fullWidth
                >
                  CHECKOUT
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerCpt;
