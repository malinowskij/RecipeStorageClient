import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const logout = () => {
    if (localStorage.getItem('isLogged') === 'true') {
        const bearer = "Bearer " + localStorage.getItem('token');
        
        axios
            .post("http://localhost:54893/api/Account/Logout", null,
                { headers: 
                    {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                        "Access-Control-Allow-Headers": "X-Custom-Header",
                        "Authorization": bearer 
                    } 
                }).then(response => {
                    window.localStorage.clear();
                }).catch(err => {
                    console.log(err);
                });
                
        
    }

    return <Redirect to="/login" />
}

export default logout;