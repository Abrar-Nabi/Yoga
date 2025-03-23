import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";

const Hero = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 500); // Delay animation for smooth effect
  }, []);

  return (
    <section className="hero">
      <div className={`hero-content ${animate ? "show" : ""}`}>
        <h1>Feel good <br /> inside and out</h1>
        <Link   to="/bookings" >      <button className="start-btn">Start Now</button>   </Link>
          
      </div>
    </section>
  );
};

export default Hero;
