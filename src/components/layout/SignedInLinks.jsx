import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";
import "./SignedInLinks.scss";
import bell from "../../svg/bell.svg";
import defaultAvatar from "../../images/defaultAvatar.png";
import pencil from "../../svg/pencil.svg";
import layers from "../../svg/layers.svg";
import signoutIcon from "../../svg/signoutIcon.svg";
import humanLogo from "../../svg/humanLogo.svg";
import SearchInput from '../search/SearchInput.jsx'
import {NavLink} from 'react-router-dom'

const SignedInLinks = (props) => {
  let [boolDropDown, setBoolDropDown] = useState(false);
 
  console.log(props.profile);
  return (
    <div>
      <div className="signedin-container">
        <SearchInput/>
        <button
          id="bell"
         
          className="signin-navbar-button"
        >
          <img src={bell} alt="bell icon" />
        </button>
        {/* <span id="displayName">{handleName(props.auth.displayName)}</span> */}
        <button
          id="avatar-button"
          className="signin-navbar-button"
          onClick={() => setBoolDropDown(!boolDropDown)}
        >
          <div>
            <img
              id="avatar-image"
              src={props.auth.avatar || defaultAvatar}
              alt="avatar"
              className="dropdown-logo"
            />
            <div
              id="dropdown-grid"
              className={`dropdown-container ${
                boolDropDown ? "visible" : "hidden"
              }`}
            >
              <NavLink to="/create-post" className="dropdown-button" onClick={() => {}}>
                <img
                  id="pencil-image"
                  src={pencil}
                  alt="pencil-logo"
                  className="dropdown-logo"
                />
                Writing
              </NavLink>
              <NavLink to="/create-post" className="dropdown-button">
                <img
                  id="layers-image"
                  src={layers}
                  alt="layers-logo"
                  className="dropdown-logo"
                />
                Series
              </NavLink>
              <NavLink to="/create-post" className="dropdown-button">
                <img
                  id="humanLogo-image"
                  src={humanLogo}
                  alt="humanLogo-logo"
                  className="dropdown-logo"
                />
                View profile
              </NavLink>
              <NavLink to="/" id="sign-out-button" className="dropdown-button"  onClick={props.signOut}>
                <img
                  id="signout-image"
                  src={signoutIcon}
                  alt="signoutIcon-logo"
                  className="dropdown-logo"
                 
                />
                Sign out
              </NavLink>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);
// export default SignedInLinks
