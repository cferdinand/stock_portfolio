import React, { useState, useEffect } from "react";
import Nav from "../Nav.jsx";
import SideNav from "../Sidebar/SideNav.jsx";
import Buy from "./BuyForm.jsx";
import PortfolioData from "./PortfolioData.jsx";

const PortfolioMain = ({ tradeStock, getStockData }) => {
  const [myPortfolio, setPortfolio] = useState({});

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
          <div className="trade-form form">
            <div className="buy-sell">
              <span>Buy Stocks</span>
              <hr className="buy-sell-hr" />
              <span>Sell Stocks</span>
            </div>
            <Buy stock={tradeStock} getData={getStockData} />
          </div>
          <div className="portfolio-data">
            <PortfolioData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMain;
