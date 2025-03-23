import React from "react";
import "../styles/Home.css"
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Sec1 from "../pages/welcome-section";
import Sec2 from "../pages/MeaningSection";
import Styles from "../components/YogaStyles"
import TeachersSection from "../components/TeachersSection";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Sec1/>
      <Styles/>
      <Sec2/>
      <TeachersSection/>
      <Footer/>
      
    
    </>
  );
};

export default Home;
