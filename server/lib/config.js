const apiKey = process.env.API_TOKEN;
const baseUrl = "https://cloud.iexapis.com/stable/stock";
module.exports = {
  stockUrl: typeOfData => {
    return `${baseUrl}/market/batch?token=${apiKey}&types=${typeOfData}`;
  },
  topUrl: listType => {
    return `${baseUrl}/market/collection/list?collectionName=${listType}&token=${apiKey}`;
  }
};
