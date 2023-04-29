import React from "react";
import "./Home.scss";
import About from "./components/About";
import Slider from "./components/Slider";
import Speech from "./components/Speech";

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
