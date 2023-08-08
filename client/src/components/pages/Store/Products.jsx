import React from "react";
import Header from "../Layout/Header";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
} from "@material-tailwind/react";
import Hero from "../Layout/Carousel";

function Products() {
  const CardWithImage = (props) => {
    const { title, ImgUrl } = props;
    return (
      <>
        <Card
          shadow={false}
          className="relative grid h-[22rem] w-full max-w-[22rem] items-end justify-center overflow-hidden text-center"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            style={{
              backgroundImage: `url("${ImgUrl}")`,
            }}
            className="absolute inset-0 m-0 h-full w-full rounded-none transition-transform duration-700 transform hover:scale-110 bg-cover bg-center hover:cursor-pointer"
          >
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
          </CardHeader>
          <CardBody className="relative py-14   px-6 md:px-12">
            {/* <Typography
              variant="h2"
              color="white"
              className="mb-6 font-medium leading-[1.5]"
            >
              How we design and code open-source projects?
            </Typography> */}
            <Typography variant="h5" className="mb-4 text-gray-400">
              {title}
            </Typography>
            <Button variant="filled" color="white" size="md">
              explore
            </Button>
          </CardBody>
        </Card>
      </>
    );
  };
  const HeroSection = (
    <div className="bg-BrownLight h-32 flex items-center justify-center border-b-[2px] border-solid border-BrownDark">
      <Typography variant="h2" className="bg-BrownDark" textGradient>
        Our Categories
      </Typography>
    </div>
  );
  return (
    <>
      <Header />
      {HeroSection}
      <div className="flex gap-6 flex-wrap my-12 mx-9 justify-center">
        <CardWithImage
          ImgUrl="http://localhost:5000/images/categories/carpets.jpg"
          title="carpets"
        />
        <CardWithImage
          ImgUrl="http://localhost:5000/images/1.jpg"
          title="Ceramics and pottery"
        />
        <CardWithImage
          ImgUrl="http://localhost:5000/images/categories/wood.jpg"
          title="Wood"
        />
        <CardWithImage
          ImgUrl="http://localhost:5000/images/categories/dinaderie.jpg"
          title="The dinaderie"
        />
        <CardWithImage
          ImgUrl="http://localhost:5000/images/2.jpg"
          title="leather"
        />
        <CardWithImage
          ImgUrl="http://localhost:5000/images/categories/wicker.jpg"
          title="wicker"
        />
      </div>
    </>
  );
}

export default Products;
