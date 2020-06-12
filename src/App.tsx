import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from './container/Home'
import SignUpPage from "./container/SignUp";
import SignInPage from "./container/SignIn";
import * as ROUTES from "./constants/routes";
import './App.css';




const App: React.FC = (): JSX.Element => {
  

  return (
    <Router>
      <div className="App">
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      </div>
    </Router>
  );
}

export default App;
