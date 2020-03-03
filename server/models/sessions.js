const crypto = require("crypto");
const db = require("../../db/index.js");

module.exports = {
  create: () => {
    let hash = crypto.randomBytes(32).toString("hex");
    let queryString = `INSERT into sessions_table (session_value) VALUES ('${hash}') RETURNING id;`;
    return db.query(queryString).then(({ rows }) => {
      return rows[0].id;
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
        console.log(err);
      });
  }
};
