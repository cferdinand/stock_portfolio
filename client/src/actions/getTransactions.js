import axios from "axios";

const getTransactions = () => {
  return axios
    .get("/transactions/data")
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export default getTransactions;
