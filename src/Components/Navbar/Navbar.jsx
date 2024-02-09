import React from "react";
import "./Navbar.css";

const Navbar = ({
  logo,
  watchlistIcon,
  handleWatchlist,
  watchlistMovies,
  watchlist,
  children,
}) => {
  return (
    <>
      <nav>
        <img src={logo} alt="tokei-logo" />

        <ul className="navbuttons">
          <button className="btn watchlist" onClick={handleWatchlist}>
            <img
              src={watchlistIcon}
              alt="watchlist icon"
              className="watchlist_icon"
            />
            Watchlist
            <p>{!watchlistMovies.length ? "" : watchlistMovies.length}</p>
          </button>
        </ul>
      </nav>

      {watchlist && children}
    </>
  );
};

export default Navbar;
