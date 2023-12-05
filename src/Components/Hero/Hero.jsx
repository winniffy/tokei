import React, { useState } from "react";
import "./Hero.css";

const Hero = ({ search, searchIcon, handleChange }) => {
  // search loading state
  const [isSearch, setSearch] = useState(false);

  return (
    <section className="hero_content">
      <h1 className="hero_header">Your movie encyclopedia</h1>
      <div className="hero_input-container">
        <input
          type="text"
          name=""
          placeholder="Search Movie or TV Series"
          value={search}
          onChange={handleChange}
          onFocus={() => setSearch(true)}
          onBlur={() => setSearch(false)}
        />

        {isSearch && <div class="dot"></div>}

        <div className="search_icon-container">
          <img className="search_icon" src={searchIcon} alt="search icon" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
