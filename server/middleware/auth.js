const models = require("../models/index.js");

module.exports = {
  createSession: (req, res, next) => {
    Promise.resolve(req.cookies.portfoli)
      .then(hash => {
        if (!hash) {
          throw hash;
        }
        return models.Sessions.get("session_value", hash);
      })
      .then(session => {
        if (!session) {
          throw session;
        }
        return session;
      })
      .catch(() => {
        return models.Sessions.create()
          .then(id => {
            return models.Sessions.get("id", id);
          })
          .then(session => {
            res.cookie("portfoli", session.session_value);
            return session;
          });
      })
      .then(session => {
        req.session = session;
        next();
      });
  },
  verifySession: (req, res, next) => {
    return models.Sessions.get("id", req.session.id).then(session => {
      if (!session || !session.user_id) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  },
  isLoggedIn: (req, res, next) => {
    return models.Sessions.get("id", req.session.id).then(session => {
      if (session && session.user_id) {
        res.redirect("/home");
      } else {
        next();
      }
    });
  }
};
