import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import logo from "../../assets/logo.png";

function Concel() {
  return (
    <div className="bg-[#EFDEA1] h-screen">
      <div className=" grid grid-rows-[120px_1fr] ">
        <img
          className=" p-3 justify-self-start h-full  w-auto"
          src={logo}
          alt=""
        />
        <div className=" m-auto">
          <div className="p-6 mx-auto  md:mx-auto">
            <ExclamationTriangleIcon className="text-red-500 w-16 h-16 mx-auto my-6" />
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Conceled!
              </h3>
              <p className="text-blue-gray-900 font-normal  my-2">
                Your payment has been canceled. Please try again.
              </p>
              <div className="py-10 text-center">
                <a
                  href="/"
                  className="px-12 bg-brown-600 hover:bg-brown-500 text-white font-semibold py-3 rounded"
                >
                  GO BACK TO HOME
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Concel;
