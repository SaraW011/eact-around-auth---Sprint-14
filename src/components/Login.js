import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .signin(email, password)
      .then((data) => {
        if (!data) {
          setMessage("Invalid login info");
        }
        if (data.jwt) {
          props.handleLogin(data.user);
          navigate("/");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login">
      <p className="login__title">Welcome back!</p>
      <form onSubmit={handleSubmit} className="login__form">
        <label htmlFor="email">Email:</label>
        <input
          required
          className="login__input"
          id="email"
          name="email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={setEmail}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          className="login__input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={setPassword}
        />
        <button type="submit" className="login__button">
          Log in
        </button>
      </form>
        <Link to="/signup" className="login__link">
          Not a member yet? Sign up here!
        </Link>
    </div>
  );
}