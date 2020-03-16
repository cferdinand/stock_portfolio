const models = require("../models/index.js");

module.exports = {
  getAllTransactions: (req, res) => {
    let userId = req.session.user_id || 1;
    models.Transactions.getTransactions(userId).then(transactions => {
      res.status(200).send(transactions);
    });
  }
};
