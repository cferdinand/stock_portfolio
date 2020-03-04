const apiKey = process.env.API_TOKEN;
module.exports = {
  baseUrl: "https://cloud.iexapis.com/stable/stock",
  stockUrl: `${this.baseUrl}/market/batch?token=${apiKey}&types=quote`,
  newsUrl: `${this.baseUrl}/market/batch?token=${apiKey}&types=news`,
  chartUrl: `${this.baseUrl}/market/batch?token=${apiKey}&types=chart`
};
