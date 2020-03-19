import React from "react";
import currencyFormat from "../../lib/currencyFormatter.js";

const TopGainers = ({ topGainers }) => {
  const TopGainersData = () => {
    if (topGainers) {
      return topGainers.map((stock, idx) => {
        return (
          <tr key={idx} className="top-ten-body">
            <td>{stock.companyName}</td>
            <td>{stock.symbol}</td>
            <td>{currencyFormat(stock.open)}</td>
            <td>{currencyFormat(stock.close)}</td>
            <td>{currencyFormat(stock.high)}</td>
            <td>{currencyFormat(stock.low)}</td>
            <td>{parseFloat(stock.changePercent).toFixed(2)}</td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  };

  return (
    <div className="top-gainers top-ten-table">
      <table>
        <thead>
          <tr key="header" className="top-ten-heading">
            <th>Name</th>
            <th>Symbol</th>
            <th>Open</th>
            <th>Close</th>
            <th>High</th>
            <th>Low</th>
            <th>% Change</th>
          </tr>
        </thead>
        <tbody>
          <TopGainersData />
        </tbody>
      </table>
    </div>
  );
};

export default TopGainers;
