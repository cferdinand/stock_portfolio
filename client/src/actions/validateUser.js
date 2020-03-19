import axios from "axios";

const validateUser = (userEmail, password) => {
  return axios
    .post(`/login`, { userEmail, password })
    .then(() => {
      return true;
    })
    .catch(err => {
      console.log(err);
    });
};

export default validateUser;
