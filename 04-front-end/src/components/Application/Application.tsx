
import React, { useEffect } from "react";
import Navigation from "../Navigation/Navigation";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./Application.css";
import SurveyPage from "../SurveyPage/SurveyPage";
import QuestionPage from "../QuestionsPage/QuestionPage";

export const DataContext = React.createContext([]);

function App() {

  return (
    <DataContext.Provider value={[]}>
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
            <SurveyPage/>
          </Route>
          <Route path='/aboutUs'>
            <Navigation/>
          <h1>aboutUs</h1>
          </Route>
          <Route path='/questions'>
            <Navigation/>
           <QuestionPage/>
          </Route>
        </Switch>
      </div>
    </Router>
    </DataContext.Provider>
  );
}

export default App;

