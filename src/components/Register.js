import React from "react";
import { Link } from "react-router-dom";

export default function Register({
  email,
  password,
  handleRegistration,
  handleEmail,
  handlePassword,
}) {
  return (
    <div className="login">
      <h1 className="login__title">Sign Up</h1>
      <form className="login__form" onSubmit={handleRegistration}>
        <input
          className="login__input"
          name="email"
          placeholder="Email"
          required
          type="email"
          value={email}
          onChange={handleEmail}
        ></input>
        <input
          className="login__input"
          name="password"
          placeholder="Password"
          required
          type="password"
          value={password}
          onChange={handlePassword}
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
