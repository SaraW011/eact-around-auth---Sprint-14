import React from "react";
import { Link, Navigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      console.log("registration error");
      auth.signup(email, password).then((res) => {
        if (res) {
          setMessage("");
          Navigate("/login");
        } else {
          setMessage("invalid user name or password");
        }
      });
    }
  };

  return (
    <div className="login">
      <h1 className="login__title">Sign Up</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          placeholder="Email"
          required
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        ></input>
        <input
          className="login__input"
          name="password"
          placeholder="Password"
          required
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        ></input>
        <button className="login__button" type="submit">
          Sign Up
        </button>
      </form>
      <Link to="/signin" className="login__link">
        Already a member? Log in here!
      </Link>
    </div>
  );
}
