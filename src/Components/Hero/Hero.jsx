import React from "react";
import "./Hero.css";

const Hero = ({ search, searchIcon, handleChange }) => {
  return (
    <section className="hero_content">
      <h1 className="hero_header">Your movie encyclopedia</h1>
      <div className="hero_input-container">
        <input type="text" name="" value={search} onChange={handleChange} />
        <div className="search_icon-container">
          <img className="search_icon" src={searchIcon} alt="search icon" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
