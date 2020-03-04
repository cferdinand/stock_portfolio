const models = require("../models/index.js");
const bcrypt = require("bcrypt");

module.exports = {
  addUser: async (req, res) => {
    const saltRounds = 10;
    let user = await models.Users.getUser(req.body.userEmail);
    if (!user.rowCount) {
      bcrypt
        .hash(req.body.password, saltRounds)
        .then(async hash => {
          let newUser = await models.Users.addNewUser(
            req.body.username,
            req.body.userEmail,
            hash,
            req.session.id
          );
          return newUser.rows[0].id;
        })
        .then(async id => {
          await models.Sessions.update(req.session.id, id);
        })
        .then(() => {
          res.status(204);
        });
    } else {
      res.status(500).send("User already exists");
    }
  },
  getExistingUser: async (req, res) => {
    try {
      let user = await models.Users.getUser(req.body.userEmail);
      if (user.rowCount !== 0) {
        const valid = await bcrypt.compare(
          req.body.password,
          user.rows[0].user_password
        );
        valid
          ? res.sendStatus(204)
          : res
              .status(403)
              .send({ response: "Username or passowrd incorrect" });
      } else {
        res.status(403).send({ response: "User Not Found" });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
  logout: (req, res, next) => {
    return models.Sessions.delete({ hash: req.cookies.portfoli })
      .then(() => {
        res.clearCookie("portfoli");
        res.redirect("/login");
      })
      .error(error => {
        res.status(500).send(error);
      });
  }
};
