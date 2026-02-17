import React from "react";
import { Link } from "react-router";

const SelectPage = () => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop')`,
      }}
    >
      <div className="text-center  py-10 md:py-0">
        <h1 className="text-2xl md:text-4xl px-2 py-6 font-bold text-blue-500">
          BRAHMANBARIA POLYTECHNIC INSTITUTE ROVER UNIT
        </h1>
        <p className="text-2xl md:text-3xl text-blue-500 font-semibold pb-6">
          A single smile clears the mind - Rovering to Success
        </p>
        <p className="text-2xl text-white pb-2 md:pb-6 font-semibold">
          Please select your Position
        </p>
      </div>
      <div className=" flex justify-center items-center ">
        <div className="flex flex-col justify-center items-center gap-6">
          <Link
            to="/tregister"
            className="border-4 border-blue-500 rounded-xl px-20 py-6 "
          >
            <img
              src="https://i.ibb.co/HpXs6Wcm/Ellipse-3.png"
              alt="img1"
              className="w-40 mx-auto"
            />
            <p className="text-center text-xl font-bold uppercase">
              Teacher Account
            </p>
          </Link>
          <Link
            to="/register"
            className="border-4 border-blue-500 rounded-xl px-20 py-6"
          >
            <img
              src="https://i.ibb.co/HpXs6Wcm/Ellipse-3.png"
              alt="img1"
              className="w-40 mx-auto"
            />
            <p className="text-center text-xl font-bold uppercase">
              Student Account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectPage;
