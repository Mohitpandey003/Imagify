import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Buycredit from "./pages/Buycredit";
import Result from "./pages/Result";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { Appcontext } from "./context/Appcontext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { showLogin } = useContext(Appcontext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <ToastContainer position="bottom-right" />
      <Navbar></Navbar>
      {showLogin && <Login />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Buy" element={<Buycredit />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
