import React from "react";

const Errorpage = ({ isError, logo }) => {
  return (
    <div className="loading_container">
      <img src={logo} alt="tokei logo" className="loading_logo" />
      <p className="loading_text">COULDN'T FIND THAT, SEARCH SOMETHING ELSE?</p>
    </div>
  );
};

export default Errorpage;
