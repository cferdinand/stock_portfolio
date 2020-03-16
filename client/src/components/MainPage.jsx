import React from "react";
import { Route } from "react-router-dom";
import Nav from "./Nav.jsx";
import SideNav from "./Sidebar/SideNav.jsx";
import TopTen from "../containers/TopTenContainer.jsx";

const MainPage = () => {
  return (
    <div>
      <div className="navigation">
        <Nav />
      </div>
      <div className="mainpage">
        <div className="sidenav">
          <SideNav />
        </div>
        <div className="content-container">
          <TopTen />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
