import "./NavBar.css"
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import collegeCuisine2 from './college-cuisine-logo-2.png';
import { SearchBar } from "./SearchBar";


const NavBar = () => {
  const user = useSelector(state => state.session.user)

  if (!user) {
    return (
      <nav id="nav">
        <div id="left-nav">
          <NavLink id="home" to='/' exact={true} activeClassName='active'>
            <img src={collegeCuisine2} alt='College Cuisine' />
          </NavLink>
          <div className="border-right">
            <div></div>
          </div>
          <SearchBar />
        </div>
        <div id="login-signup">
          <div className="dropdown">
            <div id="login" className="drop">About</div>
            <div className="dropdown-content-about-no-user">
              <div className="about-link">
                <a href="https://github.com/ChzFlvrHrse" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
              <div className="about-link">
                <a href="https://www.linkedin.com/in/nathan-scott-0a7264183/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
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
            <img src={collegeCuisine2} alt='College Cuisine' />
          </NavLink>
          <div className="border-right">
            <div></div>
          </div>
          <SearchBar />
        </div>
        <div id="login-signup">
          <div className="dropdown">
            <div id="login" className="drop">About</div>
            <div className="dropdown-content-about">
              <div className="about-link">
                <a id='github' href="https://github.com/ChzFlvrHrse" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
              <div className="about-link">
                <a href="https://www.linkedin.com/in/nathan-scott-0a7264183/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>
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
          <div className="prof">
            <ProfileButton />
          </div>
        </div>
      </nav>
    );
  }

}

export default NavBar;
