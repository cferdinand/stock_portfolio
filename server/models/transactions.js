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
  updateBalance: async (userId, amount) => {
    let acctBalance = await db
      .query(`SELECT acct_balance FROM balance WHERE user_id=${userId}`)
      .catch(err => {
        console.log("getting the account balance error", err);
      });
    let calculatedBalance = acctBalance + amount;
    return db
      .query(
        `UPDATE balance SET acct_balance='${calculatedBalance}' WHERE user_id='${userId}'`
      )
      .then(() => {
        return calculatedBalance;
      })
      .catch(err => {
        console.log("updating the acct balance error", err);
      });
  },
  buyStock: symbol => {},
  sellStock: symbol => {}
};
