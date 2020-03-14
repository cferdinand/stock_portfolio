const crypto = require("crypto");
const db = require("../../db/index.js");

module.exports = {
  create: () => {
    let hash = crypto.randomBytes(32).toString("hex");
    let queryString = `INSERT into sessions_table (session_value) VALUES ('${hash}') RETURNING id;`;
    return db
      .query(queryString)
      .then(({ rows }) => {
        return rows[0].id;
      })
      .catch(err => {
        console.log("createSession error", err);
      });
  },
  get: (columnName, value) => {
    let queryString = `SELECT * FROM sessions_table WHERE ${columnName} = '${value}';`;
    return db
      .query(queryString)
      .then(({ rows }) => {
        return rows[0];
      })
      .catch(err => {
        console.log("models.getsession error", err);
      });
  },
  update: (sessionId, userId) => {
    return db
      .query(`DELETE FROM sessions_table WHERE user_id='${userId}'`)
      .then(() => {
        return db
          .query(
            `UPDATE sessions_table SET user_id='${userId}' WHERE id='${sessionId}'`
          )
          .catch(err => {
            console.log(err);
          });
      })
      .then(() => {
        return db
          .query(`UPDATE users SET sessionid='${sessionId}' WHERE id=${userId}`)
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log("updateSession err", err);
      });
  },
  delete: userId => {
    return db
      .query(`DELETE FROM sessions_table WHERE user_id=${userId}`)
      .catch(err => {
        console.log("deleteSession error", err);
      });
  }
};
