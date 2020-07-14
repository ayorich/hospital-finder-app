import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../Home';
import * as ROUTES from '../../constants/routes';

export const HomeRoutes = () => {
    return (
        <Switch>
            <Route path={ROUTES.HOME} component={HomePage} exact />
        </Switch>
    );
};
