import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import icon from './college-cuisine-icon.png'
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div id="outer-login">
        <div className='login-container'>
          <div className='inner-login'>
            <form className='login-form' onSubmit={onLogin} autoComplete="off">
              <div id='auth-icon'>
                <img
                  src={icon}
                  alt=''
                />
              </div>
              <div id='login-banner'>
                <h4 id="to-college">
                  Log in to College Cuisine
                </h4>
              </div>
              <div className='login-errors'>
                {errors.length ? "Email or Password is incorrect" : <></>}
              </div>
              <div className='label-input'>
                <label>Email address</label>
                <input
                  name='email'
                  type='text'
                  value={email}
                  onChange={updateEmail}
                  autoFocus
                />
              </div>
              <div className='label-input'>
                <label id="password">Password</label>
                <input
                  name='password'
                  type='password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className="button">
                <button type='submit'>Log In</button>
              </div>
              <div className="button">
                <button className='loginform-bttns' onClick={(e) => {
                  setEmail('demo@aa.io');
                  setPassword('password')
                }}>Demo Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
