const axios = require("axios");
const Urls = require("../lib/config.js");

module.exports = {
  getTopGainers: () => {
    let url = Urls.topUrl("gainers");
    return axios
      .get(url)
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  getMostActive: () => {
    let url = Urls.topUrl("mostactive");
    return axios
      .get(url)
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  getStockPrice: symbol => {
    let url = Urls.stockUrl("quote");
    return axios
      .get(`${url}&symbols=${symbol}`)
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        return err;
      });
  },
  getChartData: symbol => {
    let url = Urls.stockUrl("chart");
    return axios.get(`${url}&symbols=${symbol}`).then(data => {});
  },
  getNewsData: () => {
    let url = Urls.stockUrl("news");
    return axios.get(`${url}&symbols=${symbol}`).then(data => {});
  }
};
