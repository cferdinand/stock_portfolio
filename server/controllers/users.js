const models = require("../models/index.js");
const bcrypt = require("bcrypt");

module.exports = {
  addUser: async (req, res) => {
    const saltRounds = 10;
    let user;
    try {
      user = await models.Users.getUser(req.body.userEmail);
    } catch (err) {
      console.log("ctrl.getUser test error", err);
    }
    if (!user.rowCount) {
      bcrypt
        .hash(req.body.password, saltRounds)
        .then(async hash => {
          let newUser;
          try {
            newUser = await models.Users.addNewUser(
              req.body.username,
              req.body.userEmail,
              hash,
              req.session.id
            );
          } catch (err) {
            console.log("ctrl.adduser error", err);
          }
          return newUser.rows[0].id;
        })
        .then(async id => {
          try {
            await models.Sessions.update(req.session.id, id);
          } catch (err) {
            console.log("ctrl updateSession", err);
          }
        })
        .then(() => {
          res.sendStatus(204);
        });
    } else {
      res.status(500).send("User already exists");
    }
  },
  getExistingUser: async (req, res) => {
    let user;
    try {
      user = await models.Users.getUser(req.body.userEmail);
    } catch (err) {
      console.error("ctrl getUser error", err);
      res.sendStatus(500);
    }
    if (user.rowCount !== 0) {
      const valid = await bcrypt.compare(
        req.body.password,
        user.rows[0].user_password
      );
      if (valid) {
        await models.Sessions.update(req.session.id, user.rows[0].id);
        res.sendStatus(204);
      } else {
        res.status(403).send({ response: "Username or passowrd incorrect" });
      }
    } else {
      res.status(403).send({ response: "User Not Found" });
    }
  },
  logout: (req, res, next) => {
    return models.Sessions.delete(req.session.user_id)
      .then(() => {
        res.clearCookie("portfoli");
        res.status(200).send(true);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(false);
      });
  }
};
