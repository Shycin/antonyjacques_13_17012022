import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loading, errorLogin, authentificationAsync } from '../../features/authentification/authentificationSlice';
import * as Status from '../../features/authentification/authentificationStatus';

import Nav from '../Nav'
import Footer from '../Footer'

import Loader from '../../Component/Loader'

import './index.css';

export default function Login() {
    const [login, setLogin] = useState({email: null, password: null})
    const dispatch = useDispatch();

    const loading = useSelector(Loading);
    const error_login = useSelector(errorLogin);

    function Login(e) {
        e.preventDefault();
        dispatch(authentificationAsync(login))
    }

    return (
        <div className="App">
            <Nav />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" 
                                onChange={(e) => setLogin(login => ({...login, email: e.target.value})) }
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" 
                                onChange={(e) => setLogin(login => ({...login, password: e.target.value})) }
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
                        </div>
                        { loading === Status.WAIT 
                            ? <Loader className="input-wrapper" /> 
                            : <button className="sign-in-button" onClick={(e) => Login(e)} >Sign In</button> }
                        <div className='input-error'>{error_login}</div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
}
