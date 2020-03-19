import React from "react";

const MostActive = ({ mostActive }) => {
  const currencyFormat = num => {
    if (num) {
      return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    }
    return "N/A";
  };

  const MostActiveData = () => {
    if (mostActive) {
      return mostActive.map((stock, idx) => {
        return (
          <tr key={idx} className="top-ten-body">
            <td>{stock.companyName}</td>
            <td>{stock.symbol}</td>
            <td>{currencyFormat(stock.open)}</td>
            <td>{currencyFormat(stock.close)}</td>
            <td>{currencyFormat(stock.high)}</td>
            <td>{currencyFormat(stock.low)}</td>
            <td>{stock.changePercent.toFixed(2)}</td>
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
    <div className="most-active top-ten-table">
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
          <MostActiveData />
        </tbody>
      </table>
    </div>
  );
};

export default MostActive;
