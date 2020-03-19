import React from "react";

const TransactionDataEntry = ({ trans, idx }) => {
  let price = trans.buy_price ? trans.buy_price : trans.sell_price;
  let className = trans.buy_price ? "negative" : "positive";
  return (
    <tr key={idx} className="transaction-data">
      <td>{trans.stock_name}</td>
      <td>{trans.stock_sym.toUpperCase()}</td>
      <td>
        {trans.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })}
      </td>
      <td className={className}>{price}</td>
      <td>{trans.created_date}</td>
      <td>
        {trans.total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD"
        })}
      </td>
    </tr>
  );
};

export default TransactionDataEntry;
