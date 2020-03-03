import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav_bar">
      <div className="nav_logo">
        <img src="images/logo.png" className="nav_logo_image" />
      </div>
      <div className="logout">
        <Link to="/signup">
          <p className="logout_button">logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
