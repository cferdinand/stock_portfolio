import axios from "axios";
import validEmail from "../lib/emailValidation.js";
import { Redirect } from "react-router-dom";

const addUser = (username, userEmail, password) => {
  if (validEmail(userEmail)) {
    return axios
      .post(`/signup`, { username, userEmail, password })
      .then(() => {
        return true;
      })
      .catch(err => {
        console.error(err);
      });
  }
};

export default addUser;
