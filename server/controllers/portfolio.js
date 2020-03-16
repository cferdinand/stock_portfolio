const models = require("../models/index.js");

module.exports = {
  buyStock: (req, res, next) => {
    if (req.body.transaction.type === "sell") {
      next();
      return;
    }
    // create the transaction object
    let transaction = req.body.transaction;
    let user = req.session.user_id;
    // get your balance
    models.Transactions.getBalance(user)
      .then(({ rows }) => {
        // then check if there is enough in your balance to purchase the stock
        let balance = parseFloat(rows[0].acct_balance).toFixed(2);
        // throw err if balance insufficient
        if (!balance > transaction.total) {
          throw { error: `Insufficient Balance. Current Balance = ${balance}` };
        }
        // update balance with the new amount and update the transactions table with the stock and user information
        balance -= transaction.total;
        models.Transactions.updateBalance(user, balance).catch(err => {
          console.log(err);
        });
      })
      .then(() => {
        // then check if you own the stock
        return models.Transactions.trade(transaction, user).then(() => {
          let stock = models.Portfolio.validate(transaction.symbol, user)
            .then(data => {
              return data;
            })
            .catch(err => {
              console.log(err);
            });
          return stock;
        });
      })
      .then(stock => {
        // update your portfolio with the amount
        let portfolio;
        if (!!stock[0]) {
          let amount = stock[0].amount_owned + transaction.amount;
          portfolio = models.Portfolio.updatePortfolio(
            amount,
            transaction,
            user
          ).then(() => {
            return models.Portfolio.getPortfolio(user);
          });
        } else {
          portfolio = models.Portfolio.addStock(transaction, user).then(() => {
            return models.Portfolio.getPortfolio(user);
          });
        }
        return portfolio;
      })
      .then(({ rows }) => {
        // then send portfolio
        res.status(201).send(rows);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  },
  sellStock: (req, res) => {
    // create the transaction object
    let transaction = req.body.transaction;
    let user = req.session.user_id;
    // check if you have the stock in your portfolio and if you have enough
    models.Portfolio.validate(transaction.symbol, user)
      .then(stock => {
        // minus the amount from your portfolio
        let stockAmount = stock[0] ? stock[0].amount_owned : undefined;
        if (!!stockAmount && stockAmount >= transaction.amount) {
          stockAmount -= transaction.amount;
        } else {
          throw { error: "Insufficient Stock Balance" };
        }
        return stockAmount;
      })
      .then(stockAmount => {
        return models.Portfolio.updatePortfolio(stockAmount, transaction, user);
      })
      .then(() => {
        return models.Transactions.getBalance(user).then(({ rows }) => {
          return rows[0].acct_balance + transaction.total;
        });
      })
      .then(balance => {
        return models.Transactions.updateBalance(user, balance);
      })
      .then(() => {
        return models.Transactions.trade(transaction, user);
      })
      .then(() => {
        return models.Portfolio.validate(transaction.symbol, user).then(
          stock => {
            if (stock[0].amount_owned <= 0) {
              return models.Portfolio.remove(transaction.symbol, user);
            }
          }
        );
      })
      .then(() => {
        models.Portfolio.getPortfolio(user).then(({ rows }) => {
          res.status(201).send(rows);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  }
};
