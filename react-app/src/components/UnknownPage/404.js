import React from "react";
import "./404.css";
import { login } from '../../store/session';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function PageNotFound() {

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.session.user);

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'))
    history.push('/');
  };
  if (!user) {

    return (
      <div className="login-containerPNF">
        <div className="inner-loginPNF">
          <div id="login-bannerPNF">
            {/* <div id="circles-containerPNF">
            <img src={klickrLogo} alt="" id="circlesPNF"></img>
          </div> */}
            <h4 id="to-klickr1">Sign in Required</h4>
            <div className="button">
              <button className="loginform-bttns" onClick={onLogin}>
                Click here to login as Demo User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else return (
    <div className="login-containerPNF">
      <div className="inner-loginPNF">
        <div id="login-bannerPNF">
          {/* <div id="circles-containerPNF">
            <img src={klickrLogo} alt="" id="circlesPNF"></img>
          </div> */}
          <h4 id="to-klickr1">Page Not Found</h4>
          <Link to='/' className="button">
              <button to='/' className="loginform-bttns">
                Click here to go home
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
}
