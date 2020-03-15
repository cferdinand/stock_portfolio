import React from "react";

const TopGainers = ({ topGainers }) => {
  const TopGainersData = () => {
    if (topGainers) {
      return topGainers.map((stock, idx) => {
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
          <TopGainersData />
        </tbody>
      </table>
    </div>
  );
};

export default TopGainers;
