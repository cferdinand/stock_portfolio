import axios from "axios";

const logoutUser = () => {
  return axios
    .post(`/logout`)
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.error(err);
    });
};

export default logoutUser;
