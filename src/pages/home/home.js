import React, { useContext } from "react";
import "./home.css";
function Home() {
  return (
    <div className="home-container">
      <h1 style={{ textAlign: "center" }}>New Way To Design Your Home</h1>
      <p style={{ textAlign: "center" }}>
        I never thought I could feel so free! Well we're movin' on up to the
        east side to a deluxe apartment in the sky just two good ol' boys Never
        meanin.
      </p>
      <button className="shop-now-btn">Shop Now</button>
      <img
        className="home-banner-img"
        src="https://premiumlayers.com/html/furnhome/images/slider-2.png"
        alt=""
      />
    </div>
  );
}

export default Home;
