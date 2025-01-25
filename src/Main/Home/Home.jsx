import React, { useEffect, useState } from "react";
import Navbar2 from "../../Pages/Navbar2/Navbar2";
import Carousel from "../../Pages/Carousel/Carousel";
import Products from "../../Pages/Product/Products";
import Footer from "../Footer/Footer";
export default function Home() {
  
  return (
    <div>
      <Navbar2 />
      <Carousel />
      <Products />
      <Footer/>
    </div>
  );
}
