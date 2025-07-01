import { useState, useContext } from "react";
import { Appcontext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(Appcontext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between py-4 px-4 sm:px-8">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32 lg:w-40"
        onClick={() => navigate("/")}
      />

      <div>
        {user ? (
          <div className="flex items-center gap-4 relative">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-full hover:scale-105 transition-all"
            >
              <img src={assets.credit_star} className="w-5" alt="Credit" />
              <p className="text-xs font-medium text-grey-600">
                Credits Left: {credit}
              </p>
            </button>

            <p className="text-grey-600 max-sm:hidden pl-4">Hi, {user.name}</p>

            <div className="relative">
              <img
                src={assets.profile_icon}
                className="w-10 cursor-pointer"
                onClick={handleProfileClick}
                alt="Profile"
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded z-10">
                  <ul className="list-none m-0 p-2 text-sm">
                    <li
                      onClick={handleLogout}
                      className="py-1 px-2 cursor-pointer hover:bg-gray-100 rounded"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p
              onClick={() => navigate("/Buy")}
              className="cursor-pointer text-gray-700 hover:underline"
            >
              Pricing
            </p>
            <p
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 rounded-full cursor-pointer hover:bg-zinc-700"
            >
              Login
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
