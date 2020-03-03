const db = require("../../db/index.js");

module.exports = {
  newBalance: (userId, amount = 5000) => {
    return db.query(
      `INSERT INTO balance (user_id, acct_balance) VALUES ($1,$2) ON CONFLICT DO NOTHING`,
      [userId, amount]
    );
  },
  updateBalance: async (userId, amount) => {
    let acctBalance = await this.getBalance(userId);
    let calculatedBalance = acctBalance + amount;
    return db
      .query(
        `UPDATE balance SET acct_balance='${calculatedBalance}' WHERE user_id='${userId}'`
      )
      .then(() => {
        return calculatedBalance;
      });
  },
  getBalance: userId => {
    return db.query(`SELECT acct_balance FROM balance WHERE user_id=${userId}`);
  }
};
