import React from "react";
import About from "./components/About";
import Slider from "./components/Slider";
import Speech from "./components/Speech";
import "./Home.scss";

function Home() {

  return (
    <div className="home__container">
      <Slider />
      <Speech />
      <About />
    </div>
  );
}

export default Home;
