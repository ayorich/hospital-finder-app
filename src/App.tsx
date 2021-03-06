import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import HomePage from './container/Home'
import SignUpPage from "./container/SignUp";
import SignInPage from "./container/SignIn";
import * as ROUTES from "./constants/routes";
import firebase from "./firebaseConfig";

import './App.css';




const App: React.FC = (): JSX.Element => {
  const userdata :any = localStorage.getItem('authUser')
  const user = JSON.parse(userdata)
  const [authState, setauthState] = React.useState<any>(user);

  // SETS USERSTATE AND PERSIST DATA IN LOCAL STORAGE ONMOUNT
  React.useEffect(() => {
    firebase.auth.onAuthStateChanged((authUser: any) => {
      if(authUser){
        localStorage.setItem('authUser', JSON.stringify(authUser))
      }else{
        localStorage.removeItem('authUser')
      }
      
       setauthState(authUser)
      
    })}, [])

  
  
  
  return (
    <Router>
      <div className="App">
        {authState ? <Route path={ROUTES.HOME} component={HomePage} exact />: null}
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} /> 
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Redirect to={ROUTES.SIGN_IN}/>
      </div>
    </Router>
  );
}

export default App;
