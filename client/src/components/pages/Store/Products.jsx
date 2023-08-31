import React, { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Select,
  Option,
  Input,
  CardFooter,
} from "@material-tailwind/react";
import img_1 from "../../../assets/categories/carpets.jpeg";
import img_2 from "../../../assets/categories/ceramic.jpeg";
import img_3 from "../../../assets/categories/dinaderie.jpeg";
import img_4 from "../../../assets/categories/leather.jpeg";
import img_5 from "../../../assets/categories/wicker.jpeg";
import img_6 from "../../../assets/categories/wood.jpeg";

import useFetchData from "../../../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../../redux/cartRedux";
import { addproduct } from "../../../redux/ProductSlice";
import { Link } from "react-router-dom";

function Products() {
  const [ImgUrl, setImgUrl] = useState([]);
  const [category, setCategory] = useState([]);
  const [Products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [noMatchingProducts, setNoMatchingProducts] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [Quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const filtered = Products.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.categoryId === selectedCategory;

      const productName = product.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = productName.includes(query);
      const matchesPrice = maxPrice === null || product.price <= maxPrice;

      if (
        selectedCategory !== null &&
        searchQuery !== "" &&
        maxPrice !== null
      ) {
        return matchesCategory && matchesSearch && matchesPrice;
      } else if (selectedCategory !== null) {
        return matchesCategory;
      } else if (searchQuery !== "") {
        return matchesSearch;
      } else if (maxPrice !== null) {
        return matchesPrice;
      }

      return true; // No filters applied, include all products
    });

    // Check if there are no matching products
    const noMatching = Products.length > 0 && filtered.length === 0;
    setNoMatchingProducts(noMatching);

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, Products, maxPrice]);

  const { data, error } = useFetchData("http://localhost:5000/categorie");
  const { data: products } = useFetchData("http://localhost:5000/product");

  useEffect(() => {
    if (data) {
      setCategory(data);
    } else {
      console.error("Error fetching categories:", error);
    }
    return () => {
      setCategory([]);
    };
  }, [data]);

  useEffect(() => {
    if (products) {
      setProducts(products.products);
    }
    return () => {
      setProducts([]);
    };
  }, [products]);

  useEffect(() => {
    let isMOunted = true;
    if (isMOunted) {
      setImgUrl([img_1, img_2, img_3, img_4, img_5, img_6]);
    }
    return () => {
      isMOunted = false;
      setImgUrl([]);
    };
  }, []);

  const MoreDetailsButton = (props) => {
    const { id, product } = props;
    return (
      <Link to={`/products/${id}`}>
        <Button
          ripple={false}
          className="flex items-center gap-1 bg-blue-gray-900/10 text-blue-gray-900 max-w-max shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          onClick={() => dispatch(addproduct(product))}
        >
          More Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </Button>
      </Link>
    );
  };

  const CardProduct = (props) => {
    const { id, image, name, price, desc, category } = props;

    const product = { id, image, name, price, desc , category };

    const handleClick = () => {
      dispatch(addProduct(product));
    };

    return (
      <Card className="w-96">
        <CardHeader shadow={false} floated={false} className="h-72">
          <img
            src={props.image}
            alt="card"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {props.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${props.price}.00
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {props.desc.substring(0, 100) + "..."}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-between">
          <Button
            onClick={handleClick}
            ripple={false}
            className="bg-blue-gray-900/10 text-blue-gray-900 max-w-max shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </Button>
          <MoreDetailsButton id={id} product={product} />
        </CardFooter>
      </Card>
    );
  };

  const CardWithImage = (props) => {
    const { title, ImgUrl } = props;
    return (
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
    );
  };

  const HeroSection = (
    <div className="bg-BrownLight h-32 flex items-center justify-center border-b-[2px] border-solid border-BrownDark">
      <Typography variant="h2" className="text-BrownDark">
        Our Categories
      </Typography>
    </div>
  );

  const AllProductSection = (
    <>
      <Typography
        variant="h4"
        className=" pt-11 mx-4 pb-2 mb-12 bordere-2 text-BrownDark border-b-[1px] border-solid border-BrownDark"
      >
        All Products are available Here.
      </Typography>
      {/* filter */}
      <div className="flex justify-between mx-4 mb-10">
        <div className="w-72">
          <Select
            color="blue"
            onChange={(value) => setSelectedCategory(value)}
            label="Select categorie"
          >
            {category &&
              category.map((categorie) => (
                <Option key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </Option>
              ))}
          </Select>
        </div>
        <div className="w-28">
          <Input
            type="number"
            min="1"
            label="Max Price"
            value={maxPrice || ""}
            onChange={(e) =>
              setMaxPrice(
                e.target.value !== "" ? parseFloat(e.target.value) : null
              )
            }
          />
        </div>
        <div className="w-72">
          <Input
            label="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          size="md"
          variant="text"
          ripple={false}
          className="flex gap-1 items-center"
          color="gray"
          onClick={() => {
            setSelectedCategory(null);
            setSearchQuery("");
            setMaxPrice(null);
            setClicked(false);
          }}
        >
          <span>see all products</span>
          <ArrowLongRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </>
  );

  return (
    <>
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
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {noMatchingProducts ? (
          <Typography>No matching products found.</Typography>
        ) : (
          filteredProducts.map((product) => (
            <CardProduct
              id={product.id}
              image={product.image ? product.image.path : ""}
              desc={product.desc}
              price={product.price}
              name={product.name}
              category={product.category.name}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Products;
