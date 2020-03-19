import React from "react";
import logout from "../actions/logout.js";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  const logoutUser = async () => {
    let isLoggedOut = await logout();
    isLoggedOut ? history.push("/login") : "";
  };
  return (
    <div className="nav_bar">
      <div className="nav_logo">
        <img src="images/logo-white.png" className="nav_logo_image" />
      </div>
      <div className="logout">
        <p className="logout_button" onClick={logoutUser}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default Nav;
