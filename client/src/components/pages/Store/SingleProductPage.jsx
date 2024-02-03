import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Chip,
  Button,
  Typography,
  Rating,
  Input,
  Textarea,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { selectProduct } from "../../../redux/ProductSlice";
import { addProduct } from "../../../redux/cartRedux";
import { PublicApi } from "../api";
import { useUserContext } from "../../../context/UserContext";
import moment from "moment";
import AttentionDialog from "../Profile/AttentionDialog";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function SingleProductPage() {
  const { id } = useParams();
  const product = useSelector(selectProduct);
  const dispatch = useDispatch();
  const { userInfo } = useUserContext();

  const [valueRating, setvalueRating] = useState(0);
  const [comment, setcomment] = useState(" ");
  const [comments, setcomments] = useState([]);
  const [openAttentionDrawer, setOpenAttentionDrawer] = useState(false);
  const [idDeleted, setidDeleted] = useState();

  const handleOpenAttentionDrawer = () =>
    setOpenAttentionDrawer(!openAttentionDrawer);

  useEffect(() => {
    const first = async () => {
      try {
        const res = await PublicApi.get(`/product/comment/${id}`);
        setcomments(res.data.comments);
        console.log(res.data.comments);
      } catch (error) {
        console.log(error);
      }
    };

    first();

    return () => {
      setcomments([]);
    };
  }, []);

  // POST new comment
  const handleSubmit = async () => {
    if (!userInfo.IsConnected)
      return window.alert("you must be connected to comment !");

    try {
      await PublicApi.post(`/product/comment/${id}/${userInfo.id}`, {
        text: comment,
        rate: valueRating,
      }).then((res) => {
        window.alert(" thanks for comment ! ");
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (Commentid) => {
    try {
      await PublicApi.delete(`/product/comment/delete/${Commentid}`).then(
        () => {
          window.location.reload();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mb-[10rem]">
        <>
          <div className="grid grid-cols-2 gap-4 mt-[5rem] ">
            <div className="w-[30rem] m-auto h-[20rem]">
              <img
                src={product.image}
                className="h-full w-full rounded-lg object-cover shadow-xl shadow-blue-gray-900/10"
                alt="Testing"
              />
            </div>
            <div className="">
              <div className="">
                <Typography variant="h2" className="mb-2">
                  {product.name}
                </Typography>
                <Chip
                  value={product.category}
                  color={
                    product.category === "Wicker"
                      ? "green"
                      : product.category === "leather"
                      ? "orange"
                      : product.category === "The dinaderie"
                      ? "red"
                      : product.category === "carpets"
                      ? "orange"
                      : product.category === "Ceramics and pottery"
                      ? "purple"
                      : "gray"
                  }
                  variant="ghost"
                  className="w-fit mb-8"
                />
                {/* <p className="p-2">{product.desc}</p> */}
                <div className="mr-[5rem] mb-[1rem]">
                  <ReactQuill
                    value={product.desc}
                    readOnly={true}
                    theme={"bubble"}
                  />
                </div>
                <div className="flex justify-between items-center mb-6 ">
                  <Chip
                    value={`${product.price} $`}
                    color="gray"
                    variant="ghost"
                    className="w-fit text-sm"
                  />
                  <Rating
                    unratedColor="amber"
                    onChange={(value) => {
                      setvalueRating(value);
                    }}
                    value={valueRating}
                    ratedColor="amber"
                    className="mr-16"
                  />
                </div>
                <Button
                  onClick={() => {
                    dispatch(addProduct(product));
                  }}
                  className="flex items-center gap-1 bg-blue-gray-900/10 text-blue-gray-900 max-w-max shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  <span>Add to cart</span>
                  <ShoppingCartIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="w-96 mt-[5rem] ml-20">
              <div className="">
                {comments &&
                  comments.map((singleComment) => (
                    <Card
                      shadow={true}
                      color="white"
                      className="w-full p-4 max-w-[26rem] mb-4"
                    >
                      <CardHeader
                        color="transparent"
                        floated={false}
                        shadow={false}
                        className="mx-0 flex items-center gap-4 pt-0 pb-8"
                      >
                        {singleComment.User.ImgUrl ? (
                          <Avatar
                            size="lg"
                            variant="circular"
                            src={singleComment.User.ImgUrl}
                            alt="tania andrew"
                          />
                        ) : (
                          <UserCircleIcon className="h-10 w-10" />
                        )}
                        <div className="flex w-full flex-col gap-0.5">
                          <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray">
                              {singleComment.User.name}
                            </Typography>
                            <div className="5 flex items-center gap-0">
                              {parseInt(singleComment.rate) > 0 && (
                                <Rating
                                  value={parseInt(singleComment.rate)}
                                  readonly
                                />
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <Typography color="blue-gray">
                              Posted {moment(singleComment.date).fromNow()}
                            </Typography>
                            {userInfo.id === singleComment.User.id && (
                              <Menu placement="right-end">
                                <MenuHandler>
                                  <EllipsisVerticalIcon className="h-5 w-5 hover:cursor-pointer" />
                                </MenuHandler>
                                <MenuList>
                                  <MenuItem className="flex items-center">
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    <span className="">Edit</span>
                                  </MenuItem>
                                  <MenuItem
                                    className="flex items-center"
                                    onClick={() => {
                                      handleOpenAttentionDrawer();
                                      setidDeleted(singleComment.id);
                                    }}
                                  >
                                    <TrashIcon
                                      color="red"
                                      className="h-4 w-4 mr-2"
                                    />
                                    <span className="text-red-500">Delete</span>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="mb-6 p-0">
                        <Typography>{singleComment.text}</Typography>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            </div>
            <div>
              <Typography variant="h4" className="mt-[5rem] mb-4">
                leave a comment
              </Typography>
              <div className=" flex gap-2">
                <div className="flex w-full max-w-[28rem] ">
                  <Textarea
                    // label="comment"
                    color="gray"
                    value={comment}
                    containerProps={{
                      className: "min-w-0",
                    }}
                    onChange={(e) => setcomment(e.target.value)}
                  />
                </div>
                <Button
                  size="sm"
                  variant="gradient"
                  color={comment ? "green" : "gray"}
                  disabled={!comment}
                  className="rounded w-fit h-fit"
                  onClick={() => handleSubmit()}
                >
                  submit
                </Button>
              </div>
            </div>
          </div>
        </>
      </div>
      <AttentionDialog
        openAttentionDrawer={openAttentionDrawer}
        handleOpenAttentionDrawer={handleOpenAttentionDrawer}
        Delete={deleteComment}
        idDeleted={idDeleted}
        name="comment"
      />
    </>
  );
}

export default SingleProductPage;
