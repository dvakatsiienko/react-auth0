import React, { useEffect } from 'react';

export const Callback = props => {
    useEffect(() => {
        if (/access_token|id_token|error/.test(props.location.hash)) {
            props.auth.handleAuthentication();
        } else {
            throw new Error('Invalid callback URL.');
        }
    }, [props.auth, props.location.hash]);

    return <h1>Loading...</h1>;
};
