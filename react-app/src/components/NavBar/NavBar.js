import "./NavBar.css"
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  console.log(user)

  if (!user) {
    return (
      <nav id="nav">
        <div id="left-nav">
          <NavLink id="home" to='/' exact={true} activeClassName='active'>
            College Cuisine
          </NavLink>
          <div id="search">
            <i id="spy" class="fa-solid fa-magnifying-glass"></i>
            <input id="search-bar" placeholder="What would you like to cook?"></input>
          </div>
        </div>
        <div id="login-signup">
          <NavLink id='login' to='/login' exact={true} activeClassName='active'>
            Log In
          </NavLink>
          <NavLink id='signup' to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </div>
      </nav>
    );
  } else {
    return (
      <nav id="nav">
        <div id="left-nav">
          <NavLink id="home" to='/' exact={true} activeClassName='active'>
            College Cuisine
          </NavLink>
          <div id="search">
            <i id="spy" class="fa-solid fa-magnifying-glass"></i>
            <input id="search-bar" placeholder="What would you like to cook?"></input>
          </div>
        </div>
        <div id="login-signup">
          <LogoutButton />
          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
        </div>
      </nav>
    );
  }

}

export default NavBar;
