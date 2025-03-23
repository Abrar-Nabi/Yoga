import React from "react";
import "../styles/MeaningSection.css";
import meaningImage from "../assets/01.jpg"; // Update with correct path



const MeaningSection = () => {
  return (
    <div className="meaning-container">
      <div className="meaning-image">
        <img src={meaningImage} alt="Meaning Beyond Movement" />
      </div>
      <div className="meaning-content">
        <h2 className="meaning-heading">Meaning beyond movement</h2>
        <p className="meaning-description">
          From starting your day to nourishing a healing journey, Glo empowers you to live well. 
          You can even download go-to classes to practice outdoors and on the road.
        </p>
      </div>
    </div>
  );
};

export default MeaningSection;
