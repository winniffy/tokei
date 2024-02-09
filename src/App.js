import logo from "./logo.svg";
import bgImage from "./Assets/Images/bg-image.jpg";
import watchlistIcon from "./Assets/Icons/archive-add.svg";
import searchIcon from "./Assets/Icons/search-normal.svg";
import videoIcon from "./Assets/Icons/video-circle.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import MovieList from "./Components/Movies/MovieList";
import Loading from "./Components/Loading/Loading";
import Errorpage from "./Components/Errorpage/Errorpage";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Watchlist from "./Components/Watchlist/Watchlist";
import { Route, Routes } from "react-router-dom";

// import { useState } from "react";

// // http://www.omdbapi.com/?i=tt3896198&apikey=7ea4b9d

const backgroundImg = {
  backgroundImage: `url(${bgImage})`,
};

const KEY = "7ea4b9d";

function App() {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  // state for selecting a movie
  const [selectedId, setSelectedId] = useState(null);

  // state for showing watchlist
  const [watchlist, setWatchlist] = useState(false);

  const [watchlistMovies, setWatchlistMovies] = useState([]);

  // toggle watchlist function
  function handleWatchlist() {
    setWatchlist(!watchlist);
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSelectedMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  // add movie to watchlist
  function handleAddMovie(movies) {
    setWatchlistMovies([...watchlistMovies, movies]);
  }

  // call api
  useEffect(
    function () {
      async function getData() {
        try {
          setIsError("");
          if (search.length < 3 || search === "") return;
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?s=${search}&apikey=${KEY}`
          );

          if (!res.ok) {
            throw new Error("network is not okay");
          }

          const data = await res.json();
          if (data.Response === "False") throw new Error("movie not found");
          setMovieList(data.Search);
          // console.log(data);
        } catch (err) {
          setIsError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      getData();
    },
    [search]
  );

  return (
    <header className="container" style={backgroundImg}>
      <Navbar
        logo={logo}
        watchlist={watchlist}
        watchlistIcon={watchlistIcon}
        handleWatchlist={handleWatchlist}
        watchlistMovies={watchlistMovies}
      >
        <Watchlist
          watchlist={watchlist}
          watchlistMovies={watchlistMovies}
          setWatchlistMovies={setWatchlistMovies}
          selectedId={selectedId}
          handleWatchlist={handleWatchlist}
        />
      </Navbar>

      <Hero
        logo={logo}
        bgImage={bgImage}
        watchlistIcon={watchlistIcon}
        searchIcon={searchIcon}
        search={search}
        handleChange={handleChange}
      />
      {isError && <Errorpage isError={isError} logo={logo} />}
      {isLoading && <Loading logo={logo} />}
      {!isLoading && !isError && (
        <MovieList
          movieList={movieList}
          handleSelectedMovie={handleSelectedMovie}
        />
      )}

      <Routes>
        {selectedId && (
          <Route
            exact
            path="/movieDetails"
            element={
              <MovieDetails
                selectedId={selectedId}
                handleCloseMovie={handleCloseMovie}
                search={search}
                videoIcon={videoIcon}
                handleAddMovie={handleAddMovie}
                watchlistMovies={watchlistMovies}
                logo={logo}
                watchlist={watchlist}
                watchlistIcon={watchlistIcon}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
        )}
      </Routes>
    </header>
  );
}

export default App;
