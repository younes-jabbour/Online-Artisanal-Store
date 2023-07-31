import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import DrawerCpt from "./DrawerCpt";
import Logout from "../logout/Logout";
import { Link } from "react-router-dom";


import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/solid";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, PowerIcon } from "@heroicons/react/24/outline";

function Header({ count }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [Visible, Setvisible] = useState(false);

  useEffect(() => {
    if (count === 0) return Setvisible(true);
    else return Setvisible(false);
  }, [count]);

  // Drawer states
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const DrawerProps = {
    open: open,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const buttoms = (
    <div className="flex gap-1">
      <Button
        className="shadow-none hover:shadow-none "
        variant="gradient"
        size="sm"
      >
        <span className=""> Register</span>
      </Button>
      <Button className="flex items-center gap-2" variant="text" size="sm">
        Login
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
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>
    </div>
  );

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-16">
      <Typography
        as="li"
        color="blue-gray"
        className="p-1 flex gap-1 items-center  lg:text-base font-bold hover:text-blue-700"
      >
        <HomeIcon className="h-4 w-4 to-black" />
        <a href="http://home.com" className="flex items-center ">
          home
        </a>
      </Typography>
      <Typography
        as="li"
        color="blue-gray"
        className="p-1 flex items-center gap-1 font-bold lg:text-base"
      >
        <ShoppingBagIcon className="w-4 h-4" />
        <a
          href="http://home.com"
          className="flex items-center hover:text-blue-700"
        >
          product
        </a>
      </Typography>
      <Typography
        as="li"
        color="blue-gray"
        className="p-1 flex gap-1 items-center font-bold lg:text-"
      >
        <BookOpenIcon className="w-4 h-4" />
        <a
          href="http://home.com"
          className="flex items-center hover:text-blue-700"
        >
          learn
        </a>
      </Typography>
    </ul>
  );
  const shoppingCard = (
    <div onClick={openDrawer} className="mr-2">
      <Badge content={count} invisible={Visible} withBorder>
        <IconButton variant="text">
          <ShoppingCartIcon className="h-7 w-7 to-black" />
        </IconButton>
      </Badge>
    </div>
  );

  const UserMenu = (
    <Menu>
      <MenuHandler>
        <IconButton variant="text">
          <UserIcon className="h-7 w-7" />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <MenuItem className=" flex items-center gap-1">
          <UserCircleIcon className="h-5 w-5" />
          <span>My Profile</span>
        </MenuItem>
        <MenuItem onClick={Logout} className=" text-red-800 flex items-center gap-1">
          <PowerIcon className="h-4 w-4" />
          <Link to="/Login" preventScrollReset={true}>
          <span>Log out</span>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );

  return (
    <>
      <Navbar className="sticky top-0 z-10 py-4 max-w-full rounded-none  px-4 lg:px-8 lg:py-2">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer text-4xl text-brown-700 py-1.5 font-Rasputin"
          >
            7irafi.
          </Typography>
          <div className="hidden lg:block">{navList}</div>
          <div className="hidden lg:flex gap-2">
            {UserMenu}
            {shoppingCard}
            {buttoms}
          </div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className="container mb-2 mx-auto">
            {navList}
            {shoppingCard}
            {UserMenu}
            <div className="flex flex-wrap gap-2">{buttoms}</div>
          </div>
        </Collapse>
      </Navbar>
      <DrawerCpt props={DrawerProps} />
    </>
  );
}

export default Header;
