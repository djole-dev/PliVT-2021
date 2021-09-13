
import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./Application.css";



function App() {

  return (
    <Router>
      <div className='Application'>
        <Switch>
        <Route exact path='/'>
          <Navigation/>
            <h1>home exact</h1>
          </Route>
          <Route path='/login'>
            <Navigation/>
            <h1>login</h1>
          </Route>
          <Route path='/createSurvey'>
            <Navigation/>
            <h1>createSurvey</h1>
          </Route>
          <Route path='/mySurveys'>
          <Navigation/>
              <h1>mySurveys</h1>
          </Route>

          <Route path='/aboutUs'>
            <Navigation/>
          <h1>aboutUs</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

