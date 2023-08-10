import React, { useEffect } from "react";
import Header from "../Layout/Header";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemSuffix,
  Radio,
  Slider,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import img_1 from "../../../assets/categories/carpets.jpeg";
import img_2 from "../../../assets/categories/ceramic.jpeg";
import img_3 from "../../../assets/categories/dinaderie.jpeg";
import img_4 from "../../../assets/categories/leather.jpeg";
import img_5 from "../../../assets/categories/wicker.jpeg";
import img_6 from "../../../assets/categories/wood.jpeg";

function Products() {
  const [ImgUrl, setImgUrl] = React.useState([]);
  const [SilderValue, setSliderValue] = React.useState(0);

  useEffect(() => {
    let isMOunted = true;
    console.log("mounted", isMOunted);
    if (isMOunted) {
      setImgUrl([img_1, img_2, img_3, img_4, img_5, img_6]);
    }
    return () => {
      isMOunted = false;
      setImgUrl([]);
      console.log("Mounted", isMOunted);
    };
  }, []);
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
      <Typography variant="h2" className="text-BrownDark">
        Our Categories
      </Typography>
    </div>
  );

  const ListItems = (props) => {
    // const [selected, setSelected] = React.useState(1);
    // const setSelectedItem = (value) => setSelected(value);
    return (
      <ListItem
      // selected={selected === props.id}
      // onClick={() => setSelectedItem(props.id)}
      >
        {" "}
        <div className="flex w-full cursor-pointer items-center px-3">
          <Typography color="blue-gray" className="font-medium">
            {props.title}
          </Typography>
          <ListItemSuffix className="mr-2">
            <Radio
              color="brown"
              name="vertical-list"
              ripple={false}
              containerProps={{
                className: "p-0",
              }}
            />
          </ListItemSuffix>
        </div>
      </ListItem>
    );
  };

  const AllProductSection = (
    <>
      <div>
        <Typography
          variant="h4"
          className=" pt-11 mx-4 pb-2 mb-12 bordere-2 text-BrownDark border-b-[1px] border-solid border-BrownDark"
        >
          All Products is Here.
        </Typography>
      </div>
      <div className="flex flex-col gap-7 mx-4  w-[400px] h-full border-solid border-2 border-red-400 ">
        <div className="mt-8 w-80">
          <Input className="" color="brown" label="Search" />
        </div>
        <Card className="w-80 border-solid border-2 border-red-400">
          <Typography className="my-4 text-center" variant="h5" color="gray">
            Choose by Categories
          </Typography>
          <List>
            <ListItems id={1} title="carpets" />
            <ListItems id={2} title="Ceramics and pottery" />
            <ListItems id={3} title="dinaderie" />
            <ListItems id={4} title="leather" />
            <ListItems id={5} title="wicker" />
            <ListItems id={6} title="wood" />
          </List>
        </Card>
        <div className="w-80 mb-96">
          <Typography className="mb-6" variant="h5" color="gray">
            Choose by price
          </Typography>
          <Tooltip content={SilderValue}>
            <Slider
            className="w-12"
              color="brown"
              value={SilderValue}
              onChange={(e) => {
                setSliderValue(parseInt(e.target.value));
              }}
            />
          </Tooltip>
          <input type="range" min="0" max="100" />
        </div>
      </div>
    </>
  );

  return (
    <>
      <Header />
      {HeroSection}
      <div className="flex gap-6 flex-wrap my-12 mx-9 justify-center">
        <CardWithImage ImgUrl={ImgUrl[0]} title="carpets" />
        <CardWithImage ImgUrl={ImgUrl[1]} title="Ceramics and pottery" />
        <CardWithImage ImgUrl={ImgUrl[2]} title="dinaderie" />
        <CardWithImage ImgUrl={ImgUrl[3]} title="leather" />
        <CardWithImage ImgUrl={ImgUrl[4]} title="wicker" />
        <CardWithImage ImgUrl={ImgUrl[5]} title="wood" />
      </div>
      {AllProductSection}
    </>
  );
}

export default Products;
