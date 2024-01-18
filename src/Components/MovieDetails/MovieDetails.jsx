import React, { useEffect, useState } from "react";
import "./MovieDetails.css";

const MovieDetails = ({ selectedId, handleCloseMovie }) => {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(function () {
    async function getMovieDetails() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=7ea4b9d&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
    }
    getMovieDetails();
  }, []);

  return (
    <div className="details_container">
      {title}
      <img src={poster} alt={`poster of ${movie}`} />
      <button onClick={handleCloseMovie}>&larr;</button>
      {plot}
    </div>
  );
};

export default MovieDetails;
