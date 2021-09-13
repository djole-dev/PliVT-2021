import React from "react";
import "./Navigation.css";


import Logo from "./logo.png";

import { Link } from "react-router-dom";


function Navigation() {
  
  return (
    <div className='navigation'>

      <div className='navigation_nav'>
      <Link to={'/login'} style={{ textDecoration: "none" }}>
          <div className='navigation_option'>
            <span className='navigation_optionLineOne'> Hello, {"Sign in"}</span>
          </div>
        </Link>


        <Link to='/createSurvey' style={{ textDecoration: "none" }}>
        <div className='navigation_option'>
          <span className='navigation_optionLineOne'>Create</span>
          <span className='navigation_optionLineTwo'>Survey</span>
        </div>
        </Link>

        <Link to='/mySurveys' style={{ textDecoration: "none" }}>
        <div className='navigation_option'>
          <span className='navigation_optionLineOne'>My </span>
          <span className='navigation_optionLineTwo'>Surveys</span>
        </div>
        </Link>

        <Link to='/aboutUs' style={{ textDecoration: "none" }}>
        <div className='navigation_option'>
          <span className='navigation_optionLineOne'>About </span>
          <span className='navigation_optionLineTwo'>Us</span>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
