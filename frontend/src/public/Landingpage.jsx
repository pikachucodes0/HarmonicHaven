import React, { useState } from "react";
import "./Landingpage.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Feature from "../components/Feature";
import JoinUs from "../components/JoinUs";
import Footer from "../components/Footer";
import Store from "../components/Store";
import Collab from "../components/Collab";

const Landingpage = () => {
  return (
    <div className="Container">
      <Navbar />
      <Header />
      <Collab/>
      <Feature />
      <JoinUs />
      <Store />
      <Footer />
    </div>
  );
};
export default Landingpage;
