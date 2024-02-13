import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import Stars from "../../Stars";
import BackArrow from "../../Assets/Icons/arrow-square-left.svg";
import Navbar from "../Navbar/Navbar";
import imdbLogo from "../../Assets/Icons/imdb-logo.png";
import { RotatingLines } from "react-loader-spinner";
import { useContext } from "react";
import { WatchlistAlert } from "../../App";

const MovieDetails = ({
  selectedId,
  handleCloseMovie,
  videoIcon,
  watchlistMovies,
  logo,
  watchlist,
  watchlistIcon,
  handleWatchlist,
  isLoading,
  setIsLoading,
}) => {
  const [movie, setMovie] = useState({});
  const [watchedRating, setWatchedRating] = useState(0);

  // state for watchlist alert

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
    Type: type,
  } = movie;

  const { handleWatchlistAlert, handleAlreadyInWatchlist } =
    useContext(WatchlistAlert);
  function addMovie() {
    // create new movie object
    const newMovie = {
      poster,
      year,
      title,
      runtime,
      director,
      imdbRating,
      watchedRating,
      selectedId,
    };

    // add movie to watchlist if array is empty
    if (!watchlistMovies.length) {
      watchlistMovies.push(newMovie);
      handleWatchlistAlert();
    }

    // add new movie temporal state
    let addNewMovie = true;

    watchlistMovies.map((movie) => {
      if (newMovie.selectedId === movie.selectedId) {
        addNewMovie = false;
        handleAlreadyInWatchlist();
      }
      return addNewMovie;
    });

    if (addNewMovie) {
      watchlistMovies.push(newMovie);
      handleWatchlistAlert();
    }

    handleCloseMovie();
  }

  // call api on mount
  useEffect(function () {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=7ea4b9d&i=${selectedId}`
        );

        if (!res.ok) {
          throw new Error("network is not okay");
        }

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
      // console.log(data);
    }
    getMovieDetails();
  }, []);

  return (
    <div className="details_container">
      {isLoading ? (
        <div className="loader">
          <RotatingLines
            visible={true}
            height="100"
            width="100"
            color="#fff"
            strokeColorr="#fff"
            strokeWidth="3"
            animationDuration="0.75"
          />
        </div>
      ) : (
        <>
          <Navbar
            logo={logo}
            watchlist={watchlist}
            watchlistIcon={watchlistIcon}
            handleWatchlist={handleWatchlist}
            watchlistMovies={watchlistMovies}
          />

          <section className="details_box">
            {/* close button */}
            <img
              src={BackArrow}
              alt="backIcon"
              onClick={handleCloseMovie}
              className="close_icon"
            />

            {/* movie title */}
            <h3 className="details_title">
              <b>{title}</b> ({year})
            </h3>

            {/* inner container */}
            <section className="details_container-inner">
              {/* left inner container */}
              <div className="details_container-inner_left">
                {/* movie poster container */}
                <div className="details_container-inner_left_top">
                  <div
                    className="movie_poster-img"
                    style={{ backgroundImage: `url(${poster})` }}
                  ></div>

                  {/* trailer */}
                  <div
                    className="movie_trailer-img"
                    style={{ backgroundImage: `url(${poster})` }}
                  >
                    <div className="watch_trailer">
                      <img src={videoIcon} alt="" />
                      <p className="watch_trailer-text">Watch trailer</p>
                    </div>
                  </div>
                </div>
                {/* synopsis */}
                <h5 className="synopsis_header">Synopsis</h5>
                <div className="synopsis_sub">
                  {plot}
                  <p className="directed rate_text">Directed by {director}</p>
                </div>
              </div>
              {/* right inner container */}
              <div className="details_container-inner_right">
                {/* genre */}
                <div className="details_container-inner_right-box genre_box">
                  <h5 className="details_container-inner_right-heading">
                    Genre
                  </h5>
                  <p className="details_container-inner_right-sub">{genre}</p>
                </div>
                {/* actors */}
                <div className="details_container-inner_right-box actors_box">
                  <h5 className="details_container-inner_right-heading">
                    Actors
                  </h5>
                  <p className="details_container-inner_right-sub">{actors}</p>
                </div>
                <div className="details_container-inner_right-box genre_box">
                  <h5 className="details_container-inner_right-heading">
                    Genre
                  </h5>
                  <p className="details_container-inner_right-sub">{genre}</p>
                </div>
                {/* runtime */}
                <div className="details_container-inner_right-box runtime_box">
                  <h5 className="details_container-inner_right-heading">
                    Runtime
                  </h5>
                  <p className="details_container-inner_right-sub">{runtime}</p>
                </div>

                {/* star rating component */}
                <div className="details_container-inner_right-box rating_box">
                  <div className="rating_box-flex">
                    <div className="imdb_rating-flex">
                      <img
                        src={imdbLogo}
                        className="rating_box-header imdb_logo"
                        alt="imdbLogo"
                      />
                      <h5 className="imdb_rating-text">Rating</h5>
                    </div>
                    <p>{imdbRating}</p>
                  </div>

                  <div className="rating_box-flex">
                    <h5 className="rating_box-header">Your Rating</h5>
                    <Stars setWatchedRating={setWatchedRating} />
                  </div>
                </div>

                {watchedRating ? (
                  <div className="details_container-inner_right-box">
                    <button onClick={addMovie} className="add_watchlist-btn">
                      Add to Watchlist
                    </button>
                  </div>
                ) : (
                  <div className="details_container-inner_right-box rate_text">
                    Please rate {type} to add to Watchlist.
                  </div>
                )}
              </div>
            </section>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
