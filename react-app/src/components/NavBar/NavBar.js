import "./NavBar.css"
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { getAllRecipesThunk } from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import collegeCuisine from './college-cuisine-logo.png'


const NavBar = () => {
  const user = useSelector(state => state.session.user)
  // const allRecipes = useSelector(state => state.recipe)
  // const fuzzy = require('fuzzy');

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAllRecipesThunk());
  // }, [search])

  // const allRecipesArr = Object.values(allRecipes);

  // const results = fuzzy.filter('recipe', allRecipesArr);
  // const matches = results.map((el) => el)
  // console.log(matches);

  if (!user) {
    return (
      <nav id="nav">
        <div id="left-nav">
          <NavLink id="home" to='/' exact={true} activeClassName='active'>
            <img src={collegeCuisine} alt='College Cuisine' />
          </NavLink>
          <div className="border-right">
            <div></div>
          </div>
          {/* <div id="search">
            <i id="spy" class="fa-solid fa-magnifying-glass"></i>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              id="search-bar"
              placeholder="What would you like to cook?"

             ></input>
          </div> */}
        </div>
        <div id="login-signup">
          <div className="dropdown">
            <div id="login" className="drop">About</div>
            <div className="dropdown-content-about-no-user">
              <div className="about-link">
                <a href="https://github.com/ChzFlvrHrse/College-Cuisine">GitHub Repo</a>
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
            <img src={collegeCuisine} alt='College Cuisine' />
          </NavLink>
          <div className="border-right">
            <div></div>
          </div>
          {/* <div id="search">
            <i id="spy" class="fa-solid fa-magnifying-glass"></i>
            <input id="search-bar" placeholder="What would you like to cook?"></input>
          </div> */}
        </div>
        <div id="login-signup">
          <div className="dropdown">
            <div id="login" className="drop">About</div>
            <div className="dropdown-content-about">
              <div className="about-link">
                <a id='github' href="https://github.com/ChzFlvrHrse/College-Cuisine">GitHub Repo</a>
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
          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
        </div>
      </nav>
    );
  }

}

export default NavBar;
