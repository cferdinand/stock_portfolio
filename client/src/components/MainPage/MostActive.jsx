import React from "react";

const MostActive = ({ mostActive }) => {
  const MostActiveData = () => {
    if (mostActive) {
      return mostActive.map((stock, idx) => {
        return (
          <tr key={idx}>
            <td>{stock.companyName}</td>
            <td>{stock.symbol}</td>
            <td>{stock.open}</td>
            <td>{stock.close}</td>
            <td>{stock.high}</td>
            <td>{stock.low}</td>
            <td>{stock.changePercent}</td>
          </tr>
        );
      });
    }
    return [];
  };

  return (
    <div>
      <table>
        <thead>
          <tr key="header">
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
