import React from "react";
import Video from '../assets/studio2.mp4'
function Header() {
  return (
    <div id="main">
        <video src={Video} autoPlay loop muted></video>
      <div className="header-heading">
        <h2>Find your <span>RYTHM</span></h2>
        <h1>
          Dive into the World of <span>MUSIC</span> 
        </h1>
        <p className="details">Find What Fits Your Flow</p>
        <div className="header-btns">
          <a href="./Login" className="header-btn">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
export default Header;
  