import React, { useRef, useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Home } from './Home';
import { Profile } from './Profile';
import { Callback } from './Callback';
import { Nav } from './Nav';
import { Auth } from './Auth';
import { Public } from './Public';
import { Private } from './Private';
import { Courses } from './Courses';
import { PrivateRoute } from './PrivateRoute';
import { AuthContext } from './AuthContext';

export const App = () => {
    const [tokenRenewalComplete, setTokenRenewalComplete] = useState(false);
    const history = useHistory();
    const { current: auth } = useRef(new Auth(history));

    useEffect(() => {
        auth.renewToken(() => {
            setTokenRenewalComplete(true);
        });
    }, [auth]);

    if (!tokenRenewalComplete) {
        return <h1>Loading...</h1>;
    }

    return (
        <AuthContext.Provider value={auth}>
            <Nav auth={auth} />
            <div className="body">
                <Route
                    path="/"
                    exact
                    render={props => <Home auth={auth} {...props} />}
                />
                <Route
                    path="/callback"
                    render={props => <Callback auth={auth} {...props} />}
                />
                <Route path="/public" component={Public} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/private" component={Private} />
                <PrivateRoute
                    path="/courses"
                    component={Courses}
                    scopes={['read:courses']}
                />
            </div>
        </AuthContext.Provider>
    );
};
