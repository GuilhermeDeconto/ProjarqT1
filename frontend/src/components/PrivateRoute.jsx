/* All librarys */
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { isAuthenticated } from '../api/LoginAuth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? 
        <Component {...props} /> : 
        <Redirect to="/acessar" />
    )} />
)

export default PrivateRoute;