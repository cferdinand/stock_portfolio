import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "./MainPage.jsx";

const Login = () => {
  const [username, updateUserName] = useState("");
  const [password, updatePassword] = useState("");

  return (
    <div>
      <form
        className="loginForm"
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <label>Username: </label>
        <div className="username">
          <input
            type="text"
            name="username"
            onChange={event => {
              updateUserName(event.target.value);
            }}
          />
        </div>
        <label>Password: </label>
        <div className="password">
          <input
            type="password"
            name="pwd"
            onChange={event => {
              updatePassword(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="submit">
          Login
        </button>
        <button
          type="reset"
          className="reset"
          onClick={e => {
            e.preventDefault();
          }}
        >
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
