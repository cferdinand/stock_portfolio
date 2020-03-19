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
    let resObj = { portfolioData: [], balance: 0 };
    // get your balance
    models.Transactions.getBalance(user)
      .then(({ rows }) => {
        // then check if there is enough in your balance to purchase the stock
        let balance = parseFloat(parseFloat(rows[0].acct_balance).toFixed(2));
        // throw err if balance insufficient
        if (transaction.total > balance) {
          throw { error: `Insufficient Balance. Current Balance = ${balance}` };
        }
        // update balance with the new amount and update the transactions table with the stock and user information
        balance -= transaction.total;
        return models.Transactions.updateBalance(user, balance)
          .then(balance => {
            resObj.balance = balance;
          })
          .catch(err => {
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
        resObj.portfolioData = rows;
        // then send portfolio
        res.status(201).send(resObj);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  },
  sellStock: (req, res) => {
    // create the transaction object
    let transaction = req.body.transaction;
    let user = req.session.user_id;
    let resObj = { portfolioData: [], balance: 0 };
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
          let acctBalance = parseFloat(
            parseFloat(rows[0].acct_balance).toFixed(2)
          );
          let transactionTotal = parseFloat(
            parseFloat(transaction.total).toFixed(2)
          );
          let newBalance = acctBalance + transactionTotal;
          newBalance = parseFloat(newBalance.toFixed(2));
          return newBalance;
        });
      })
      .then(balance => {
        return models.Transactions.updateBalance(user, balance)
          .then(balance => {
            resObj.balance = balance;
          })
          .catch(err => {
            console.log(err);
          });
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
          resObj.portfolioData = rows;
          res.status(201).send(resObj);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  },
  getPortfolioData: (req, res) => {
    let user = req.session.user_id;
    models.Portfolio.getPortfolio(user)
      .then(({ rows }) => {
        let resObj = { portfolioData: rows };
        return models.Transactions.getBalance(user)
          .then(({ rows }) => {
            let parsedBal = parseFloat(rows[0].acct_balance);
            resObj.balance = parsedBal;
            return resObj;
          })
          .catch(err => {
            console.log(err);
          });
      })
      .then(resObj => {
        res.status(202).send(resObj);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send(err);
      });
  }
};
