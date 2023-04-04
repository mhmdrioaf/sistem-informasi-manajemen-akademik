import React from "react";
import "./Home.scss";
import Slider from "./components/Slider";
import Speech from "./components/Speech";
import About from "./components/About";

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
