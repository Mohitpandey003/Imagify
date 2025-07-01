import React, { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { assets } from "../assets/assets";
import { Appcontext } from "../context/Appcontext";

const Result = () => {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { generateImage } = useContext(Appcontext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const result = await generateImage(input);
    if (result) {
      setImage(result);
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setInput("");
    setImage(null);
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-16 min-h-[90vh] bg-gray-50">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        Describe Your Imagination
      </h2>

      {/* Input Form */}
      {!image && (
        <form
          onSubmit={onSubmitHandler}
          className="flex w-full max-w-xl bg-white shadow-lg rounded-full p-2 px-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. a cat sitting on Mars in Van Gogh style"
            className="flex-1 bg-transparent outline-none px-3 text-gray-800"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Generate
          </button>
        </form>
      )}

      {/* Loading Text */}
      {isLoading && (
        <p className="mt-6 text-blue-600 font-medium">Generating image...</p>
      )}

      {/* Result Image */}
      {image && !isLoading && (
        <div className="mt-10 text-center">
          <img
            src={image}
            alt="Generated"
            className="max-w-sm mx-auto rounded-lg shadow-lg"
          />
          <div className="flex justify-center gap-4 mt-6">
            <a
              href={image}
              download
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Download
            </a>
            <button
              onClick={handleReset}
              className="bg-gray-300 px-5 py-2 rounded-full hover:bg-gray-400 transition"
            >
              Generate Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
