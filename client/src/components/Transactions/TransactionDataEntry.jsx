import React from "react";
import currencyFormat from "../../lib/currencyFormatter.js";

const TransactionDataEntry = ({ trans, idx }) => {
  let price = trans.buy_price
    ? parseFloat(trans.buy_price)
    : parseFloat(trans.sell_price);
  let className = trans.buy_price ? "negative" : "positive";

  return (
    <tr key={idx} className="transaction-data">
      <td>{trans.stock_name}</td>
      <td>{trans.stock_sym.toUpperCase()}</td>
      <td>{trans.amount}</td>
      <td className={className}>{currencyFormat(price)}</td>
      <td>{trans.created_date}</td>
      <td>{currencyFormat(parseFloat(trans.total))}</td>
    </tr>
  );
};

export default TransactionDataEntry;
