import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './View/Home';
import Login from './View/Login';
import Profile from './View/User';
 
export default class RouteList extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" children={ <Home /> } />
                    <Route exact path="/login" children={ <Login /> } />
                    <Route exact path="/profile" children={ <Profile /> } />
                    <Route exact path="*" children={ <Home /> } />
                </Switch>
            </Router>
        )
    }
}