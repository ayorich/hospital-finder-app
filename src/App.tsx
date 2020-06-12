import React from 'react';
// import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './container/Home'
// import SignUpPage from "../SignUp";
// import SignInPage from "../SignIn";

import './App.css';




const App: React.FC = (): JSX.Element => {
  

  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
