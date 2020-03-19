import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Nav from "./Nav.jsx";
import addUser from "../actions/addUser.js";

const SignUp = () => {
  const [username, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [userEmail, updateEmail] = useState("");
  const history = useHistory();

  const addNewUser = async () => {
    let newUser = await addUser(username, userEmail, password);
    newUser ? history.push("/home") : history.push("/signup");
  };

  return (
    <div>
      <div className="navigation">
        <Nav />
      </div>
      <div className="user-form-container">
        <form
          className="signupForm user-form"
          onSubmit={e => {
            e.preventDefault();
            addNewUser();
          }}
        >
          <div className="username-container">
            <label>Username: </label>
            <div className="username-input">
              <input
                type="text"
                name="username"
                placeholder="Enter a username"
                onChange={event => {
                  updateUserName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="email-container">
            <label>Email: </label>
            <div className="email-input">
              <input
                type="email"
                name="user_email"
                placeholder="Enter a valid email address.."
                onChange={event => {
                  updateEmail(event.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="password-container">
            <label>Password: </label>
            <div className="password">
              <input
                type="password"
                name="pwd"
                placeholder="Enter your password"
                onChange={event => {
                  updatePassword(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="user-buttons-container">
            <button type="submit" className="submit">
              Submit
            </button>
            <button type="reset" className="reset">
              Reset
            </button>
          </div>
        </form>
        <div>
          <p>
            Already have an account? <Link to="/login">Click Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
