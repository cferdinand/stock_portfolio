import React, { useEffect, useState } from "react";
import Nav from "../Nav.jsx";
import SideNav from "../Sidebar/SideNav.jsx";
import TransactionDataEntry from "./TransactionDataEntry.jsx";
import getTransactions from "../../actions/getTransactions.js";

const TransactionMain = () => {
  const [transactions, setTrans] = useState([]);
  useEffect(() => {
    getTransactions().then(data => setTrans(data));
  }, []);

  const TransactionsData = () => {
    return transactions.map((trans, idx) => {
      return <TransactionDataEntry trans={trans} idx={idx} />;
    });
  };

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
          <div className="transaction-table">
            <table>
              <thead>
                <tr key="portfolio-Data-Key" className="transaction-heading">
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Transaction Amount</th>
                  <th>Transaction Price</th>
                  <th>Transaction Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <TransactionsData />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionMain;
