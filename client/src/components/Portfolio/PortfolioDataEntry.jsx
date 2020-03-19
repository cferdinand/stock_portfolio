import React from "react";

const PortfolioDataEntry = ({ currentStock, stock }) => {
  const PricingData = () => {
    let currentValue = 0;
    if (stock && currentStock) {
      currentValue = (
        currentStock.quote.latestPrice * stock.amount_owned
      ).toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
      let className = "neutral";
      if (currentStock.quote.latestPrice < currentStock.quote.open) {
        className = "negative";
      } else if (currentStock.quote.latestPrice > currentStock.quote.open) {
        className = "positive";
      }
      return (
        <tr className="portfolio-data">
          <td>{stock.stock_name}</td>
          <td className={className}>{stock.stock_symbol.toUpperCase()}</td>
          <td>{stock.amount_owned}</td>
          <td className={className}>{currentValue}</td>
          <td>
            {currentStock.quote.latestPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD"
            })}
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  };
  return <PricingData />;
};

export default PortfolioDataEntry;
