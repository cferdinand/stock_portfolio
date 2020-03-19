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
        console.log("models.getuser error", err);
        throw err;
      });
  },
  addNewUser: (username, email, password, sessionId) => {
    return db
      .query(
        `INSERT INTO users (user_name,user_email, user_password, sessionid) VALUES ($1,$2,$3,$4) RETURNING sessionid, id`,
        [username, email, password, sessionId]
      )
      .then(data => {
        let userId = data.rows[0].id;
        models.Transactions.newBalance(userId);
        return data;
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log("models.adduser error", err);
        throw err;
      });
  }
};
