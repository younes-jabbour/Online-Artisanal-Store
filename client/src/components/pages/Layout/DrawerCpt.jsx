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
const border_style = "border-solid border-red-300 border-2";

const orders_card = (
  <Card className="max-w-[30rem] max-h-[20rem] p-0 flex-row border-solid border-red-300 border-2">
    <CardHeader
      shadow={false}
      floated={false}
      className="m-0 w-2/5 shrink-0 rounded-r-none"
    >
      <img
        src={img_url}
        alt="card_image"
        className="h-full w-full object-cover"
      />
    </CardHeader>
    <CardBody className="m-0 pt-1 grow-0 border-solid border-red-300 border-2 ">
      <Typography variant="h4" color="blue-gray" className="">
        {/* poduct title here */}
        product title
      </Typography>
      <Typography color="gray" className="mb-8 font-normal">
        {/* description here , example : $product_name + from the category of + $category_name */}
        test
      </Typography>
      {/* { buttom place } */}
      <ButtonGroup variant="outlined" size="sm">
        <Button ripple={false}>
          <PlusIcon className="h-4 w-4" />
        </Button>
        <Chip value="1" className="px-3" />
        <Button ripple={false}>
          <MinusIcon className="h-4 w-4" />
        </Button>
      </ButtonGroup>
    </CardBody>
    <div className="flex flex-col justify-between border-solid border-red-300 border-2">
      <IconButton
        variant="text"
        ripple={false}
        className="border-solid border-red-300 border-2 justify-self-end hover:bg-[#F07470]/10 focus:shadow-[#333333]/20 active:shadow-[#333333]/10"
      >
        <TrashIcon color="red" className=" w-5 h-5" />
      </IconButton>
      <Chip value="12 MAD" className="mb-7 px-3" />
    </div>
  </Card>
);

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
        <div className="h-screen mb-56 flex flex-col overflow-y-auto">
          <div className="flex flex-row mt-6 flex-wrap gap-2">
            {orders_card}
            {orders_card}
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerCpt;
