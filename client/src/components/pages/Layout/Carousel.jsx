import React, { useState } from "react";
import Header from "./Header";
import {
  Carousel,
  Typography,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import { addProduct } from "../../../redux/cartRedux";
import { useDispatch } from "react-redux";

const urls = [
  "http://localhost:5000/images/1.jpeg",
  "http://localhost:5000/images/2.jpeg",
  "http://localhost:5000/images/3.jpg",
];

function Hero() {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  // const handleAddToCart = () => {};

  const HandleClick = () => {
    setQuantity(quantity + 1);
    dispatch(addProduct({ quantity: quantity }));
  };

  const heroSection = (
    <div className=" mt-10 flex items-center justify-center h-80 ">
      <Typography
        variant="h2"
        className=" gap-1 flex flex-col items-center justify-center text-center "
        color="brown"
        textGradient
      >
        Welcome to our Artisanal{" "}
        <span className=" border-b-orange-200 border-b-4 border-solid">
          Wonderland!
        </span>
        <Typography
          variant="paragraph"
          className="text-center   font-Quicksand w-3/6"
        >
          Hello there, kindred spirits of craftsmanship and creativity! Step
          into our world of artisanal delights, where each product carries the
          heartwarming touch of skilled artisans
        </Typography>
        <Button variant="filled" color="brown">
          outlined
        </Button>
      </Typography>
    </div>
  );

  const [count, SetCount] = useState(0);

  const card = (
    <Card shadow={true} className="w-96">
      <CardHeader floated={false} className="h-52">
        <img
          src="https://picsum.photos/200/200"
          alt="cards"
          className="object-cover h-52 w-96"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            Apple AirPods
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            $95.00
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          With plenty of talk and listen time, voice-activated Siri access, and
          an available wireless charging case.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          onClick={HandleClick}
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );

  const BestSells = (
    <div className="border-2 border-solid  pb-28 bg-orange-50">
      <Typography variant="h2" className="my-10 text-BrownDark text-center">
        Our best sells
      </Typography>
      <div className="mx-12 flex gap-3 justify-center flex-wrap ">
        {card}
        {card}
        {card}
      </div>
    </div>
  );

  const ArtisanAvatars = (
    <div className="flex items-center -space-x-4">
      <Avatar
        variant="circular"
        alt="user 1"
        size="xxl"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
      <Avatar
        variant="circular"
        alt="user 2"
        size="xxl"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
      />
      <Avatar
        variant="circular"
        alt="user 3"
        size="xxl"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
      />
      <Avatar
        variant="circular"
        alt="user 4"
        size="xxl"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
      />
      <Avatar
        variant="circular"
        alt="user 5"
        size="xxl"
        className="border-2 border-white hover:z-10 focus:z-10"
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
      />
    </div>
  );

  return (
    <>
      <Header count={count} />
      <div className="hidden lg:block ">
        <Carousel className=" overflow-hidden">
          <div className="relative h-full w-full ">
            <img
              src={urls[0]}
              alt=" 1"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
              <div className="w-3/4 text-center md:w-2/4">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  The beauty of artisanal world{" "}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-0 opacity-80 leading-loose"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem dicta cumque velit ratione nostrum maxime a quaerat
                  impedit iste vero!
                </Typography>
                <div className="flex justify-center gap-2">
                  <Button size="lg" color="white">
                    Go to Store
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-full w-full">
            <img
              src={urls[1]}
              alt=" 2"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
              <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl w-[500px]  md:text-4xl lg:text-5xl"
                >
                  Creativity & craftsmanship ,with 100% handmade creations
                  products
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-0 opacity-80 "
                ></Typography>
                <div className="flex gap-2">
                  <Button size="lg" color="white">
                    Explore
                  </Button>
                  <Button size="lg" color="white" variant="text">
                    Gallery
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-full w-full">
            <img
              src={urls[2]}
              alt=" 3"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
              <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  Learn to create your own handmade products
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-12 opacity-80"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
                  tempora!
                </Typography>
                <div className="flex gap-2">
                  <Button size="lg" color="white" variant="text">
                    Go to learn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="lg:hidden block">{heroSection}</div>
      {BestSells}

      <div className="flex flex-wrap justify-center gap-9 lg:grid lg:grid-cols-2 lg:gap-2 h-80  place-items-center place-content-center bg-BrownLight ">
        <Typography variant="small" className=" ml-20 font-medium text-base">
          Step into a world of creativity and craftsmanship with over{" "}
          <strong>200</strong> skilled Artisans, all dedicated to sharing the
          enchanting art of handcrafting with
          <span className="ml-1 border-b-orange-800 border-b-4 border-solid text-BrownDark font-bold text-3xl">
            You!
          </span>
        </Typography>
        <div>{ArtisanAvatars}</div>
      </div>
    </>
  );
}

export default Hero;
