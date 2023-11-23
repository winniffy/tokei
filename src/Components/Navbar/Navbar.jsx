import React from "react";
import "./Navbar.css";

const Navbar = ({ logo, watchlistIcon }) => {
  return (
    <nav>
      <img src={logo} alt="tokei logo" />

      <ul className="navbuttons">
        <button className="btn watchlist">
          <img
            src={watchlistIcon}
            alt="watchlist icon"
            className="watchlist_icon"
          />
          Watchlist
        </button>
        <button className="btn search">Search</button>
      </ul>
    </nav>
  );
};

export default Navbar;
