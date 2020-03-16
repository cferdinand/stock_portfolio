import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">
            <div id="home">Home</div>
          </Link>
        </li>
        <li>
          <Link to="/portfolio">
            <div id="portfolio">Portfolio</div>
          </Link>
        </li>
        <li>
          <Link to="/transactions">
            <div id="Transactions">Transactions</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
