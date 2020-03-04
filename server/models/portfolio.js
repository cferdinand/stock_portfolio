const db = require("../../db/index.js");
const axios = require("axios");
const models = require("./index.js");
const { stockUrl } = require("../lib/config.js");

module.exports = {
  getStockPrice: symbol => {
    let sym = symbol.toUpperCase();
    return axios.get(`${stockUrl}&symbols=${sym}`).then(data => {
      return data[sym].quote.latestPrice;
    });
  }
};
