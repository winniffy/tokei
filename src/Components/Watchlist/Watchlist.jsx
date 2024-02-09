import React from "react";
import "./Watchlist.css";

const Watchlist = ({
  watchlistMovies,
  setWatchlistMovies,
  handleWatchlist,
}) => {
  // delete movie from watchlist
  function deleteMovie(movie) {
    const newWatchlistMovies = [...watchlistMovies];
    newWatchlistMovies.splice(movie, 1);
    setWatchlistMovies(newWatchlistMovies);
  }

  return (
    <div className="overlay">
      <div className="watchlist_container">
        <div className="watchlist_header-flex header_flex">
          <h2 className="watchlist_header">Your Watchlist</h2>
          <p className="close_watchlist" onClick={handleWatchlist}>
            &times;
          </p>
        </div>

        {!watchlistMovies.length ? (
          <div className="no_movies no_movies-box">
            No movies in your Watchlist.
          </div>
        ) : (
          watchlistMovies.map((movie, selectedId) => (
            <div className="watchlist_card" key={selectedId}>
              <div className="title_box">
                <div
                  className="watchlist_poster-img"
                  style={{ backgroundImage: `url(${movie.poster})` }}
                ></div>
                <div className="title_inner-flex">
                  <p className="watchlist_title">
                    {movie.title} ({movie.year})
                  </p>
                  <p className="watchlist_runtime">{movie.runtime}</p>
                  <p className="watchlist_director">
                    Directed by <b>{movie.director}</b>
                  </p>
                </div>
              </div>
              <button
                className="remove_watchlist-btn"
                onClick={() => deleteMovie(selectedId)}
              >
                Remove from Watchlist
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Watchlist;
