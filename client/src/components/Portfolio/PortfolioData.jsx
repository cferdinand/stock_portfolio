import React, { useState, useEffect } from "react";
import PortfolioEntry from "./PortfolioDataEntry.jsx";

const PortfolioData = ({ pricingData, portfolioData, getData }) => {
  const Portfolio = () => {
    return portfolioData.map((stock, idx) => {
      let currentStock = pricingData[stock.stock_symbol.toUpperCase()];
      return (
        <PortfolioEntry currentStock={currentStock} stock={stock} key={idx} />
      );
    });
  };
  useEffect(() => {
    if (portfolioData.length > 0) {
      let symbols = portfolioData
        .reduce((acc, cv) => {
          return acc + cv.stock_symbol + ",";
        }, "")
        .slice(0, -1);
      getData(symbols, true);
    }
  }, [portfolioData]);
  return (
    <div className="portfolio-table">
      <table>
        <thead>
          <tr key={Math.random()} className="portfolio-heading">
            <th>Name</th>
            <th>Symbol</th>
            <th>Amount Owned</th>
            <th>Current Value</th>
            <th>Latest Price</th>
          </tr>
        </thead>
        <tbody>
          <Portfolio />
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioData;
