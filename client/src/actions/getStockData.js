import axios from "axios";
const getStockData = (symbols, pricing = false) => {
  return dispatch => {
    return axios
      .get(`/stock?symbols=${symbols}`)
      .then(({ data }) => {
        if (data.error) {
          throw data;
        }
        if (pricing) {
          dispatch({
            type: "PRICING_DATA",
            payload: data
          });
        } else {
          dispatch({
            type: "TRADE",
            payload: data
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "TRADE_ERROR",
          payload: err
        });
      });
  };
};

export default getStockData;
