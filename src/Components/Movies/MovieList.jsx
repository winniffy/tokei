import React from "react";
import "./MovieList.css";
import { Link } from "react-router-dom";

const MovieList = ({ movieList, handleSelectedMovie }) => {
  return (
    <div className="movielist_container">
      <ul className="movielist_container-grid">
        {movieList?.map((movie) => (
          <Link
            to="/movieDetails"
            key={movie.imdbID}
            className="movielist_box"
            onClick={() => handleSelectedMovie(movie.imdbID)}
          >
            <div
              className="movie_poster"
              style={{ backgroundImage: `url(${movie.Poster})` }}
            />
            <div className="movie_details">
              <p>
                <b>{movie.Title}</b> ({movie.Year})
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
