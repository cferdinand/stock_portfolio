import axios from "axios";

const getPortfolio = () => {
  return dispatch => {
    return axios
      .get(`/portfolio/data`)
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
        dispatch({
          type: "PORTFOLIO_ERROR",
          payload: err
        });
      });
  };
};

export default getPortfolio;
