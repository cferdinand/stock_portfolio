import React from "react";
import Nav from "./Nav.jsx";
import SideNav from "./Sidebar/SideNav.jsx";
import TopTen from "../containers/TopTenContainer.jsx";

const MainPage = () => {
  return (
    <div className="container">
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
