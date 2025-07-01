import React, { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Appcontext } from "../context/Appcontext";

const Header = () => {
  const { generateImage, user, loadingUser } = useContext(Appcontext);
  const [showInput, setShowInput] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generatedImg, setGeneratedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateClick = () => {
    setShowInput(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!user || !user._id) {
      alert("User not loaded. Please wait a moment and try again.");
      return;
    }

    setIsLoading(true);
    const result = await generateImage(prompt);
    if (result) {
      setGeneratedImg(result);
    }
    setIsLoading(false);
    setPrompt("");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = generatedImg;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loadingUser) {
    return <p className="text-center mt-20 text-gray-500">Loading user...</p>;
  }

  return (
    <motion.div
      className="flex flex-col justify-center items-center text-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {!showInput && (
        <>
          <motion.div
            className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p>Best Text To Image Generator</p>
            <img src={assets.star_icon} alt="" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.2 }}
            className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
          >
            Turn Text To <span className="text-blue-600">Image</span>, In
            Seconds
          </motion.h1>

          <motion.p
            className="text-center max-w-xl mx-auto mt-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Unleash your creativity with AI. Turn your imagination into visual
            reality in seconds. Just watch and see the magic happen.
          </motion.p>

          <motion.button
            onClick={handleGenerateClick}
            className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Image{" "}
            <img className="h-6" src={assets.star_group} alt="" />
          </motion.button>
        </>
      )}

      {showInput && (
        <>
          {/* IMAGE PREVIEW */}
          <div className="mt-8">
            <img
              src={generatedImg || assets.sample_img_1}
              alt="Generated"
              className="rounded shadow-lg max-w-sm"
            />
            {isLoading && (
              <p className="text-blue-600 mt-3">Generating image...</p>
            )}
          </div>

          {/* INPUT FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex mt-8 bg-neutral-200 rounded-full px-4 py-2 max-w-md w-full items-center"
          >
            <input
              type="text"
              placeholder="Describe your image..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 bg-transparent outline-none px-2"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full"
            >
              Submit
            </button>
          </form>

          {/* DOWNLOAD BUTTON */}
          {generatedImg && !isLoading && (
            <button
              onClick={handleDownload}
              className="mt-6 bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-all"
            >
              Download Image
            </button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Header;
