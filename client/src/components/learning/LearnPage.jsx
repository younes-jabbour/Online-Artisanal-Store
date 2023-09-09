import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Courses from "./Courses";
import { Link } from "react-router-dom";

{
  /*

color1 : #FFDF9E3
color2 : #FBBA00
color3 : #E5781E
color4 : #5A3D2B

*/
}

function LearnPage() {
  const FirstSection = (
    <div className="bg-BrownLight">
      <div className="flex justify-between items-center py-10 px-5">
        <div className="w-1/2">
          <h2 className="text-5xl font-semibold text-[#E5781E]">
            Lorem, ipsum dolor.
          </h2>
          <h3 className="text-xl font-semibold text-BrownDark mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,
            id.
          </h3>
          <p className="text-gray-600 mt-4 mr-[2rem]">
            Nuestro programa de fidelización está diseñado para recompensar a
            nuestros clientes más fieles. Obtén puntos con cada compra y
            canjéalos por descuentos exclusivos, regalos especiales y
            experiencias únicas.
          </p>
          <Link to="/learn/List_Courses">
            <Button
              variant="gradient"
              color="orange"
              ripple={false}
              className="hover:shadow-none mt-10 flex gap-1 items-center hover:scale-105 transform transition-all duration-300 ease-in-out active:scale-100"
            >
              <span>Courses</span>
              <ArrowLongRightIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="w-1/2">
          <img
            src="http://localhost:5000/images/3.jpg"
            alt="appah"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );

  const SecondSection = (
    <div className="h-32 flex items-center justify-center">
      <Typography variant="h2" className="text-BrownDark">
        Most Popular Courses
      </Typography>
    </div>
  );

  return (
    <div>
      {FirstSection}
      {SecondSection}
      <Courses />
    </div>
  );
}

export default LearnPage;
