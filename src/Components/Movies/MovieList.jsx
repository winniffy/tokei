import React from "react";
import "./MovieList.css";

const MovieList = ({ movieList }) => {
  return (
    <div className="movielist_container">
      <ul className="movielist_container-grid">
        {movieList?.map((items) => (
          <article key={items.imdbID} className="movielist_box">
            <div
              className="movie_poster"
              style={{ backgroundImage: `url(${items.Poster})` }}
            />
            <div className="movie_details">
              <p>
                {items.Title} ({items.Year})
              </p>
              <p>{items.Runtime}</p>
            </div>
          </article>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
