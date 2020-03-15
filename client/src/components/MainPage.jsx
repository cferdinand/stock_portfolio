import React from "react";
import Nav from "./Nav.jsx";
import TopTen from "../containers/TopTenContainer.jsx";

const MainPage = () => {
  return (
    <div>
      <div className="navigation">
        <Nav />
      </div>
      <div className="mainpage">
        <TopTen />
      </div>
    </div>
  );
};

export default MainPage;
