import React from "react";
import logo from "../images/logo.svg";
// import mobileMenuIcon from "../images/mobile-menu.svg";
import { Link, useLocation } from "react-router-dom";

function Header({props, email, isLoggedIn, handleLogout, openMobileMenu}) {
  
  
  const userLocation = useLocation().pathname;

  return (
    <header className="header">
      <img
        id="site-logo"
        className="logo"
        src={logo}
        alt="Around the USA logo"
      />
       
      <div 
      className="header__menu"
      // email={email}
      // isLoggedIn={isLoggedIn}
      // handleLogout={handleLogout}
      >
      <h2 className="header__user-email">{email}</h2>



        {userLocation === "/signin" ? (
          <Link to="/signup" className="header__page-link">
            Sign up
          </Link>
        ) : (
          <Link to="/signin" className="header__page-link">
            Log in
          </Link>
        )}
      </div>

      {/* {isLoggedIn && openMobileMenu && <img
        id="mobile-menu"
        className="header__mobile-menu"
        src={mobileMenuIcon}
        alt="menu"
        onClick={props.handleMobileMenu}
      />
        } */}

    </header>
  );
}

export default Header;
