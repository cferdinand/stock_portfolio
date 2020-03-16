const db = require("../../db/index.js");

module.exports = {
  getPortfolio: user => {
    return db.query(`SELECT * FROM portfolio WHERE user_id='${user}'`);
  },
  addStock: (transaction, user) => {
    return db
      .query(
        `INSERT INTO portfolio(user_id,stock_symbol,stock_name,amount_owned) VALUES($1,$2,$3,$4)`,
        [user, transaction.symbol, transaction.name, transaction.amount]
      )
      .catch(err => {
        return err;
      });
  },
  validate: (symbol, user) => {
    return db
      .query(
        `SELECT amount_owned FROM portfolio WHERE stock_symbol='${symbol}' AND user_id='${user}'`
      )
      .then(({ rows }) => {
        return rows;
      })
      .catch(err => {
        return err;
      });
  },
  updatePortfolio: (amount, transaction, user) => {
    return db
      .query(
        `UPDATE portfolio SET amount_owned='${amount}' WHERE user_id='${user}' AND stock_symbol='${transaction.symbol}'`
      )
      .catch(err => {
        return err;
      });
  },
  remove: (symbol, user) => {
    return db
      .query(
        `DELETE FROM portfolio WHERE stock_symbol='${symbol}' AND user_id=${user}`
      )
      .catch(err => {
        return err;
      });
  }
};
