import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Chip,
  Input,
  Button,
} from "@material-tailwind/react";
import { PencilSquareIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import api from "../../pages/api";
import axios from "axios";

function LessonForm(props) {

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
    const modules =  {
      toolbar: toolbarOptions,
    };

  const [Text, setText] = useState(""); // for description
  const [Title, setTitle] = useState("");

  const id = props.CourseId;

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageInputKey, setImageInputKey] = useState(Date.now());

  const [videoInputKey, setVideoInputKey] = useState(Date.now());

  const [selectedVideo, setselectedVideo] = useState([]);

  const handleVideoChange = (event) => {
    const files = event.target.files;
    setselectedVideo([...selectedVideo, ...files]);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleDelete = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleVideoDelete = (index) => {
    const updatedVideo = [...selectedVideo];
    updatedVideo.splice(index, 1);
    setselectedVideo(updatedVideo);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", Title);
      formData.append("text", Text);
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
      selectedVideo.forEach((video) => {
        formData.append("videos", video);
      });

      await api
        .post(`lesson/NewLesson/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status === 200) window.alert("Lesson created successfully");
          else window.alert("Error creating lesson");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const LessonForm = (
    <Card className="w-full max-w-[40rem] m-auto">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid bg-BrownLight place-items-center rounded-b-none py-8 px-4 text-center"
      >
        <div className="mb-4 rounded-full border bg-BrownDark p-6 text-BrownLight">
          <BookOpenIcon className="w-10 h-10" />
        </div>
        <Typography variant="h4" className="text-BrownDark">
          Create Lesson
        </Typography>
      </CardHeader>
      {/* body */}
      <CardBody>
        <form className="flex flex-col gap-4">
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Lesson Title
            </Typography>
            <Input
              type="text"
              value={Title}
              // placeholder="Course title"
              className="!border !border-gray-300 bg-white text-gray-900  shadow-gray-900/5 ring-4 ring-transparent  focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-1">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Text of lesson
            </Typography>
            <ReactQuill modules={modules} theme="snow" value={Text} onChange={setText} />
          </div>

          <div className="my-1">
            <Typography
              variant="small"
              color="blue-gray"
              className=" mb-4 font-medium"
            >
              Image of Lesson
            </Typography>
            <div className="flex flex-col gap-2 flex-wrap h-full w-full items-center justify-center bg-sky-400">
              <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
                <label
                  htmlFor="upload"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 fill-white text-BrownDark"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </label>
                <input
                  key={imageInputKey}
                  multiple
                  onChange={handleImageChange}
                  id="upload"
                  type="file"
                  className="hidden"
                  accept="image/*" // only accept image
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-md border border-gray-100 bg-white p-4 shadow-md"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="h-24 w-24 object-cover"
                    />
                    <button
                      onClick={() => handleDelete(index)}
                      className="absolute top-0 right-0 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
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
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* // video upload */}

          <div className="my-1">
            <Typography
              variant="small"
              color="blue-gray"
              className="capitalize mb-4 font-medium"
            >
              Video
            </Typography>
            <div className="flex flex-col gap-2 flex-wrap h-full w-full items-center justify-center bg-sky-400">
              <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
                <label
                  htmlFor="uploadVideo"
                  className="flex flex-col items-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48"
                    className=" fill-BrownDark"
                    viewBox="0 -960 960 960"
                    width="48"
                  >
                    <path d="m418-332 202-129q11-7 11-19t-11-19L418-628q-11-8-23-1.5T383-609v258q0 14 12 20.5t23-1.5Zm62 252q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
                  </svg>
                </label>
                <input
                  key={videoInputKey}
                  multiple
                  onChange={handleVideoChange}
                  id="uploadVideo"
                  type="file"
                  accept="video/*" // only accept video
                  className="hidden"
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.map((video, index) => (
                  <div
                    key={index}
                    className="relative rounded-md border border-gray-100 bg-white p-4 shadow-md"
                  >
                    <video
                      controls
                      src={URL.createObjectURL(video)}
                      alt=""
                      className="h-24 w-24 object-cover"
                    />
                    <button
                      onClick={() => handleVideoDelete(index)}
                      className="absolute top-0 right-0 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current-DarkBrown"
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
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </CardBody>
      <cardFooter className="my-4 flex item-center">
        <Button
          variant="gradient"
          color="green"
          className="w-fit h-fit my-0 mx-auto"
          onClick={handleClick}
        >
          confirme
        </Button>
      </cardFooter>
    </Card>
  );

  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        {LessonForm}
      </div>
    </>
  );
}

export default LessonForm;

// {
//   /*
//             <div className="flex flex-col gap-2 flex-wrap h-full w-full items-center justify-center bg-sky-400">
//               <div className="rounded-md border border-gray-100 bg-white p-4 shadow-md">
//                 <label
//                   htmlFor="upload"
//                   className="flex flex-col items-center gap-2 cursor-pointer"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     height="48"
//                     className=" fill-BrownDark"
//                     viewBox="0 -960 960 960"
//                     width="48"
//                   >
//                     <path d="m418-332 202-129q11-7 11-19t-11-19L418-628q-11-8-23-1.5T383-609v258q0 14 12 20.5t23-1.5Zm62 252q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" />
//                   </svg>
//                 </label>
//                 <input
//                   key={videoInputKey}
//                   multiple
//                   onChange={handleVideoChange}
//                   id="upload"
//                   type="file"
//                   className="hidden"
//                 />
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {selectedVideo.map((video, index) => (
//                   <div
//                     key={index}
//                     className="relative rounded-md border border-gray-100 bg-white p-4 shadow-md"
//                   >
//                     <video
//                       src={URL.createObjectURL(video)}
//                       alt=""
//                       className="h-24 w-24 object-cover"
//                     />
//                     <button
//                       onClick={() => handleVideoDelete(index)}
//                       className="absolute top-0 right-0 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 fill-current"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
// */
// }
