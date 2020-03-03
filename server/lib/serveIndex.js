const path = require("path");

module.exports = {
  serveStaticFile: (req, res) => {
    res.sendFile(
      path.join(__dirname + "/../../client/dist/index.html"),
      function(err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  }
};
