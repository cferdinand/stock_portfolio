import axios from "axios";

const topTenData = () => {
  return dispatch => {
    return axios
      .get("/homedata")
      .then(({ data }) => {
        dispatch({
          type: "HOME",
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default topTenData;
