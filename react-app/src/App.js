import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { HomePage } from './components/HomePage/HomePage';
import AddRecipe from './components/AddRecipe/AddRecipe';
import Category from './components/Category/Category';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import EditRecipe from './components/EditRecipe/EditRecipe';
import DeleteReview from './components/DeleteReview/DeleteReview';
import EditReview from './components/EditReview/EditReview';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route exact path="/recipe/add">
          <AddRecipe />
        </Route>
        <Route exact path="/category/:categoryType/:categoryId">
          <Category />
        </Route>
        <Route exact path="/recipe/:recipeId">
          <RecipeDetails />
        </Route>
        <Route exact path="/recipe/:recipeId/edit">
          <EditRecipe />
        </Route>
        <Route>
          <DeleteReview />
        </Route>
        <Route>
          <EditReview />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
