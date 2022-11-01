import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let errors = [];

    if (username.length > 40 || username.length < 4) errors.push("Username must be between 4 and 40 characters");
    if (!password.length) errors.push("Password is required");
    if (!repeatPassword.length) errors.push("Please repeat the password")

    setErrors(errors)

  }, [username, password, repeatPassword, email])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords did not match"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div className="signup-container">
        <div className="inner-signup">
          <form autoComplete="off" className="signup-form" onSubmit={onSignUp}>
            <h4 id="to-klickr">Sign up for College Cuisine</h4>
            <div className="signup-form-errors">
              {errors.length > 0 && (
                <div className="signup-errors-wrapper">
                  {errors.map((error, idx) => (
                    <div key={idx}>{error}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="label-input">
              <label id="labelInputSignUpName">User Name</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                required={true}
                autoComplete="username"
              ></input>
            </div>
            <div className="label-input">
              <label>Email address</label>
              <input
                type="text"
                name="email"
                autoComplete="email"
                onChange={updateEmail}
                value={email}
                required={true}
              ></input>
            </div>
            <div className="label-input">
              <label id="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                autoComplete="new-password"
                required={true}
              ></input>
            </div>
            <div className="label-input">
              <label id="repeat">Repeat Password</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                autoComplete="off"
                required={true}
              ></input>
            </div>

            <div className="button">
              <button type="submit" disabled={errors.length}>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
