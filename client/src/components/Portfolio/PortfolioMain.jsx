import React, { useState, useEffect } from "react";
import Nav from "../Nav.jsx";
import SideNav from "../Sidebar/SideNav.jsx";
import Buy from "./BuyForm.jsx";
import Sell from "./SellForm.jsx";
import PortfolioData from "./PortfolioData.jsx";

const PortfolioMain = ({
  stock,
  portfolio,
  balance,
  portfolioPricing,
  getStockData,
  tradeStock,
  getPortfolio
}) => {
  const [form, setForm] = useState("buy");
  useEffect(() => {
    getPortfolio();
  }, []);
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
          <div className="buy-sell-nav">
            <div className="buy-sell">
              <span
                id="buy"
                onClick={e => {
                  setForm(e.target.id);
                }}
              >
                Buy Stocks
              </span>
              <hr className="buy-sell-hr" />
              <span
                id="sell"
                onClick={e => {
                  setForm(e.target.id);
                }}
              >
                Sell Stocks
              </span>
            </div>
            <div className="cash-balance">
              <p>
                Cash:{" "}
                {parseFloat(balance).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD"
                })}
              </p>
            </div>
          </div>
          <div className="trade-form form">
            {form === "buy" ? (
              <Buy
                stock={stock}
                getData={getStockData}
                tradeStock={tradeStock}
              />
            ) : (
              <Sell
                stocksList={portfolio}
                stockData={stock}
                getData={getStockData}
                tradeStock={tradeStock}
              />
            )}
          </div>
          <div className="portfolio-data">
            <PortfolioData
              pricingData={portfolioPricing}
              portfolioData={portfolio}
              getData={getStockData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMain;
