import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as ROUTES from '../../constants/routes';

export const AuthRoutes = () => {
    return (
        <Switch>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Redirect to={ROUTES.SIGN_IN} />
        </Switch>
    );
};
