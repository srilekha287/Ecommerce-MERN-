import React from "react";
import homeImage from '../assets/images/home.jpg';

function HeroSection() {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <img
        src={homeImage}
        alt="Shopping background"
        className="absolute w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-800 drop-shadow">
          "Shop with Joy, Style & Confidence"
        </h1>
        <p className="text-lg md:text-xl mt-4 text-gray-700 font-medium">
          Discover the latest trends at unbeatable prices.
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
