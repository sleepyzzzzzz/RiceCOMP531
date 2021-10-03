import React from 'react';
import { Route, Switch } from "react-router-dom";
import App from './component/app/app';
import Login from './component/app/login';
import Register from './component/app/register';
import Main from './component/main/main';
import Profile from './component/profile/profile';

export default (
    <div className="container">
        <Switch>
            <Route exact path='/'>
                <App />
                <Login />
            </Route>
            <Route path='/login'>
                <App />
                <Login />
            </Route>
            <Route path='/register'>
                <App />
                <Register />
            </Route>
            <Route path='/logout'>
                <App />
                <Login />
            </Route>
            <Route path='/main'>
                <Main />
            </Route>
            <Route path='/profile'>
                <Profile />
            </Route>
        </Switch>
    </div>
)