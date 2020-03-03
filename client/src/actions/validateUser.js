import axios from "axios";

const validateUser = (username, password) => {
  return dispatch => {
    return axios
      .get(`/login/users/?username=${username}&password=${password}`)
      .then(({ data }) => {
        dispatch({
          type: data.response === "User Not Found" ? "NOTLOGGEDIN" : "LOGGEDIN",
          payload: data.response
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default validateUser;
