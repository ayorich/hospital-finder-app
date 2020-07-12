import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import {AuthRoutes}  from "./container/auth/AuthRoutes";
import {HomeRoutes}  from "./container/auth/HomeRoutes";
import PrivateRoute from "./PrivateRoutes";
import * as ROUTES from "./constants/routes"


const ApplicationRoutes = () => {
   return (
     <Router>
        <Switch>
         <PrivateRoute exact path= {ROUTES.HOME} component={HomeRoutes}/>
         <Route path={ROUTES.AUTH} component={AuthRoutes} />
         <Redirect to={ROUTES.HOME}/>
       </Switch>
</Router>
  );
}
export default ApplicationRoutes;