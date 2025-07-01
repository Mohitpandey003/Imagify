import React from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Description from "../components/Description";
import Testimonials from "../components/Testimonials";
import GenerateBtn from "../components/GenerateBtn";

const Main = () => {
  return (
    <div>
      <Header></Header>
      <Steps></Steps>
      <Description />
      <Testimonials />
      <GenerateBtn />
    </div>
  );
};

export default Main;
