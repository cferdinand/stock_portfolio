const models = require("../models/index.js");
module.exports = {
  getTopTenData: (req, res) => {
    let mostActive = models.Stock.getMostActive();
    let topGained = models.Stock.getTopGainers();
    Promise.all([mostActive, topGained]).then(data => {
      let topTenData = { mostActive: data[0].data, topGained: data[1].data };
      res.status(200).send(topTenData);
    });
  }
};
