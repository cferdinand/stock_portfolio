import axios from "axios";

const tradeStock = transaction => {
  return dispatch => {
    return axios
      .post(`/stock`, { transaction })
      .then(({ data }) => {
        if (data.error) {
          throw data;
        }
        dispatch({
          type: "PORTFOLIO",
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
        alert(err.response.data.error);
      });
  };
};

export default tradeStock;
