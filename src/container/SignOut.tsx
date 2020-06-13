import React from "react";
import {  withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";


import firebase from "../firebaseConfig";
import * as ROUTES from "../constants/routes";





const signOut = (props: any) => {
  
  const doSignOut = () => {
    firebase.doSignOut();
    props.history.push(ROUTES.SIGN_IN);

  }

  return(
    <Button variant="contained" color="secondary" onClick={doSignOut}>
     Sign Out
  </Button>
)
  }


export default withRouter(signOut);

