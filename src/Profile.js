import React, { useState, useEffect } from 'react';

export const Profile = props => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        props.auth.getProfile((profile, err) => {
            setProfile(profile);
            setError(err);
        });
    }, [props.auth]);

    if (!profile) return null;

    return (
        <>
            <h1>Profile</h1>
            <p>{profile.nickname}</p>
            <img
                style={{ maxWidth: 50, maxHeight: 50 }}
                src={profile.picture}
                alt="profile pic"
            />
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </>
    );
};
