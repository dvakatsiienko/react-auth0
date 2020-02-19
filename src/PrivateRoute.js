import React, { useContext } from 'react';
import { Route } from 'react-router-dom';

import { AuthContext } from './AuthContext';

export const PrivateRoute = ({ component: Component, scopes, ...rest }) => {
    const auth = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (!auth.isAuthenticated()) return auth.login();

                if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
                    return (
                        <h1>
                            Unauthorized - You need the following scope(s) to
                            view this page: {scopes.join(',')}.
                        </h1>
                    );
                }

                return <Component auth={auth} {...props} />;
            }}
        />
    );
};

PrivateRoute.defaultProps = {
    scopes: [],
};
