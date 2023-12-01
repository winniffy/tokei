import React from "react";
import "./Loading.css";

const Loading = ({ logo }) => {
  return (
    <div className="loading_container">
      <img src={logo} alt="tokei logo" className="loading_logo" />
      <p className="loading_text">IS LOADING...</p>
    </div>
  );
};

export default Loading;
