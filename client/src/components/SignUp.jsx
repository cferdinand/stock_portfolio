import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav.jsx";

const SignUp = ({ addUser }) => {
  const [username, updateUserName] = useState("");
  const [password, updatePassword] = useState("");
  const [userEmail, updateEmail] = useState("");

  const addNewUser = () => {
    return addUser(username, userEmail, password);
  };

  return (
    <div>
      <Nav />
      <form
        className="signupForm"
        onSubmit={e => {
          e.preventDefault();
          addNewUser();
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
            onChange={event => {
              updatePassword(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
        <button type="reset" className="reset">
          Reset
        </button>
      </form>
      <div>
        <p>
          Already have an account? <Link to="/login">Click Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
