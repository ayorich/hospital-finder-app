import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import * as ROUTES from './constants/routes';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
    component: any;
    exact: boolean;
    path: string;
}

const PrivateRoute = ({ component: RouteComponent, ...rest }: Props) => {
    const { authenticated, loadingAuthState } = useContext(AuthContext);
    if (loadingAuthState) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                authenticated ? (
                    <RouteComponent {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: ROUTES.SIGN_IN,
                            state: { prevPath: rest.path },
                        }}
                    />
                )
            }
        />
    );
};
export default PrivateRoute;
