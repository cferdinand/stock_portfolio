const db = require("../../db/index.js");
const models = require("./index.js");

module.exports = {
  getUser: email => {
    return db
      .query(`SELECT * FROM users WHERE user_email='${email}'`)
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  addNewUser: (email, password, sessionId) => {
    return db
      .query(
        `INSERT INTO users (user_email, user_password, sessionid) VALUES ($1,$2,$3) RETURNING sessionid, id`,
        [email, password, sessionId]
      )
      .then(data => {
        let userId = data[0].id;
        models.Transactions.updateBalance(userId);
        return data;
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
};
