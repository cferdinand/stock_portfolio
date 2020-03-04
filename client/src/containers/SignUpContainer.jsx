import { connect } from "react-redux";
import addUser from "../actions/addUser.js";
import SignUp from "../components/SignUp.jsx";

const mapDispatchToProps = dispatch => {
  return {
    addUser: (user, email, password) => dispatch(addUser(user, email, password))
  };
};
export default connect(null, mapDispatchToProps)(SignUp);
