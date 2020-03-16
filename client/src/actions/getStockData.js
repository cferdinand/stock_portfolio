import axios from "axios";
const getStockData = symbols => {
  return dispatch => {
    return axios
      .get(`/stock?symbols=${symbols}`)
      .then(({ data }) => {
        if (data.error) {
          throw data;
        }
        dispatch({
          type: "TRADE",
          payload: data
        });
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
