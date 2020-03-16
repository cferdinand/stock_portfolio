const models = require("../models/index.js");
module.exports = {
  getTopTenData: (req, res) => {
    let mostActive = models.Stock.getMostActive();
    let topGained = models.Stock.getTopGainers();
    Promise.all([mostActive, topGained]).then(data => {
      let topTenData = { mostActive: data[0].data, topGained: data[1].data };
      res.status(200).send(topTenData);
    });
  },
  getStockPrice: (req, res) => {
    let symbols = req.query.symbols;
    models.Stock.getStockPrice(symbols)
      .then(data => {
        if (data.message) {
          throw data;
        }
        res.status(200).send(data);
      })
      .catch(err => {
        res.json({ error: `Invalid symbol ${symbols.toUpperCase()}` });
      });
  }
};
