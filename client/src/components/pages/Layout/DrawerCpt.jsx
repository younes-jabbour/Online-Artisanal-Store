import React from "react";
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
  // TrashIcon,
} from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

const img_url =
  "https://www.lavieeco.com/wp-content/uploads/2023/04/porterie-artisanat-maroc-tourisme-maroc.jpg";

const OrderCard = () => {
  return (
    <Card className="max-w-[26rem] max-h-[110px] p-0 flex-row ">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none"
      >
        <img
          src={img_url}
          alt="card_image"
          className="h-full m-0 w-full object-cover"
        />
      </CardHeader>
      <CardBody className="m-0 pt-1 flex flex-col justify-between">
        <Typography variant="h4" color="blue-gray" className="">
          product title
        </Typography>

        <ButtonGroup variant="outlined" className="mb-[-1rem]" size="sm">
          <Button ripple={false}>
            <PlusIcon className="h-4 w-4" />
          </Button>
          <Chip value="1" className="px-3" />
          <Button ripple={false}>
            <MinusIcon className="h-4 w-4" />
          </Button>
        </ButtonGroup>
      </CardBody>
      <div className="flex flex-col justify-between items-center">
        <IconButton variant="text" color="red" ripple={false}>
          <TrashIcon color="red" className=" w-5 h-5" />
        </IconButton>
        <Chip value="12 $" className="px-3 mb-3" />
      </div>
    </Card>
  );
};
export function DrawerCpt({ props }) {
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
        <div className="h-screen border-red-600 border-2 border-solid grid grid-cols-2 overflow-y-auto">
          <div className="flex flex-row flex-wrap gap-3 border-black border-2 border-solid overflow-y-auto">
            <OrderCard />
          </div>
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
              <div className=" flex justify-between">
                <span>item 1</span>
                <span>12$</span>
              </div>
              <hr />
              <div className=" flex justify-between mt-10">
                <span>Total</span>
                <Chip value="12$" className="w-10" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button shadow={false} fullWidth>
                Go to paymenent
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerCpt;
