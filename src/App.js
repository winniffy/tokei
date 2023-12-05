import logo from "./logo.svg";
import bgImage from "./Assets/Images/bg-image.jpg";
import watchlistIcon from "./Assets/Icons/archive-add.svg";
import searchIcon from "./Assets/Icons/search-normal.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import MovieList from "./Components/Movies/MovieList";
import Loading from "./Components/Loading/Loading";
import Errorpage from "./Components/Errorpage/Errorpage";

// http://www.omdbapi.com/?i=tt3896198&apikey=7ea4b9d

const backgroundImg = {
  backgroundImage: `url(${bgImage})`,
};

function App() {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  // const [isInput, setIsInput] = useState(false);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  // function handleSearch(e) {
  //   setIsInput(!isInput);
  // }

  useEffect(
    function () {
      async function getData() {
        try {
          setIsError("");
          if (search.length < 3) return;
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?s=${search}&apikey=7ea4b9d`
          );

          if (!res.ok) {
            throw new Error("network is not okay");
          }

          const data = await res.json();
          if (data.Response === "False") throw new Error("movie not found");
          setMovieList(data.Search);
          console.log(data);
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
      <Navbar logo={logo} watchlistIcon={watchlistIcon} />
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
      {!isLoading && !isError && <MovieList movieList={movieList} />}
    </header>
  );
}

export default App;
