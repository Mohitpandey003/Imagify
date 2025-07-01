import React from "react";
import { assets } from "../assets/assets";

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center my-22 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create Ai Image into reality
      </h1>
      <p className="text-gray-500 mb-8">Turn Your Imagination Into Visuals</p>

      <div className="flex flex-col gap-4 md:gap-14 md:flex-row items-center">
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing The Ai Powered Text to Image Generator{" "}
          </h2>
          <p className="text-gray-600 mb-4">
            Easily Bring your Ideas to life using our free image generator.
            whether you need stunning visuals or unique imagery.Our tools
            transform your text into eye-catching image with just few
            clicks.Imagine, Describe it and watch it come live instantly.
          </p>
          <p className="text-gray-600">
            Simply Type in a text prompt,and our cutting-edge Ai will generate
            High Quality Image in Seconds.From potrait visuals to character
            design and potraits,even concepts, that don't even exist can be
            visualised.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
