import axios from "axios";

const addUser = (username, password) => {
  return dispatch => {
    return axios
      .post(`/login/users`, { username, password })
      .then(({ data }) => {
        dispatch({
          type: "LOGGEDIN",
          payload: data.response
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default addUser;
