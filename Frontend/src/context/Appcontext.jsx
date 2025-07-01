// src/context/Appcontext.jsx
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const Appcontext = createContext();

const AppcontextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0);
  const [loadingUser, setLoadingUser] = useState(true); // ✅ add loading state

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      console.log("Credits API Response:", data); // ✅ Debug log

      if (data.success) {
        setCredit(data.credit);
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Credits Error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoadingUser(false); // ✅ mark loading complete
    }
  };

  const generateImage = async (prompt) => {
    try {
      const userId = user?._id;
      if (!userId) {
        throw new Error("User not loaded");
      }

      console.log("Sending to backend:", { userId, prompt });

      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        {
          prompt,
          userId,
        },
        {
          headers: { token },
        }
      );

      if (data.success) {
        loadCreditsData();
        return data.resultImage; // ✅ Ensure backend returns this
      } else {
        toast.error(data.message);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCredit(0);
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    } else {
      setLoadingUser(false);
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
    loadingUser, // ✅ expose it
  };

  return (
    <Appcontext.Provider value={value}>{props.children}</Appcontext.Provider>
  );
};

export default AppcontextProvider;
