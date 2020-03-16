const db = require("../../db/index.js");

module.exports = {
  newBalance: (userId, amount = 5000) => {
    return db
      .query(
        `INSERT INTO balance (user_id, acct_balance) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
        [userId, amount]
      )
      .catch(err => {
        console.log("models.newbalance error", err);
      });
  },
  getBalance: userId => {
    return db
      .query(`SELECT acct_balance FROM balance WHERE user_id=${userId}`)
      .catch(err => {
        console.log("getBalance error", err);
      });
  },
  updateBalance: (userId, amount) => {
    return db
      .query(
        `UPDATE balance SET acct_balance='${amount}' WHERE user_id='${userId}'`
      )
      .then(() => {
        return amount;
      })
      .catch(err => {
        console.log("updating the acct balance error", err);
      });
  },
  trade: (transaction, userId) => {
    return db.query(
      `INSERT INTO transactions(user_id, stock_sym, stock_name,amount,${transaction.type}_price,total,created_date) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        userId,
        transaction.symbol,
        transaction.name,
        transaction.amount,
        transaction.price,
        transaction.total,
        new Date().toLocaleString()
      ]
    );
  },
  getTransactions: user => {
    return db
      .query(`SELECT * FROM transactions WHERE user_id='${user}'`)
      .then(({ rows }) => {
        return rows;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
