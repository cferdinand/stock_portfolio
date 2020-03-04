import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import validateUser from "../actions/validateUser.js";

const Login = () => {
  const [password, updatePassword] = useState("");
  const [userEmail, updateEmail] = useState("");
  const history = useHistory();

  const validate = async () => {
    let isLoggedIn = await validateUser(userEmail, password);
    isLoggedIn ? history.push("/home") : history.push("/login");
  };

  return (
    <div>
      <form
        className="loginForm"
        onSubmit={e => {
          e.preventDefault();
          validate();
        }}
      >
        <label>Email: </label>
        <div className="email">
          <input
            type="email"
            name="user_email"
            placeholder="Enter valid email address.."
            onChange={event => {
              updateEmail(event.target.value);
            }}
            required
          />
        </div>
        <label>Password: </label>
        <div className="password">
          <input
            type="password"
            name="pwd"
            placeholder="Enter valid password.."
            onChange={event => {
              updatePassword(event.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="submit">
          Login
        </button>
        <button type="reset" className="reset">
          Reset
        </button>
      </form>
      <div>
        <p>
          Don't have an account?
          <Link to="/signup">
            <span> Sign Up!</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
