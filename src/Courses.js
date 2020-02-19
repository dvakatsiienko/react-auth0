import React, { useState, useEffect } from 'react';

export const Courses = props => {
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/course', {
            headers: {
                Authorization: `Bearer ${props.auth.getAccessToken()}`,
            },
        })
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then(response => setCourses(response.courses))
            .catch(error => setMessage(error.message));

        fetch('/admin', {
            headers: {
                Authorization: `Bearer ${props.auth.getAccessToken()}`,
            },
        })
            .then(response => {
                if (response.ok) return response.json();

                throw new Error('Network response was not ok.');
            })
            .then(response => console.log(response))
            .catch(error => setMessage(error.message));
    }, [props.auth]);

    return (
        <ul>
            {courses.map(course => {
                return <li key={course.id}>{course.title}</li>;
            })}
        </ul>
    );
};
