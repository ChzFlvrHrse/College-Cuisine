import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LogoutButton from "../auth/LogoutButton";
import "./ProfileButton.css";

export default function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <div>
      <div className="profile-button-border" onClick={openMenu}>
        <i id='profile-icon' class="fa-solid fa-utensils"></i>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          {sessionUser && (
            <div className="profile-list">
              <div className="user-name-li">
                  Lets Eat {sessionUser.username}!
              </div>
              <div className="user-name-li">
                {sessionUser.email}
              </div>
              <div className="hover-link logout-li" onClick={logout}>
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
