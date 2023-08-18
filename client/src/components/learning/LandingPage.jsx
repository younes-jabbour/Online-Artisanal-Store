import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
{
  /*

color1 : #FFDF9E3
color2 : #FBBA00
color3 : #E5781E
color4 : #5A3D2B

*/
}

function LandingPage() {
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
          <p className="text-gray-600 mt-4">
            Nuestro programa de fidelización está diseñado para recompensar a
            nuestros clientes más fieles. Obtén puntos con cada compra y
            canjéalos por descuentos exclusivos, regalos especiales y
            experiencias únicas.
          </p>
          <Button
            variant="gradient"
            color="orange"
            ripple={false}
            className="hover:shadow-none mt-10 flex gap-1 items-center"
          >
            <span>courses</span>
            <ArrowLongRightIcon className="h-5 w-5" />
          </Button>
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

  return <div>{FirstSection};</div>;
}

export default LandingPage;

// {/*
//   const landingPage2 = (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
//       />
//       <link
//         rel="stylesheet"
//         href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
//       />
//       <section className="relative  bg-BrownLight">
//         <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
//           <div
//             className="absolute top-0 w-full h-full bg-center bg-cover"
//             style={{
//               backgroundImage: 'url("http://localhost:5000/images/3.jpg")',
//             }}
//           >
//             <span
//               id="blackOverlay"
//               className="w-full h-full absolute opacity-60 bg-black"
//             />
//           </div>
//           <div className="container relative mx-auto">
//             <div className="items-center flex flex-wrap">
//               <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
//                 <div className="pr-12">
//                   <h1 className="text-white font-semibold text-5xl">
//                     Lorem, ipsum dolor.
//                   </h1>
//                   <p className="mt-4 text-lg text-blueGray-200">
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Dolorum, nisi?
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div
//             className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
//             style={{ transform: "translateZ(0px)" }}
//           >
//             <svg
//               className="absolute bottom-0 overflow-hidden"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="none"
//               version="1.1"
//               viewBox="0 0 2560 100"
//               x={0}
//               y={0}
//             ></svg>
//           </div>
//         </div>
//         <section className="pb-10 bg-BrownLight -mt-24">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-wrap">
//               <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//                   <div className="px-4 py-5 flex-auto">
//                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
//                       <i className="fas fa-award" />
//                     </div>
//                     <h6 className="text-xl font-semibold">Awarded Agency</h6>
//                     <p className="mt-2 mb-4 text-blueGray-500">
//                       Divide details about your product or agency work into
//                       parts. A paragraph describing a feature will be enough.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full md:w-4/12 px-4 text-center">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//                   <div className="px-4 py-5 flex-auto">
//                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
//                       <i className="fas fa-retweet" />
//                     </div>
//                     <h6 className="text-xl font-semibold">Free Revisions</h6>
//                     <p className="mt-2 mb-4 text-blueGray-500">
//                       Keep you user engaged by providing meaningful information.
//                       Remember that by this time, the user is curious.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="pt-6 w-full md:w-4/12 px-4 text-center">
//                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
//                   <div className="px-4 py-5 flex-auto">
//                     <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
//                       <i className="fas fa-fingerprint" />
//                     </div>
//                     <h6 className="text-xl font-semibold">Verified Company</h6>
//                     <p className="mt-2 mb-4 text-blueGray-500">
//                       Write a few lines about each one. A paragraph describing a
//                       feature will be enough. Keep you user engaged!
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>
//     </>
//   );
// */}
