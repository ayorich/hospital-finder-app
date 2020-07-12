import React from "react";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";


import firebase from "../firebase";
import * as ROUTES from "../constants/routes";





const SignOut = (props: any) => {
  const history = useHistory();
  
  const doSignOut = () => {
    firebase.doSignOut();
    history.push(ROUTES.SIGN_IN);

  }

  return(
    <Button variant="contained" color="secondary" onClick={doSignOut}>
     Sign Out
  </Button>
)
  }


export default SignOut;

