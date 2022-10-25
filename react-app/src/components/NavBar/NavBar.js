import "./NavBar.css"
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [category, setCategory] = useState("");

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
          <Link id="login" to='/recipe/add'>Add Recipe+</Link>
          <div className="dropdown">
            <div id="login" className="drop">Categories</div>
            <div className="dropdown-content">
              <div className="cat-link">
                <Link to="/category/Breakfast/1">Breakfast</Link>
              </div>
              <div className="cat-link">
                <Link to="/category/Lunch/2">Lunch</Link>
              </div>
              <div className="cat-link">
                <Link to="/category/Dinner/3">Dinner</Link>
              </div>
              <div className="cat-link">
                <Link to="/category/Beverages/4">Beverages</Link>
              </div>
              <div className="cat-link">
                <Link to="/category/Dessert/5">Dessert</Link>
              </div>
              <div className="cat-link">
                <Link to="/category/Healthy/6">Healthy</Link>
              </div>
              <div className="cat-link">
                <Link to="/category/Snack/7">Snack</Link>
              </div>
            </div>
          </div>
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
